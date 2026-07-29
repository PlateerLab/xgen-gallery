// XGEN 기능 QA 실러너 (Playwright) — 실제 로그인 후 각 메뉴/세분 UI 기능을 검증하고
// 실제 스크린샷(실패·주의만) + results.json 생성. 카탈로그(catalog.json)와 scope|category|menu|action 로 매칭.
import fs from 'node:fs';
import path from 'node:path';
import { chromium } from 'playwright';

const ENVV = (process.env.QA_ENV || process.argv[2] || 'dev').toLowerCase();
const BASE = ENVV === 'stg' ? 'https://stg-xgen.x2bee.com'
          : ENVV === 'prod' ? 'https://xgen.x2bee.com'
          : 'https://dev-xgen.x2bee.com';
const EMAIL = process.env.QA_EMAIL, PASS = process.env.QA_PASS;
if (!EMAIL || !PASS) { console.error('[qa-runner] QA_EMAIL / QA_PASS 필요'); process.exit(2); }
const OUT = path.resolve(process.env.QA_OUT || 'frontend/public/qa-console');
const SHOTS = path.join(OUT, 'shots');
fs.mkdirSync(SHOTS, { recursive: true });

// 공통 / 세분 MAIN(gran) / ADMIN — 각 케이스가 카탈로그와 category·menu·action 로 정합
const COMMON = [
  { id:'TC-CMN-001', persona:'all', scope:'공통', category:'Agent 채팅', menu:'채팅 시작', action:'조회', nav:'main', desc:'채팅 시작 화면 진입 확인' },
  { id:'TC-CMN-003', persona:'all', scope:'공통', category:'Agent 채팅', menu:'채팅 이력', action:'조회', nav:'main', desc:'채팅 이력 조회 확인' },
  { id:'TC-CMN-006', persona:'all', scope:'공통', category:'Teams', menu:'Teams', action:'조회', nav:'teams', desc:'Teams 진입 확인' },
  { id:'TC-CMN-004', persona:'all', scope:'공통', category:'Agent 채팅', menu:'에이전트 실행', action:'실행', nav:'chatexec',
    prompt:'안녕하세요. XGEN QA 자동 점검입니다. 이 에이전트의 역할을 한 문장으로 소개해 주세요.', desc:'에이전트 실행: 프롬프트→응답 수신 확인' },
];
// gran: parentCat 클릭 → screen 클릭 → verify(load|present:key). category=카탈로그 경로, menu=기능명
const G = (id,cat,parentCat,screen,menu,action,verify,key)=>({id,persona:'dev',scope:'MAIN',category:cat,parentCat,screen,menu,action,nav:'gran',verify,key});
const GRAN = [
  // Agent 제작 · Agent 목록
  G('TC-MAIN-001','Agent 제작 · Agent 목록','Agent 제작','Agent 목록','컬렉션 목록 조회','조회','load'),
  G('TC-MAIN-002','Agent 제작 · Agent 목록','Agent 제작','Agent 목록','새 에이전트 생성','생성','present','Agent 생성하기'),
  G('TC-MAIN-003','Agent 제작 · Agent 목록','Agent 제작','Agent 목록','편집','수정','present','편집'),
  G('TC-MAIN-004','Agent 제작 · Agent 목록','Agent 제작','Agent 목록','복제','복제','present','복제'),
  G('TC-MAIN-005','Agent 제작 · Agent 목록','Agent 제작','Agent 목록','실행','실행','present','실행'),
  G('TC-MAIN-006','Agent 제작 · Agent 목록','Agent 제작','Agent 목록','삭제','삭제','present','더보기'),
  G('TC-MAIN-009','Agent 제작 · Agent 목록','Agent 제작','Agent 목록','다중 선택(일괄)','일괄','present','다중 선택'),
  G('TC-MAIN-010','Agent 제작 · Agent 목록','Agent 제작','Agent 목록','검색','조회','present','검색'),
  G('TC-MAIN-011','Agent 제작 · Agent 목록','Agent 제작','Agent 목록','보관함 조회','조회','present','보관함'),
  G('TC-MAIN-012','Agent 제작 · Agent 목록','Agent 제작','Agent 목록','템플릿 조회','조회','present','템플릿'),
  // Agent 제작 · 기타 화면 조회
  G('TC-MAIN-025','Agent 제작 · Agent 기획','Agent 제작','Agent 기획','기획서 조회','조회','load'),
  G('TC-MAIN-028','Agent 제작 · Agent 운영 설정','Agent 제작','Agent 운영 설정','운영 설정 조회','조회','load'),
  G('TC-MAIN-031','Agent 제작 · Agent 품질 평가','Agent 제작','Agent 품질 평가','평가 지표 조회','조회','load'),
  G('TC-MAIN-033','Agent 제작 · Agent 프롬프트','Agent 제작','Agent 프롬프트','프롬프트 목록 조회','조회','load'),
  // 도구 연동
  G('TC-MAIN-039','도구 연동 · API 도구','도구 연동','API 도구','도구 목록 조회','조회','load'),
  G('TC-MAIN-046','도구 연동 · 인증 프로필','도구 연동','인증 프로필','프로필 목록 조회','조회','load'),
  // 지식관리 · 지식 컬렉션
  G('TC-MAIN-051','지식관리 · 지식 컬렉션','지식관리','지식 컬렉션','컬렉션 목록 조회','조회','load'),
  G('TC-MAIN-062','지식관리 · 지식 컬렉션','지식관리','지식 컬렉션','검색 질의','조회','present','검색'),
  G('TC-MAIN-063','지식관리 · 지식 컬렉션','지식관리','지식 컬렉션','다중 선택(일괄)','일괄','present','다중 선택'),
  G('TC-MAIN-064','지식관리 · 지식 컬렉션','지식관리','지식 컬렉션','업로드 이력 조회','조회','present','업로드 이력'),
  G('TC-MAIN-065','지식관리 · 지식 컬렉션','지식관리','지식 컬렉션','용어사전 관리','수정','present','용어사전'),
  G('TC-MAIN-066','지식관리 · 지식 컬렉션','지식관리','지식 컬렉션','온톨로지 구성','수정','present','온톨로지'),
  G('TC-MAIN-067','지식관리 · 지식 컬렉션','지식관리','지식 컬렉션','휴지통 복원','전환','present','휴지통'),
  // 지식관리 · 파일 저장소 / DB 연동
  G('TC-MAIN-069','지식관리 · 파일 저장소','지식관리','파일 저장소','파일 목록 조회','조회','load'),
  G('TC-MAIN-077','지식관리 · DB 연동','지식관리','DB 연동','연결 목록 조회','조회','load'),
];
const ADMIN = [
  ['TC-ADM-101','admin','사용자 / 접근제어','사용자 관리','사용자 계정 목록 조회·관리 화면 로드 확인'],
  ['TC-ADM-102','admin','사용자 / 접근제어','역할/권한 관리','역할·권한 관리 화면 로드 확인'],
  ['TC-ADM-103','admin','Agent 운영','Agent 관리','배포 에이전트 운영 목록 조회 확인'],
  ['TC-ADM-104','admin','Agent 운영','채팅 모니터링','채팅 모니터링 대시보드 로드 확인'],
  ['TC-ADM-105','admin','Agent 운영','사용자 피드백','사용자 피드백 현황 조회 확인'],
  ['TC-GOV-106','gov','AI 거버넌스','AI 위험도 평가','AI 위험도 평가 화면 로드 확인'],
  ['TC-GOV-107','gov','AI 거버넌스','통제 정책 관리','통제 정책 관리 화면 로드 확인'],
  ['TC-ADM-108','admin','환경 설정','전체 설정','환경 전체 설정 화면 로드 확인'],
  ['TC-ADM-109','admin','시스템 상태','시스템 모니터링','시스템 상태 모니터링 로드 확인'],
  ['TC-ADM-110','admin','데이터 관리','데이터베이스','데이터베이스 관리 화면 로드 확인'],
  ['TC-ADM-111','admin','MCP 관리','MCP 라이브러리','MCP 라이브러리 조회 확인'],
  ['TC-ADM-112','admin','서비스 운영','공지 게시판','공지 게시판 화면 로드 확인'],
  ['TC-ADM-113','admin','지식 운영','지식 컬렉션 관리','관리자 지식 컬렉션 운영 화면 로드 확인'],
  // 세분 ADMIN 조회 확대(카탈로그 섹션명과 정합)
  ['TC-ADM-120','admin','사용자 / 접근제어','로그인 관리','로그인 관리 화면 로드 확인'],
  ['TC-ADM-121','admin','Agent 운영','사용자 토큰','사용자 토큰 사용량·정책 화면 로드 확인'],
  ['TC-ADM-122','admin','Agent 운영','노드 관리','노드 관리 화면 로드 확인'],
  ['TC-ADM-123','admin','Agent 운영','프롬프트 템플릿','프롬프트 템플릿 관리 화면 로드 확인'],
  ['TC-ADM-124','admin','Agent 운영','응답 품질 평가','응답 품질 평가 화면 로드 확인'],
  ['TC-ADM-125','admin','Agent 운영','Agent 리텐션 분석','Agent 리텐션 분석 화면 로드 확인'],
  ['TC-ADM-126','admin','시스템 상태','로그 조회','로그 조회 화면 로드 확인'],
  ['TC-GOV-127','gov','AI 거버넌스','점검 이력 관리','점검 이력 관리 화면 로드 확인'],
  ['TC-ADM-128','admin','데이터 관리','데이터 감사 로그','데이터 감사 로그 화면 로드 확인'],
].map(a=>({id:a[0],persona:a[1],scope:'ADMIN',category:a[2],menu:a[3],action:'조회',nav:'admin',desc:a[4]}));
const LIFECYCLE = [{ id:'LIFECYCLE', persona:'dev', scope:'MAIN', category:'지식관리 · 지식 컬렉션', menu:'lifecycle', action:'생성', nav:'lifecycle', desc:'' }];
// (a) 시나리오 E2E 자동화 — 카탈로그 시나리오 케이스와 정합
const SCEN = [
  { id:'SC-009', persona:'all', scope:'시나리오', category:'채팅 실행', menu:'에이전트 채팅 대화', action:'시나리오', nav:'scenario-chat',
    prompt:'B2B SNS 홍보 문구 예시를 한 문장으로 제안해줘.', desc:'채팅 시작→에이전트 선택→프롬프트 전송→응답 수신 E2E' },
  { id:'SC-006', persona:'dev', scope:'시나리오', category:'RAG 파이프라인', menu:'지식 컬렉션 RAG 구성·질의', action:'시나리오', nav:'scenario-rag',
    desc:'지식 컬렉션 생성→검증→정리 RAG 파이프라인 준비 E2E(자동 정리)' },
  { id:'SC-003', persona:'dev', scope:'시나리오', category:'에이전트 구축', menu:'대화로 워크플로우 생성', action:'시나리오', nav:'scenario-build',
    prompt:'간단한 챗봇 워크플로우를 만들어줘. 시작 노드 → LLM 에이전트 → 종료 노드로 연결.', desc:'Agent 설계 대화형 워크플로우 생성 E2E' },
  { id:'SC-001', persona:'dev', scope:'시나리오', category:'에이전트 구축', menu:'B2B SNS 자동화 에이전트(RAG) 구축', action:'시나리오', nav:'scenario-build',
    prompt:'B2B SNS 마케팅 자동화 에이전트를 만들어줘. 지식 컬렉션(RAG) 문서 검색 → LLM 에이전트로 LinkedIn/Facebook B2B 홍보 게시글 초안 작성 → 종료 노드. 각 노드를 연결.', desc:'B2B SNS RAG 에이전트 대화형 구축 E2E' },
];
const CASES = [...COMMON, ...SCEN, ...LIFECYCLE, ...GRAN, ...ADMIN];

