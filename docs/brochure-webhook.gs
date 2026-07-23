/**
 * Plateer AI Labs — XGEN 소개서 다운로드 전용 웹훅 (독립 파일/시트)
 *
 * 리드관리(문의·체험)와 분리한다 — 뉴스레터처럼 "전용 스프레드시트 + 전용 배포"로
 * 운영한다. 브로셔 라우트(/api/brochure-request)는 BROCHURE_WEBHOOK_URL을 우선
 * 사용하므로, 이 스크립트를 배포해 그 URL만 설정하면 소개서 리드가 이 파일로 분리된다.
 *
 * 처리 흐름: /resources 소개서 폼 → /api/brochure-request → (BROCHURE_WEBHOOK_URL) 이 스크립트
 *   ① 전용 시트에 리드 저장 (수신시각 = 한국(서울) 시간, 최신 데이터가 위로)
 *   ② 요청자에게 XGEN 소개서 다운로드 링크 메일 발송 (첨부 X — 외부요청 권한 회피)
 *   ③ 내부 접수 알림
 *
 * ── 배포 방법 ───────────────────────────────────────────────────────
 * 1) 새 구글 스프레드시트 생성 (예: "소개서 다운로드")  ← 리드관리 시트와 별개 파일
 * 2) [확장 프로그램] > [Apps Script] > 기본 코드 지우고 이 파일 전체 붙여넣기 > 저장
 * 3) [배포] > [새 배포] > 유형 "웹 앱"
 *      - 실행 계정: 나 (보낸사람 주소가 이 계정이 됨)
 *      - 액세스 권한: 모든 사용자 (Anyone)
 *    → [배포] > 권한 검토/승인(시트·메일·외부요청) 1회 허용 → "/exec" URL 복사
 * 4) 그 /exec URL을 운영 env의 BROCHURE_WEBHOOK_URL 에 설정 (docs/README 또는 .env / deploy.yml)
 * ※ 코드 수정 후 재배포: [배포]>[배포 관리]>기존 배포 [편집]>버전 "새 버전" (URL 유지)
 * ※ 소개서 PDF(약 14MB) < 메일 첨부 한도(25MB) — 첨부 발송 문제 없음.
 */

const SHEET_NAME = "brochure";
// 소개서 PDF 다운로드 링크(운영 공개 정적 파일). 메일에 버튼/링크로 넣는다.
// ※ 첨부(UrlFetchApp로 가져와 attachments) 대신 링크를 쓰는 이유:
//   UrlFetchApp의 외부요청 권한(script.external_request)은 Google이 미검증 앱에
//   대해 인증을 하드 차단("This app is blocked")한다. 링크 방식은 권한이
//   Spreadsheet+Mail 뿐이라(리드 DEMO 웹훅과 동일) 승인이 정상 통과한다.
const BROCHURE_PDF_URL = "https://labs.plateer.com/downloads/xgen-brochure.pdf";
const FROM_NAME = "Plateer Labs";
// 내부 접수 알림 수신자. (테스트 단계 — swan@plateer.com. 운영 전환 시 xgen@plateer.com 등)
const INTERNAL_TO = "swan@plateer.com";

const HEADERS = [
  "수신시각",
  "이름",
  "이메일",
  "연락처",
  "회사",
  "부서",
  "직급",
  "방문경로",
  "마케팅수신동의",
  "자산",
  "레퍼러",
];

function doPost(e) {
  try {
    const d = JSON.parse(e.postData.contents);
    saveToSheet_(d);
    sendBrochureEmail_(d);
    return json_({ ok: true });
  } catch (err) {
    return json_({ ok: false, error: String(err) });
  }
}

/** UTC ISO(receivedAt)를 한국(서울) 시간 문자열로. 없으면 현재 시각. */
function seoulTime_(iso) {
  return Utilities.formatDate(
    iso ? new Date(iso) : new Date(),
    "Asia/Seoul",
    "yyyy-MM-dd HH:mm:ss",
  );
}

