// XGEN 기능 QA 실러너 (Playwright) — CI/로컬에서 실제 XGEN에 로그인하여 각 메뉴를
// 진짜 진입·검증하고 실제 스크린샷 + results.json 을 생성한다. (읽기전용 스모크 · 비파괴)
//
//   로컬:  QA_EMAIL=... QA_PASS=... [QA_OUT=절대경로] node qa/qa-runner.mjs   (env 기본 dev)
//   CI:    secrets(QA_EMAIL/QA_PASS) 주입 + QA_ENV 로 대상 지정
//
// 출력: (repo)frontend/public/qa-console/results.json  +  .../shots/{id}.png
import fs from 'node:fs';
import path from 'node:path';
import { chromium } from 'playwright';

const ENVV = (process.env.QA_ENV || process.argv[2] || 'dev').toLowerCase();
const BASE = ENVV === 'stg' ? 'https://stg-xgen.x2bee.com'
          : ENVV === 'prod' ? 'https://xgen.x2bee.com'
          : 'https://dev-xgen.x2bee.com';
const EMAIL = process.env.QA_EMAIL;
const PASS = process.env.QA_PASS;
if (!EMAIL || !PASS) { console.error('[qa-runner] QA_EMAIL / QA_PASS 환경변수가 필요합니다.'); process.exit(2); }

const OUT = path.resolve(process.env.QA_OUT || 'frontend/public/qa-console');
const SHOTS = path.join(OUT, 'shots');
fs.mkdirSync(SHOTS, { recursive: true });

// 실제 케이스 — nav: 'admin'(관리 설정 사이드바) | 'main'(Agent 작업실 사이드바) | 'teams'(상단 Teams)
// 확장: 여기에 행을 추가하면 콘솔 필터/매트릭스/캡처에 자동 반영된다.
const CASES = [
  // ── 공통 · 권한 무관 (로그인만으로 접근) — Agent 채팅 / Teams ──
  { id: 'TC-CHT-001', persona: 'all', scope: '공통', category: 'Agent 채팅', menu: '채팅 시작', action: '조회', nav: 'main' },
  { id: 'TC-CHT-002', persona: 'all', scope: '공통', category: 'Agent 채팅', menu: '현재 채팅', action: '조회', nav: 'main' },
  { id: 'TC-CHT-003', persona: 'all', scope: '공통', category: 'Agent 채팅', menu: '채팅 이력', action: '조회', nav: 'main' },
  { id: 'TC-TMS-001', persona: 'all', scope: '공통', category: 'Teams', menu: 'Teams', action: '조회', nav: 'teams' },
  // ── 관리설정(ADMIN) 각 카테고리>메뉴 조회 스모크 ──
  { id: 'TC-ADM-101', persona: 'admin', scope: 'ADMIN', category: '사용자 / 접근제어', menu: '사용자 관리', action: '조회', nav: 'admin' },
  { id: 'TC-ADM-102', persona: 'admin', scope: 'ADMIN', category: '사용자 / 접근제어', menu: '역할/권한 관리', action: '조회', nav: 'admin' },
  { id: 'TC-ADM-103', persona: 'admin', scope: 'ADMIN', category: 'Agent 운영', menu: 'Agent 관리', action: '조회', nav: 'admin' },
  { id: 'TC-ADM-104', persona: 'admin', scope: 'ADMIN', category: 'Agent 운영', menu: '채팅 모니터링', action: '조회', nav: 'admin' },
  { id: 'TC-ADM-105', persona: 'admin', scope: 'ADMIN', category: 'Agent 운영', menu: '사용자 피드백', action: '조회', nav: 'admin' },
  { id: 'TC-GOV-106', persona: 'gov', scope: 'ADMIN', category: 'AI 거버넌스', menu: 'AI 위험도 평가', action: '조회', nav: 'admin' },
  { id: 'TC-GOV-107', persona: 'gov', scope: 'ADMIN', category: 'AI 거버넌스', menu: '통제 정책 관리', action: '조회', nav: 'admin' },
  { id: 'TC-ADM-108', persona: 'admin', scope: 'ADMIN', category: '환경 설정', menu: '전체 설정', action: '조회', nav: 'admin' },
  { id: 'TC-ADM-109', persona: 'admin', scope: 'ADMIN', category: '시스템 상태', menu: '시스템 모니터링', action: '조회', nav: 'admin' },
  { id: 'TC-ADM-110', persona: 'admin', scope: 'ADMIN', category: '데이터 관리', menu: '데이터베이스', action: '조회', nav: 'admin' },
  { id: 'TC-ADM-111', persona: 'admin', scope: 'ADMIN', category: 'MCP 관리', menu: 'MCP 라이브러리', action: '조회', nav: 'admin' },
  { id: 'TC-ADM-112', persona: 'admin', scope: 'ADMIN', category: '서비스 운영', menu: '공지 게시판', action: '조회', nav: 'admin' },
  { id: 'TC-ADM-113', persona: 'admin', scope: 'ADMIN', category: '지식 운영', menu: '지식 컬렉션 관리', action: '조회', nav: 'admin' },
];