const log = (...a) => console.log('[qa-runner]', ...a);
const clickByText = (page, txt) => page.evaluate((t) => {
  const b = [...document.querySelectorAll('button')].find((x) => x.textContent.trim() === t);
  if (b) { b.click(); return true; } return false;
}, txt);
const hasButton = (page, txt) => page.evaluate((t) =>
  [...document.querySelectorAll('button,[role="button"],a,[role="tab"]')].some((x) => {
    if (!x.offsetParent) return false;
    const s = (x.textContent + ' ' + (x.getAttribute('aria-label') || '') + ' ' + (x.title || '')).trim();
    return s.includes(t);
  }), txt);
async function clickWait(page, txt, timeout = 9000) {
  try { await page.waitForFunction((t) => [...document.querySelectorAll('button')].some((b) => b.textContent.trim() === t), txt, { timeout }); }
  catch { return false; }
  return clickByText(page, txt);
}
let _curApp = '';
async function gotoApp(page, app) {
  const seg = app === 'admin' ? '/admin' : '/main';
  if (_curApp !== app || !page.url().includes(seg)) {
    await page.goto(BASE + seg, { waitUntil: 'domcontentloaded', timeout: 30000 });
    try { await page.waitForFunction(() => document.querySelectorAll('button').length > 20, { timeout: 15000 }); } catch {}
    await page.waitForTimeout(1200); _curApp = app;
  }
}
async function pageErr(page) {
  return page.evaluate(() => { const m = document.querySelector('main') || document.body; const t = m.innerText || '';
    return { len: t.length, err: /문제가 발생|오류가 발생|Something went wrong|Error:/.test(t) }; });
}
async function chatExec(page, prompt) {
  _curApp = ''; await gotoApp(page, 'main');
  await clickWait(page, 'Agent 채팅'); await page.waitForTimeout(300);
  await clickWait(page, '채팅 시작'); await page.waitForTimeout(2200);
  const started = await page.evaluate(() => { const m = document.querySelector('main');
    const b = [...m.querySelectorAll('button')].find((x) => x.textContent.trim() === '채팅 시작' && x.offsetParent);
    if (b) { b.click(); return true; } return false; });
  if (!started) throw new Error('실행할 에이전트플로우 없음');
  await page.waitForSelector('textarea', { timeout: 15000 });
  const ta = await page.$('textarea'); await ta.fill(prompt); await ta.press('Enter');
  for (let i = 0; i < 20; i++) { await page.waitForTimeout(2000);
    const txt = await page.evaluate(() => (document.querySelector('main') || document.body).innerText);
    if (/AI가 생성한|생성한 참고|답변/.test(txt)) return true; }
  return false;
}
// 심층 라이프사이클: 지식 컬렉션 실제 생성 → 검증 → 삭제(정리)
async function collectionLifecycle(page) {
  _curApp = ''; await gotoApp(page, 'main');
  await clickWait(page, '지식관리'); await page.waitForTimeout(400);
  if (!(await clickWait(page, '지식 컬렉션'))) return { createOk: false, deleteOk: false, error: '지식 컬렉션 화면 없음' };
  await page.waitForTimeout(2600);
  const name = 'QA_자동_' + Date.now();
  if (!(await clickWait(page, '새 컬렉션 생성'))) return { createOk: false, deleteOk: false, error: '새 컬렉션 생성 버튼 없음' };
  await page.waitForTimeout(1500);
  try { await page.fill('input[placeholder*="컬렉션 이름"]', name); }
  catch { return { createOk: false, deleteOk: false, error: '이름 입력 실패' }; }
  await page.evaluate(() => { const bs = [...document.querySelectorAll('button')].filter((b) => b.offsetParent && b.textContent.trim() === '생성'); const b = bs[bs.length - 1]; if (b) b.click(); });
  await page.waitForTimeout(3500);
  const created = await page.evaluate((n) => [...document.querySelectorAll('*')].some((e) => e.offsetParent && e.textContent.trim() === n), name);
  let deleted = false, err = created ? '' : '생성 미확인';
  if (created) {
    await page.evaluate(() => { const b = [...document.querySelectorAll('button')].find((x) => x.offsetParent && x.textContent.trim() === '삭제'); if (b) b.click(); });
    await page.waitForTimeout(1200);
    await page.evaluate(() => { const b = [...document.querySelectorAll('[role=dialog] button,[role=alertdialog] button,[aria-modal="true"] button')].find((x) => /삭제|확인/.test(x.textContent.trim())); if (b) b.click(); });
    await page.waitForTimeout(3000);
    deleted = await page.evaluate((n) => ![...document.querySelectorAll('*')].some((e) => e.offsetParent && e.textContent.trim() === n), name);
    if (!deleted) err = '삭제 미확인(정리 실패)';
  }
  return { createOk: created, deleteOk: deleted, error: err };
}
// (a) 시나리오: 대화로 워크플로우 생성 — 요구사항 입력 → 워크플로우 생성 확인
async function scenarioBuild(page, prompt) {
  _curApp = ''; await gotoApp(page, 'main');
  await clickWait(page, 'Agent 제작'); await page.waitForTimeout(400);
  await clickWait(page, 'Agent 설계'); await page.waitForTimeout(2500);
  if (!(await clickWait(page, '대화로 워크플로우 생성'))) throw new Error('대화 생성 진입 실패');
  await page.waitForTimeout(2500);
  const ta = await page.$('textarea'); if (!ta) throw new Error('입력창 없음');
  await ta.fill(prompt); await ta.press('Enter');
  for (let i = 0; i < 18; i++) {
    await page.waitForTimeout(3000);
    if (/wf=workflow/.test(page.url())) return true;
    const open = await page.evaluate(() => [...document.querySelectorAll('button,a')].some((e) => /캔버스 열기/.test(e.textContent)));
    if (open) return true;
  }
  return false;
}
// 케이스별 최대 45초 (행 방지)
function withTimeout(promise, ms, id) {
  return Promise.race([promise, new Promise((_, rej) => setTimeout(() => rej(new Error('케이스 타임아웃 ' + ms + 'ms')), ms))]);
}