/** 전용 시트에 한 줄 저장 — 1행 헤더 보장 + 최신 데이터가 항상 2행(헤더 아래 맨 위)에. */
function saveToSheet_(d) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sh = ss.getSheetByName(SHEET_NAME);
  if (!sh) sh = ss.insertSheet(SHEET_NAME);
  // 헤더 보장(멱등) — 1행 A1이 헤더가 아니면(빈 시트·헤더 유실) 1행에 헤더를 삽입한다.
  // 이미 데이터만 있고 헤더가 없던 경우, 다음 저장 시 헤더가 맨 위로 자가 복구된다.
  if (sh.getRange(1, 1).getValue() !== HEADERS[0]) {
    sh.insertRowBefore(1);
    sh.getRange(1, 1, 1, HEADERS.length).setValues([HEADERS]);
    sh.setFrozenRows(1);
  }
  const row = [
    seoulTime_(d.receivedAt),
    d.name || "",
    d.email || "",
    d.phone || "",
    d.company || "",
    d.department || "",
    d.jobTitle || "",
    d.referralPath || "",
    d.agreeMarketing ? "Y" : "N",
    d.asset || "xgen-brochure",
    d.source || "",
  ];
  sh.insertRowBefore(2); // 최신 데이터를 헤더 바로 아래(위쪽)에 삽입
  sh.getRange(2, 1, 1, row.length).setValues([row]);
}

/** 요청자에게 소개서 PDF 첨부 발송 + 내부 접수 알림(첨부 없음). */
function sendBrochureEmail_(d) {
  const to = String(d.email || "").trim();
  if (!to) return;

  const name = d.name || "고객";

  // ① 요청자에게 소개서 다운로드 링크 발송 (첨부 대신 링크 — 상단 주석 참고)
  const bodyText = [
    name + "님, 안녕하세요.",
    "",
    "Plateer Labs XGEN에 관심 가져 주셔서 감사합니다.",
    "요청하신 XGEN 소개서는 아래 링크에서 바로 받으실 수 있습니다.",
    "",
    BROCHURE_PDF_URL,
    "",
    "도입 검토·PoC·보안 요건 상담이 필요하시면 본 메일에 회신하시거나",
    "https://labs.plateer.com/contact 로 문의해 주세요.",
    "",
    "감사합니다.",
    "Plateer Labs 드림",
  ].join("\n");
  const htmlBody =
    '<div style="font-family:Apple SD Gothic Neo,Malgun Gothic,sans-serif;font-size:15px;line-height:1.7;color:#1a2233">' +
    "<p>" + name + "님, 안녕하세요.</p>" +
    "<p>Plateer Labs XGEN에 관심 가져 주셔서 감사합니다.<br>" +
    "요청하신 <b>XGEN 소개서</b>를 아래 버튼에서 바로 받으실 수 있습니다.</p>" +
    '<p style="margin:24px 0">' +
    '<a href="' + BROCHURE_PDF_URL + '" style="display:inline-block;background:#2f7bff;' +
    'color:#ffffff;text-decoration:none;padding:12px 22px;border-radius:8px;font-weight:bold">' +
    "XGEN 소개서 다운로드 (PDF)</a></p>" +
    '<p style="color:#5b6472;font-size:13.5px">버튼이 열리지 않으면 아래 주소를 복사해 주세요.<br>' +
    BROCHURE_PDF_URL + "</p>" +
    "<p>도입 검토·PoC·보안 요건 상담이 필요하시면 본 메일에 회신하시거나 " +
    '<a href="https://labs.plateer.com/contact">문의 페이지</a>를 이용해 주세요.</p>' +
    "<p>감사합니다.<br>Plateer Labs 드림</p></div>";

  MailApp.sendEmail({
    to: to,
    name: FROM_NAME,
    replyTo: INTERNAL_TO,
    subject: "[Plateer Labs] 요청하신 XGEN 소개서를 보내드립니다",
    body: bodyText,
    htmlBody: htmlBody,
  });

  // ② 내부 접수 알림(첨부 없음)
  MailApp.sendEmail({
    to: INTERNAL_TO,
    name: FROM_NAME,
    replyTo: to,
    subject: "[소개서 다운로드] " + (d.company || "") + " " + (d.name || ""),
    body: [
      "XGEN 소개서 다운로드 요청이 접수되었습니다.",
      "",
      "• 이름: " + (d.name || ""),
      "• 이메일: " + to,
      "• 연락처: " + (d.phone || ""),
      "• 회사: " + (d.company || ""),
      "• 부서: " + (d.department || ""),
      "• 직급: " + (d.jobTitle || ""),
      "• 방문경로: " + (d.referralPath || ""),
      "• 마케팅 수신 동의: " + (d.agreeMarketing ? "Y" : "N"),
      "• 레퍼러: " + (d.source || ""),
      "• 접수 시각(KST): " + seoulTime_(d.receivedAt),
    ].join("\n"),
  });
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(
    ContentService.MimeType.JSON,
  );
}
