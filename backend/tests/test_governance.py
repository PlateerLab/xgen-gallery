import json
from concurrent.futures import ThreadPoolExecutor
from unittest.mock import AsyncMock, patch

import httpx
import pytest
from fastapi import FastAPI
from fastapi.testclient import TestClient
from routers import governance as g


@pytest.fixture
def client(tmp_path, monkeypatch):
    monkeypatch.setattr(g, 'DB_PATH', str(tmp_path / 'governance.db'))
    content = tmp_path / 'governance-content'
    content.mkdir()
    # 공개 테스트에는 내부 교육 문항 대신 합성 문제은행만 사용한다.
    fixture_bank = {'version':'test-v1', 'title':'테스트 교육', 'questions': [
        {'id':f'g{i:02}', 'topic':'테스트', 'prompt':f'검증 문항 {i}',
         'options':[{'id':str(j),'text':f'보기 {j}'} for j in range(4)],
         'correct':str(i % 4), 'explanation':'검증용 해설', 'source':'시험 자료'} for i in range(1,13)]}
    (content / 'questions.json').write_text(json.dumps(fixture_bank))
    (content / 'governance-training.pptx').write_bytes(b'test-material')
    app = FastAPI()
    app.include_router(g.router, prefix='/api/governance')
    app.dependency_overrides[g.admin] = lambda: 'test-admin'
    with TestClient(app) as c:
        yield c


def assign(client, ids=('person-a',)):
    r = client.post('/api/governance/admin/assign', json={'members': [{'id': x, 'name': x, 'team': '시험팀'} for x in ids]})
    assert r.status_code == 200, r.text
    return r.json()


def auth(item):
    return {'Authorization': 'Bearer ' + item['url'].split('#')[1]}


def answers_for(item):
    with g.database() as conn:
        row = conn.execute('SELECT questions FROM assignments WHERE id=?', (item['id'],)).fetchone()
    return {q['id']: q['correct'] for q in json.loads(row['questions'])}


def test_assignment_snapshot_and_no_answer_leak(client):
    one, two = assign(client, ('a', 'b'))['created']
    assert one['url'] != two['url']
    report = client.get('/api/governance/admin/report').json()
    assert next(a for a in report['assignments'] if a['id'] == one['id'])['url'] == one['url']
    quiz = client.get('/api/governance/quiz', headers=auth(one))
    assert quiz.headers['cache-control'] == 'no-store'
    assert len(quiz.json()['questions']) == 12
    assert all('correct' not in q and 'explanation' not in q for q in quiz.json()['questions'])
    assert quiz.json()['assignment']['status'] == 'not_started'
    assert client.get('/api/governance/quiz', headers=auth(two)).json()['assignment']['name'] == 'b'
    again = assign(client, ('a', 'b'))
    assert len(again['existing']) == 2 and not again['created']
    assert 'token_hash' not in json.dumps(client.get('/api/governance/admin/report').json())
    with g.database() as conn:
        assert one['url'].split('#')[1] not in str(tuple(conn.execute('SELECT * FROM assignments').fetchone()))


def test_validation_save_and_idempotent_submit(client):
    item = assign(client)['created'][0]
    headers = auth(item)
    correct = answers_for(item)
    assert client.post('/api/governance/quiz/submit', headers=headers, json={'answers': correct}).status_code == 409
    client.post('/api/governance/quiz/start', headers=headers)
    assert client.post('/api/governance/quiz/submit', headers=headers, json={'answers': {}}).status_code == 422
    assert client.put('/api/governance/quiz/answers', headers=headers, json={'answers': {'wrong': '0'}}).status_code == 422
    assert client.put('/api/governance/quiz/answers', headers=headers, json={'answers': {'g01': '999'}}).status_code == 422
    partial = {'g01': correct['g01']}
    assert client.put('/api/governance/quiz/answers', headers=headers, json={'answers': partial}).status_code == 200
    assert client.get('/api/governance/quiz', headers=headers).json()['answers'] == partial
    result = client.post('/api/governance/quiz/submit', headers=headers, json={'answers': correct}).json()
    assert result['assignment']['score'] == 100
    assert all('correct' in q for q in result['questions'])
    changed = client.post('/api/governance/quiz/submit', headers=headers, json={'answers': {}}).json()
    assert changed == result
    late_save = client.put('/api/governance/quiz/answers', headers=headers, json={'answers': partial}).json()
    assert late_save == result
    report = client.get('/api/governance/admin/report').json()
    assert report['completed'] == 1 and report['average'] == 100
    assert all(q['rate'] == 100 for q in report['questions'])


def test_expiry_revoke_rotate_and_materials(client):
    item = assign(client)['created'][0]
    headers = auth(item)
    assert client.get('/api/governance/quiz/materials/slides').status_code == 401
    assert client.get('/api/governance/quiz/materials/slides', headers=headers).status_code == 200
    assert client.get('/api/governance/quiz/materials/unknown', headers=headers).status_code == 404
    client.post(f"/api/governance/admin/assignments/{item['id']}/revoke")
    assert client.get('/api/governance/quiz', headers=headers).status_code == 404
    newer = client.post(f"/api/governance/admin/assignments/{item['id']}/link").json()
    assert client.get('/api/governance/quiz', headers=headers).status_code == 404
    assert client.get('/api/governance/quiz', headers=auth(newer)).status_code == 200
    with g.database() as conn:
        conn.execute("UPDATE assignments SET expires_at='2000-01-01T00:00:00+00:00'")
    assert client.get('/api/governance/quiz', headers=auth(newer)).status_code == 410
    assert client.get('/api/governance/admin/report').json()['counts']['expired'] == 1


