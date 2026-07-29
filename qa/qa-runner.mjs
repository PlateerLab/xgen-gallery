// XGEN 기능 QA 실러너 (Playwright) — 실제 로그인 후 각 메뉴/액션을 진짜 수행·검증하고
// 실제 스크린샷(실패·주의만) + results.json 을 생성한다.
//   로컬:  QA_EMAIL=... QA_PASS=... [QA_OUT=절대경로] node qa/qa-runner.mjs   (env 기본 dev)
//   CI:    secrets(QA_EMAIL/QA_PASS) 주입 + QA_ENV 로 대상 지정
//
// 각 케이스의 desc = 그 테스트의 목적/용도(콘솔 '맥락' 컬럼에 표시).
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

// nav: 'admin' | 'main' | 'teams' | 'chatexec' | 'mainaction'
// mainaction: category>menu 진입 후 do(트리거 클릭+검증) 또는 present(버튼 노출 검증)
const CASES = [
  // ── 공통 · 권한 무관 (로그인만으로 접근) ──
  { id:'TC-CHT-001', persona:'all', scope:'공통', category:'Agent 채팅', menu:'채팅 시작', action:'조회', nav:'main',
    desc:'채팅 시작 화면 진입·에이전트플로우 선택 UI 로드 확인' },
  { id:'TC-CHT-003', persona:'all', scope:'공통', category:'Agent 채팅', menu:'채팅 이력', action:'조회', nav:'main',
    desc:'지난 대화 이력 조회·목록 렌더 확인' },
  { id:'TC-TMS-001', persona:'all', scope:'공통', category:'Teams', menu:'Teams', action:'조회', nav:'teams',
    desc:'Teams 협업 페이지 진입·목록 로드 확인' },
  { id:'TC-CHT-EXEC', persona:'all', scope:'공통', category:'Agent 채팅', menu:'에이전트 실행', action:'실행', nav:'chatexec',
    prompt:'안녕하세요. XGEN QA 자동 점검입니다. 이 에이전트의 역할을 한 문장으로 소개해 주세요.',
    desc:'에이전트 실행: 프롬프트 전송→LLM 응답 수신까지 정상 동작 확인' },

  // ── 에이전트 작업실(MAIN) — 액션 유형별 단위 테스트 ──
  // Agent 제작 > Agent 목록
  { id:'TC-MAIN-LIST',  persona:'dev', scope:'MAIN', category:'Agent 제작', menu:'Agent 목록', action:'조회', nav:'main',
    desc:'에이전트 목록 조회·카드 렌더 정상 확인' },
  { id:'TC-MAIN-CREATE',persona:'dev', scope:'MAIN', category:'Agent 제작', menu:'Agent 목록', action:'생성', nav:'mainaction', trigger:'Agent 생성하기',
    desc:'신규 에이전트 생성 진입 흐름(생성 화면 전환) 정상 동작 확인' },
  { id:'TC-MAIN-EDIT',  persona:'dev', scope:'MAIN', category:'Agent 제작', menu:'Agent 목록', action:'수정', nav:'mainaction', trigger:'편집',
    desc:'기존 에이전트 편집 진입(캔버스 로드) 정상 동작 확인' },
  { id:'TC-MAIN-BULK',  persona:'dev', scope:'MAIN', category:'Agent 제작', menu:'Agent 목록', action:'일괄', nav:'mainaction', trigger:'다중 선택',
    desc:'다중 선택(일괄 작업) 모드 진입 정상 동작 확인' },
  { id:'TC-MAIN-DUP',   persona:'dev', scope:'MAIN', category:'Agent 제작', menu:'Agent 목록', action:'복제', nav:'mainaction', present:'복제',
    desc:'에이전트 복제 액션 노출·가용성 확인(비파괴: 실제 복제 미수행)' },
  { id:'TC-MAIN-RUN',   persona:'dev', scope:'MAIN', category:'Agent 제작', menu:'Agent 목록', action:'실행', nav:'mainaction', present:'실행',
    desc:'목록에서 에이전트 실행 액션 노출·가용성 확인' },
  { id:'TC-MAIN-MORE',  persona:'dev', scope:'MAIN', category:'Agent 제작', menu:'Agent 목록', action:'삭제', nav:'mainaction', present:'더보기',
    desc:'삭제·공유·배포 등 추가 액션 메뉴(더보기) 노출 확인(비파괴)' },
  { id:'TC-MAIN-SEARCH',persona:'dev', scope:'MAIN', category:'Agent 제작', menu:'Agent 목록', action:'조회', nav:'mainaction', present:'검색',
    desc:'에이전트 검색 입력 노출·조회 필터 가용성 확인' },
  // Agent 제작 > Agent 설계 (캔버스)
  { id:'TC-MAIN-CANVAS',persona:'dev', scope:'MAIN', category:'Agent 제작', menu:'Agent 설계', action:'캔버스', nav:'main',
    desc:'Agent 설계 캔버스 진입·노드/편집 UI 로드 확인' },
  // Agent 제작 > 기타
  { id:'TC-MAIN-PROMPT',persona:'dev', scope:'MAIN', category:'Agent 제작', menu:'Agent 프롬프트', action:'조회', nav:'main',
    desc:'프롬프트 자산 관리 화면 진입·목록 로드 확인' },
  { id:'TC-MAIN-QUAL',  persona:'dev', scope:'MAIN', category:'Agent 제작', menu:'Agent 품질 평가', action:'조회', nav:'main',
    desc:'에이전트 품질 평가 화면 진입·지표 로드 확인' },
  // 도구 연동
  { id:'TC-MAIN-APITOOL',persona:'dev', scope:'MAIN', category:'도구 연동', menu:'API 도구', action:'조회', nav:'main',
    desc:'API 도구 목록 조회·연동 자산 렌더 확인' },
  { id:'TC-MAIN-APINEW', persona:'dev', scope:'MAIN', category:'도구 연동', menu:'API 도구', action:'생성', nav:'mainaction', present:'추가',
    desc:'API 도구 신규 등록 액션 노출·가용성 확인(비파괴)' },
  { id:'TC-MAIN-AUTH',   persona:'dev', scope:'MAIN', category:'도구 연동', menu:'인증 프로필', action:'조회', nav:'main',
    desc:'인증 프로필 목록 조회·시크릿 자산 렌더 확인' },
  // 지식관리
  { id:'TC-MAIN-KNOW',   persona:'dev', scope:'MAIN', category:'지식관리', menu:'지식 컬렉션', action:'조회', nav:'main',
    desc:'지식 컬렉션 목록 조회·RAG 자산 렌더 확인' },
  { id:'TC-MAIN-UPLOAD', persona:'dev', scope:'MAIN', category:'지식관리', menu:'지식 컬렉션', action:'업로드/다운로드', nav:'mainaction', present:'업로드',
    desc:'지식 문서 업로드 액션 노출·가용성 확인(비파괴: 실제 업로드 미수행)' },
  { id:'TC-MAIN-FILES',  persona:'dev', scope:'MAIN', category:'지식관리', menu:'파일 저장소', action:'조회', nav:'main',
    desc:'파일 저장소 조회·업로드/다운로드 UI 로드 확인' },

  // ── 관리설정(ADMIN) — 각 카테고리 진입 스모크 ──
  { id:'TC-ADM-101', persona:'admin', scope:'ADMIN', category:'사용자 / 접근제어', menu:'사용자 관리', action:'조회', nav:'admin', desc:'사용자 계정 목록 조회·관리 화면 로드 확인' },
  { id:'TC-ADM-102', persona:'admin', scope:'ADMIN', category:'사용자 / 접근제어', menu:'역할/권한 관리', action:'조회', nav:'admin', desc:'역할·권한 관리 화면 진입·권한 매트릭스 로드 확인' },
  { id:'TC-ADM-103', persona:'admin', scope:'ADMIN', category:'Agent 운영', menu:'Agent 관리', action:'조회', nav:'admin', desc:'배포된 에이전트 운영 목록 조회 확인' },
  { id:'TC-ADM-104', persona:'admin', scope:'ADMIN', category:'Agent 운영', menu:'채팅 모니터링', action:'조회', nav:'admin', desc:'채팅 모니터링 대시보드 진입·정상 렌더 확인' },
  { id:'TC-ADM-105', persona:'admin', scope:'ADMIN', category:'Agent 운영', menu:'사용자 피드백', action:'조회', nav:'admin', desc:'사용자 피드백 수집 현황 조회 확인' },
  { id:'TC-GOV-106', persona:'gov', scope:'ADMIN', category:'AI 거버넌스', menu:'AI 위험도 평가', action:'조회', nav:'admin', desc:'AI 위험도 평가 화면 진입·평가 항목 로드 확인' },
  { id:'TC-GOV-107', persona:'gov', scope:'ADMIN', category:'AI 거버넌스', menu:'통제 정책 관리', action:'조회', nav:'admin', desc:'통제 정책(PII·금칙어·위험등급) 관리 화면 로드 확인' },
  { id:'TC-ADM-108', persona:'admin', scope:'ADMIN', category:'환경 설정', menu:'전체 설정', action:'조회', nav:'admin', desc:'환경 전체 설정 화면 진입·구성 로드 확인' },
  { id:'TC-ADM-109', persona:'admin', scope:'ADMIN', category:'시스템 상태', menu:'시스템 모니터링', action:'조회', nav:'admin', desc:'시스템 상태 모니터링 대시보드 로드 확인' },
  { id:'TC-ADM-110', persona:'admin', scope:'ADMIN', category:'데이터 관리', menu:'데이터베이스', action:'조회', nav:'admin', desc:'데이터베이스 관리 화면 진입·자산 로드 확인' },
  { id:'TC-ADM-111', persona:'admin', scope:'ADMIN', category:'MCP 관리', menu:'MCP 라이브러리', action:'조회', nav:'admin', desc:'MCP 라이브러리 조회·연동 자원 렌더 확인' },
  { id:'TC-ADM-112', persona:'admin', scope:'ADMIN', category:'서비스 운영', menu:'공지 게시판', action:'조회', nav:'admin', desc:'공지 게시판 운영 화면 진입·목록 로드 확인' },
  { id:'TC-ADM-113', persona:'admin', scope:'ADMIN', category:'지식 운영', menu:'지식 컬렉션 관리', action:'조회', nav:'admin', desc:'관리자 지식 컬렉션 운영 화면 로드 확인' },
];