(async () => {
  const results = [];
  let browser;
  try {
  browser = await chromium.launch({ headless: true });
  const ctx = await browser.newContext({ viewport: { width: 1600, height: 1000 }, locale: 'ko-KR' });
  const page = await ctx.newPage();
  log('login', BASE, EMAIL);
  await page.goto(BASE + '/login', { waitUntil: 'domcontentloaded', timeout: 60000 });
  await page.getByPlaceholder('이메일을 입력해 주세요').fill(EMAIL);
  await page.getByPlaceholder('패스워드를 입력해 주세요').fill(PASS);
  await page.getByRole('button', { name: '로그인' }).click();
  await page.waitForURL((u) => !u.toString().includes('/login'), { timeout: 30000 });
  log('logged in →', page.url());

  for (const cs of CASES) {
    const { id, persona, scope, category, menu, action, nav, desc } = cs;
    const t0 = Date.now(); let outcome = 'pass', error = '', shot = '';
    if (nav === 'lifecycle') {
      let r; try { r = await withTimeout(collectionLifecycle(page), 60000, id); }
      catch (e) { r = { createOk: false, deleteOk: false, error: String(e.message || e) }; }
      results.push({ id: 'TC-MAIN-052', persona: 'dev', scope: 'MAIN', category: '지식관리 · 지식 컬렉션', menu: '새 컬렉션 생성', action: '생성', desc: '새 컬렉션 실제 생성(자동 정리 포함) 확인', ms: Date.now() - t0, outcome: r.createOk ? 'pass' : 'fail', error: r.createOk ? '' : r.error, shot: '' });
      results.push({ id: 'TC-MAIN-054', persona: 'dev', scope: 'MAIN', category: '지식관리 · 지식 컬렉션', menu: '컬렉션 삭제', action: '삭제', desc: '컬렉션 실제 삭제(정리) 확인', ms: 0, outcome: r.deleteOk ? 'pass' : (r.createOk ? 'fail' : 'na'), error: r.deleteOk ? '' : (r.createOk ? '삭제 미확인' : ''), shot: '' });
      log('LIFECYCLE', 'create=' + r.createOk + ' delete=' + r.deleteOk);
      continue;
    }
    try {
      await withTimeout((async () => {
        if (nav === 'chatexec') {
          if (!(await chatExec(page, cs.prompt))) { outcome = 'fail'; error = '에이전트 응답 미수신'; }
        } else if (nav === 'scenario-chat') {
          if (!(await chatExec(page, cs.prompt))) { outcome = 'fail'; error = '응답 미수신'; }
        } else if (nav === 'scenario-rag') {
          const r = await collectionLifecycle(page);
          if (!r.createOk) { outcome = 'fail'; error = r.error || 'RAG 컬렉션 생성 실패'; }
          else if (!r.deleteOk) { outcome = 'warn'; error = '컬렉션 생성 성공(정리 미확인)'; }
        } else if (nav === 'scenario-build') {
          if (!(await scenarioBuild(page, cs.prompt))) { outcome = 'fail'; error = '워크플로우 생성 미확인'; }
        } else if (nav === 'gran') {
          _curApp = ''; await gotoApp(page, 'main');
          await clickWait(page, cs.parentCat); await page.waitForTimeout(400);
          if (!(await clickWait(page, cs.screen))) throw new Error('화면 없음: ' + cs.screen);
          await page.waitForTimeout(2600);
          if (cs.verify === 'present') {
            if (!(await hasButton(page, cs.key))) { outcome = 'fail'; error = '기능 노출 안 됨: ' + cs.key; }
          } else {
            const info = await pageErr(page);
            if (info.err) { outcome = 'fail'; error = '에러 바운더리 감지'; }
            else if (info.len < 60) { outcome = 'warn'; error = `본문 렌더 미흡(${info.len}chars)`; }
          }
        } else {
          if (nav === 'admin' || nav === 'main') {
            await gotoApp(page, nav === 'admin' ? 'admin' : 'main');
            await clickWait(page, category); await page.waitForTimeout(400);
            if (!(await clickWait(page, menu))) throw new Error('메뉴 버튼 없음: ' + menu);
          } else if (nav === 'teams') { await gotoApp(page, 'main'); if (!(await clickWait(page, menu))) throw new Error('버튼 없음: ' + menu); }
          await page.waitForTimeout(1600);
          const info = await pageErr(page);
          if (info.err) { outcome = 'fail'; error = '에러 바운더리 감지'; }
          else if (info.len < 60) { outcome = 'warn'; error = `본문 렌더 미흡(${info.len}chars)`; }
        }
      })(), 45000, id);
      if (outcome !== 'pass') { shot = `shots/${id}.png`; await page.screenshot({ path: path.join(OUT, shot), fullPage: false }); }
    } catch (e) {
      outcome = 'fail'; error = String(e.message || e);
      try { shot = `shots/${id}.png`; await page.screenshot({ path: path.join(OUT, shot) }); } catch {}
    }
    const ms = Date.now() - t0;
    results.push({ id, persona, scope, category, menu, action, desc, ms, outcome, error, shot });
    log(id, outcome, ms + 'ms', error);
  }
  } catch (e) {
    console.error('[qa-runner] RUN ERROR', e && (e.message || e));
  } finally {
    // 안정화: 부분 결과라도 항상 기록(전체 실패로 기존 결과를 덮어쓰지는 않음)
    if (results.length) {
      const payload = { env: ENVV, base: BASE, ranAt: new Date().toISOString(), total: results.length,
        pass: results.filter((r) => r.outcome === 'pass').length,
        fail: results.filter((r) => r.outcome === 'fail').length,
        warn: results.filter((r) => r.outcome === 'warn').length, results };
      fs.writeFileSync(path.join(OUT, 'results.json'), JSON.stringify(payload, null, 1), 'utf8');
      log('DONE', `total ${payload.total} · pass ${payload.pass}/fail ${payload.fail}/warn ${payload.warn}`);
      if (payload.fail > 0) process.exitCode = 1;
    } else {
      log('결과 없음 — results.json 미갱신(기존 유지)');
    }
    if (browser) { try { await browser.close(); } catch {} }
  }
})();