def test_statistics_excludes_unsubmitted_and_keeps_revoked_results(client):
    assert client.get('/api/governance/admin/report').json()['average'] is None
    first, second, third = assign(client, ('a', 'b', 'c'))['created']
    for i, item in enumerate((first, second)):
        client.post('/api/governance/quiz/start', headers=auth(item))
        answers = answers_for(item)
        if i:
            answers = {k: str((int(v) + 1) % 4) for k, v in answers.items()}
        client.post('/api/governance/quiz/submit', headers=auth(item), json={'answers': answers})
    client.post(f"/api/governance/admin/assignments/{first['id']}/revoke")
    report = client.get('/api/governance/admin/report').json()
    assert report['assigned'] == 3 and report['completed'] == 2
    assert report['completion_rate'] == 66.7 and report['average'] == 50
    assert all(q['responses'] == 2 and q['rate'] == 50 for q in report['questions'])


def test_concurrent_submission_and_assignment(client):
    with ThreadPoolExecutor(max_workers=4) as pool:
        results = list(pool.map(lambda _: assign(client), range(4)))
    assert sum(len(r['created']) for r in results) == 1
    item = next(r['created'][0] for r in results if r['created'])
    client.post('/api/governance/quiz/start', headers=auth(item))
    body = {'answers': answers_for(item)}
    with ThreadPoolExecutor(max_workers=4) as pool:
        results = list(pool.map(lambda _: client.post('/api/governance/quiz/submit', headers=auth(item), json=body), range(4)))
    assert all(r.status_code == 200 for r in results)
    assert len({r.json()['assignment']['submitted_at'] for r in results}) == 1
    with g.database() as conn:
        assert conn.execute("SELECT count(*) FROM audit WHERE action='submit'").fetchone()[0] == 1


def test_input_errors(client):
    assert client.post('/api/governance/admin/assign', json={'members': []}).status_code == 422
    assert client.post('/api/governance/admin/assign', json={'members': [{'id': '../x', 'name': 'a'}]}).status_code == 422
    assert client.post('/api/governance/admin/assign', json={'members': [{'id': 'a', 'name': '   '}]}).status_code == 422
    assert client.post('/api/governance/admin/assign', json={'members': [{'id': 'a', 'name': 'a'}], 'valid_days': 0}).status_code == 422
    assert client.post('/api/governance/admin/assign', json={'members': [{'id': 'a', 'name': 'a'}]*2}).status_code == 422
    assert client.post('/api/governance/admin/assignments/missing/link').status_code == 404


@pytest.mark.parametrize('status,permissions,expected', [(200, {'push': False}, 403), (401, {}, 401), (200, {'push': True}, 200)])
def test_real_auth_boundary(tmp_path, monkeypatch, status, permissions, expected):
    monkeypatch.setattr(g, 'DB_PATH', str(tmp_path / 'auth.db'))
    monkeypatch.setattr(g, 'bank', lambda: {'version':'auth-test', 'questions':[]})
    app = FastAPI()
    app.include_router(g.router, prefix='/api/governance')
    with TestClient(app) as c:
        assert c.get('/api/governance/admin/report').status_code == 401
        mock = AsyncMock()
        mock.get.side_effect = [httpx.Response(status, json={'permissions': permissions}), httpx.Response(200, json={'login': 'admin'})]
        with patch.object(g.httpx, 'AsyncClient') as cls:
            cls.return_value.__aenter__.return_value = mock
            assert c.get('/api/governance/admin/report', headers={'Authorization': 'Bearer mocked-token'}).status_code == expected


def test_private_content_import_and_version_freeze(client):
    original = g.bank()
    assert client.put('/api/governance/admin/content/questions', json=original).status_code == 200
    bad = json.loads(json.dumps(original))
    bad['questions'][0]['correct'] = 'missing'
    assert client.put('/api/governance/admin/content/questions', json=bad).status_code == 422
    assert client.put('/api/governance/admin/content/slides', content=b'invalid').status_code == 422
    assert client.put('/api/governance/admin/content/video', content=b'invalid').status_code == 422
    assert client.put('/api/governance/admin/content/unknown', content=b'').status_code == 404
    item = assign(client)['created'][0]
    changed = json.loads(json.dumps(original))
    changed['questions'][0]['correct'] = str((int(changed['questions'][0]['correct'])+1)%4)
    assert client.put('/api/governance/admin/content/questions', json=changed).status_code == 409
    assert client.put('/api/governance/admin/content/questions', json=original).status_code == 200
    changed['version'] = 'test-v2'
    assert client.put('/api/governance/admin/content/questions', json=changed).status_code == 200
    client.post('/api/governance/quiz/start', headers=auth(item))
    result = client.post('/api/governance/quiz/submit', headers=auth(item), json={'answers': answers_for(item)})
    assert result.json()['assignment']['score'] == 100