const log = (...a) => console.log('[qa-runner]', ...a);
const clickByText = (page, txt) => page.evaluate((t) => {
  const b = [...document.querySelectorAll('button')].find((x) => x.textContent.trim() === t);
  if (b) { b.click(); return true; } return false;
}, txt);
// 버튼 노출 검사 — 텍스트/aria-label/title 부분일치 + 표시상태(아이콘 버튼 대응)
const hasButton = (page, txt) => page.evaluate((t) =>
  [...document.querySelectorAll('button,[role="button"],a')].some((x) => {
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
    await page.waitForTimeout(1200);
    _curApp = app;
  }
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
async function pageErr(page) {
  return page.evaluate(() => { const m = document.querySelector('main') || document.body; const t = m.innerText || '';
    return { len: t.length, err: /문제가 발생|오류가 발생|Something went wrong|Error:/.test(t),
      dialog: !!document.querySelector('[role="dialog"],[aria-modal="true"]') }; });
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
    const { id, persona, scope, category, menu, action, nav, desc } = cs;
    const t0 = Date.now(); let outcome = 'pass', error = '', shot = '';
    try {
      if (nav === 'chatexec') {
        if (!(await chatExec(page, cs.prompt))) { outcome = 'fail'; error = '에이전트 응답 미수신'; }
      } else if (nav === 'mainaction') {
        _curApp = '';                       // 액션마다 /main 새로 진입해 목록 상태 초기화
        await gotoApp(page, 'main');
        await clickWait(page, category); await page.waitForTimeout(400);
        if (!(await clickWait(page, menu))) throw new Error('메뉴 버튼 없음: ' + menu);
        await page.waitForTimeout(2600);    // 목록/카드 로드 대기
        if (cs.present) {
          if (!(await hasButton(page, cs.present))) { outcome = 'fail'; error = '액션 노출 안 됨: ' + cs.present; }
        } else if (cs.trigger) {
          if (!(await clickWait(page, cs.trigger))) throw new Error('액션 버튼 없음: ' + cs.trigger);
          await page.waitForTimeout(1800);
          const info = await pageErr(page);
          if (info.err) { outcome = 'fail'; error = '에러 바운더리 감지'; }
        }
      } else { // admin | main | teams
        if (nav === 'admin' || nav === 'main') {
          await gotoApp(page, nav === 'admin' ? 'admin' : 'main');
          await clickWait(page, category); await page.waitForTimeout(400);
          if (!(await clickWait(page, menu))) throw new Error('메뉴 버튼 없음: ' + menu);
        } else if (nav === 'teams') {
          await gotoApp(page, 'main');
          if (!(await clickWait(page, menu))) throw new Error('버튼 없음: ' + menu);
        }
        await page.waitForTimeout(1600);
        const info = await pageErr(page);
        if (info.err) { outcome = 'fail'; error = '에러 바운더리 감지'; }
        else if (info.len < 60) { outcome = 'warn'; error = `본문 렌더 미흡(${info.len}chars)`; }
      }
      if (outcome !== 'pass') { shot = `shots/${id}.png`; await page.screenshot({ path: path.join(OUT, shot), fullPage: false }); }
    } catch (e) {
      outcome = 'fail'; error = String(e.message || e);
      try { shot = `shots/${id}.png`; await page.screenshot({ path: path.join(OUT, shot) }); } catch {}
    }
    const ms = Date.now() - t0;
    results.push({ id, persona, scope, category, menu, action, desc, ms, outcome, error, shot });
    log(id, outcome, ms + 'ms', error);
  }

  const payload = { env: ENVV, base: BASE, ranAt: new Date().toISOString(), total: results.length,
    pass: results.filter((r) => r.outcome === 'pass').length,
    fail: results.filter((r) => r.outcome === 'fail').length,
    warn: results.filter((r) => r.outcome === 'warn').length, results };
  fs.writeFileSync(path.join(OUT, 'results.json'), JSON.stringify(payload, null, 1), 'utf8');
  log('DONE', `total ${payload.total} · pass ${payload.pass}/fail ${payload.fail}/warn ${payload.warn}`, '→ results.json');
  await browser.close();
  if (payload.fail > 0) process.exitCode = 1;
})().catch((e) => { console.error('[qa-runner] FATAL', e); process.exit(1); });