const log = (...a) => console.log('[qa-runner]', ...a);
const clickByText = (page, txt) =>
  page.evaluate((t) => {
    const b = [...document.querySelectorAll('button')].find((x) => x.textContent.trim() === t);
    if (b) { b.click(); return true; } return false;
  }, txt);

// 버튼이 나타날 때까지 대기 후 클릭 (비동기 사이드바 로드 대응)
async function clickWait(page, txt, timeout = 9000) {
  try {
    await page.waitForFunction(
      (t) => [...document.querySelectorAll('button')].some((b) => b.textContent.trim() === t),
      txt, { timeout },
    );
  } catch { return false; }
  return clickByText(page, txt);
}

// 앱(관리설정=/admin, Agent작업실=/main) 로 URL 직접 이동 후 사이드바 로드 대기
let _curApp = '';
async function gotoApp(page, app) {
  const seg = app === 'admin' ? '/admin' : '/main';
  if (_curApp !== app || !page.url().includes(seg)) {
    await page.goto(BASE + seg, { waitUntil: 'domcontentloaded', timeout: 30000 });
    await page.waitForTimeout(2400);
    _curApp = app;
  }
}

(async () => {
  const browser = await chromium.launch({ headless: true });
  const ctx = await browser.newContext({ viewport: { width: 1600, height: 1000 }, locale: 'ko-KR' });
  const page = await ctx.newPage();

  log('login', BASE, EMAIL);
  await page.goto(BASE + '/login', { waitUntil: 'domcontentloaded', timeout: 60000 });
  await page.getByPlaceholder('이메일을 입력해 주세요').fill(EMAIL);
  await page.getByPlaceholder('패스워드를 입력해 주세요').fill(PASS);
  await page.getByRole('button', { name: '로그인' }).click();
  await page.waitForURL((u) => !u.toString().includes('/login'), { timeout: 30000 });
  log('logged in →', page.url());

  const results = [];
  for (const cs of CASES) {
    const { id, persona, scope, category, menu, action, nav } = cs;
    const t0 = Date.now();
    let outcome = 'pass', error = '', shot = '';
    try {
      if (nav === 'admin' || nav === 'main') {
        await gotoApp(page, nav === 'admin' ? 'admin' : 'main');
        await clickWait(page, category);            // 카테고리 펼침
        await page.waitForTimeout(400);
        if (!(await clickWait(page, menu))) throw new Error('메뉴 버튼 없음: ' + menu);
      } else if (nav === 'teams') {
        await gotoApp(page, 'main');
        if (!(await clickWait(page, menu))) throw new Error('버튼 없음: ' + menu);
      }
      await page.waitForTimeout(1600);
      const info = await page.evaluate(() => {
        const main = document.querySelector('main') || document.body;
        const txt = main.innerText || '';
        const err = /문제가 발생|오류가 발생|Something went wrong|Error:/.test(txt);
        return { len: txt.length, err };
      });
      shot = `shots/${id}.png`;
      await page.screenshot({ path: path.join(OUT, shot), fullPage: false });
      if (info.err) { outcome = 'fail'; error = '에러 바운더리 감지'; }
      else if (info.len < 120) { outcome = 'warn'; error = `본문 렌더 미흡(${info.len}chars)`; }
    } catch (e) {
      outcome = 'fail'; error = String(e.message || e);
      try { shot = `shots/${id}.png`; await page.screenshot({ path: path.join(OUT, shot) }); } catch {}
    }
    const ms = Date.now() - t0;
    results.push({ id, persona, scope, category, menu, action, ms, outcome, error, shot });
    log(id, outcome, ms + 'ms', error);
  }

  const payload = {
    env: ENVV, base: BASE, ranAt: new Date().toISOString(),
    total: results.length,
    pass: results.filter((r) => r.outcome === 'pass').length,
    fail: results.filter((r) => r.outcome === 'fail').length,
    warn: results.filter((r) => r.outcome === 'warn').length,
    results,
  };
  fs.writeFileSync(path.join(OUT, 'results.json'), JSON.stringify(payload, null, 1), 'utf8');
  log('DONE', `total ${payload.total} · pass ${payload.pass} / fail ${payload.fail} / warn ${payload.warn}`, '→ results.json');
  await browser.close();
  if (payload.fail > 0) process.exitCode = 1;
})().catch((e) => { console.error('[qa-runner] FATAL', e); process.exit(1); });
