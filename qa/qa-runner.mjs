// XGEN 기능 QA 실러너 (Playwright) — CI/로컬에서 실제 XGEN에 로그인하여 각 메뉴를
// 진짜 진입·검증하고 실제 스크린샷 + results.json 을 생성한다. (읽기전용 스모크 · 비파괴)
//
//   로컬:  QA_EMAIL=... QA_PASS=... node qa/qa-runner.mjs           (env 기본 dev)
//   CI:    secrets(QA_EMAIL/QA_PASS) 주입 + QA_ENV 로 대상 지정
//
// 출력: frontend/public/qa-console/results.json  +  .../shots/{id}.png
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

// 리포 루트 기준 출력 경로 (CI는 repo root에서 실행)
const OUT = path.resolve(process.env.QA_OUT || 'frontend/public/qa-console');
const SHOTS = path.join(OUT, 'shots');
fs.mkdirSync(SHOTS, { recursive: true });

// 실제 케이스 — ADMIN 각 카테고리>메뉴 조회 스모크 (사이드바 클릭 네비, 비파괴)
// 확장: 여기에 행을 추가하면 콘솔 필터/매트릭스에 자동 반영된다.
const CASES = [
  ['TC-ADM-101', 'admin', 'ADMIN', '사용자 / 접근제어', '사용자 관리'],
  ['TC-ADM-102', 'admin', 'ADMIN', '사용자 / 접근제어', '역할/권한 관리'],
  ['TC-ADM-103', 'admin', 'ADMIN', 'Agent 운영', 'Agent 관리'],
  ['TC-ADM-104', 'admin', 'ADMIN', 'Agent 운영', '채팅 모니터링'],
  ['TC-ADM-105', 'admin', 'ADMIN', 'Agent 운영', '사용자 피드백'],
  ['TC-GOV-106', 'gov', 'ADMIN', 'AI 거버넌스', 'AI 위험도 평가'],
  ['TC-GOV-107', 'gov', 'ADMIN', 'AI 거버넌스', '통제 정책 관리'],
  ['TC-ADM-108', 'admin', 'ADMIN', '환경 설정', '전체 설정'],
  ['TC-ADM-109', 'admin', 'ADMIN', '시스템 상태', '시스템 모니터링'],
  ['TC-ADM-110', 'admin', 'ADMIN', '데이터 관리', '데이터베이스'],
  ['TC-ADM-111', 'admin', 'ADMIN', 'MCP 관리', 'MCP 라이브러리'],
  ['TC-ADM-112', 'admin', 'ADMIN', '서비스 운영', '공지 게시판'],
  ['TC-ADM-113', 'admin', 'ADMIN', '지식 운영', '지식 컬렉션 관리'],
];

const log = (...a) => console.log('[qa-runner]', ...a);
const clickByText = (page, txt) =>
  page.evaluate((t) => {
    const b = [...document.querySelectorAll('button')].find((x) => x.textContent.trim() === t);
    if (b) { b.click(); return true; } return false;
  }, txt);

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

  await page.goto(BASE + '/admin', { waitUntil: 'domcontentloaded', timeout: 30000 });
  await page.waitForTimeout(2500);

  const results = [];
  for (const [id, persona, scope, category, menu] of CASES) {
    const t0 = Date.now();
    let outcome = 'pass', error = '', shot = '';
    try {
      await clickByText(page, category);
      await page.waitForTimeout(350);
      const ok = await clickByText(page, menu);
      if (!ok) throw new Error('메뉴 버튼 없음: ' + menu);
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
    results.push({ id, persona, scope, category, menu, action: '조회', ms, outcome, error, shot });
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
  log('DONE', `pass ${payload.pass} / fail ${payload.fail} / warn ${payload.warn}`, '→ results.json');
  await browser.close();
  if (payload.fail > 0) process.exitCode = 1; // CI에서 실패 노출(리포트는 이미 생성됨)
})().catch((e) => { console.error('[qa-runner] FATAL', e); process.exit(1); });
