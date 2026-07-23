/**
 * 소개서(브로셔) 처리 — 기존 "리드(DEMO) 웹앱"에 붙이는 애드온.
 *
 * 왜 이렇게 하나:
 *   새로 만든 Apps Script 프로젝트는 Google이 이메일(MailApp) 권한 승인을
 *   하드 차단("This app is blocked")한다. 반면 기존 DEMO 웹앱은 이미 승인돼 있어
 *   여기에 브로셔 분기를 추가하면 "추가 권한 승인 없이" 바로 동작한다.
 *   (사용 권한: SpreadsheetApp(현재 시트) + MailApp — DEMO가 이미 가진 권한 그대로)
 *
 * ── 적용 방법 ───────────────────────────────────────────────────────
 * 1) 리드(DEMO) 스프레드시트에 바인딩된 Apps Script 프로젝트를 연다.
 *    (문의·뉴스레터가 저장되는 그 시트의 [확장 프로그램]>[Apps Script])
 * 2) 이 파일의 함수/상수를 그 프로젝트에 그대로 붙여넣는다(기존 코드 아래).
 * 3) 기존 doPost 안, 데이터 파싱 "직후"에 아래 3줄을 추가한다:
 *
 *      if (isBrochure_(data)) {
 *        handleBrochure_(data);
 *        return ContentService.createTextOutput(JSON.stringify({ ok: true }))
 *          .setMimeType(ContentService.MimeType.JSON);
 *      }
 *
 *    ※ data = JSON.parse(e.postData.contents) 결과 변수명에 맞춘다(보통 data 또는 d).
 * 4) [배포]>[배포 관리]>기존 배포 [편집]>버전 "새 버전" > 배포.
 *    → 권한이 그대로라 추가 승인 팝업이 뜨지 않는다(차단 없음).
 *
 * ※ 운영 라우팅: 브로셔 요청이 이 DEMO 웹앱으로 가도록 GitHub의 BROCHURE_WEBHOOK_URL
 *   시크릿을 삭제하면 된다(라우트가 DEMO_WEBHOOK_URL로 폴백). deploy.yml이 재배포 시
 *   .env에서 BROCHURE_WEBHOOK_URL을 제거한다.
 */

var BROCHURE_SHEET = "brochure"; // 같은 리드 스프레드시트 안의 전용 탭
var BROCHURE_PDF_URL = "https://labs.plateer.com/downloads/xgen-brochure.pdf";
var BROCHURE_FROM = "Plateer Labs";
// 내부 접수 알림 수신자(테스트 단계 — swan. 운영 전환 시 조정)
var BROCHURE_INTERNAL_TO = "swan@plateer.com";
var BROCHURE_HEADERS = [
  "수신시각", "이름", "이메일", "연락처", "회사", "부서", "직급",
  "방문경로", "마케팅수신동의", "자산", "레퍼러",
];

/** 소개서 다운로드 요청인지 판별. */
function isBrochure_(d) {
  return (
    !!d &&
    (d.asset === "xgen-brochure" || String(d.source || "").indexOf("resources") >= 0)
  );
}

/** 소개서 요청 처리 — 전용 탭 저장 + 요청자 링크 메일 + 내부 알림. */
function handleBrochure_(d) {
  brochureToSheet_(d);
  brochureMail_(d);
}

/** UTC ISO → 한국(서울) 시간 문자열. */
function brochureSeoul_(iso) {
  return Utilities.formatDate(
    iso ? new Date(iso) : new Date(),
    "Asia/Seoul",
    "yyyy-MM-dd HH:mm:ss",
  );
}

/** 리드 스프레드시트의 'brochure' 탭에 저장 — 1행 헤더 보장 + 최신 데이터 위로. */
function brochureToSheet_(d) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sh = ss.getSheetByName(BROCHURE_SHEET) || ss.insertSheet(BROCHURE_SHEET);
  if (sh.getRange(1, 1).getValue() !== BROCHURE_HEADERS[0]) {
    sh.insertRowBefore(1);
    sh.getRange(1, 1, 1, BROCHURE_HEADERS.length).setValues([BROCHURE_HEADERS]);
    sh.setFrozenRows(1);
  }
  var row = [
    brochureSeoul_(d.receivedAt),
    d.name || "", d.email || "", d.phone || "",
    d.company || "", d.department || "", d.jobTitle || "",
    d.referralPath || "", d.agreeMarketing ? "Y" : "N",
    d.asset || "xgen-brochure", d.source || "",
  ];
  sh.insertRowBefore(2);
  sh.getRange(2, 1, 1, row.length).setValues([row]);
}

/** 요청자에게 소개서 다운로드 링크 메일 + 내부 접수 알림. */
function brochureMail_(d) {
  var to = String(d.email || "").trim();
  if (!to) return;
  var name = d.name || "고객";

  var body = [
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

  var html =
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
    name: BROCHURE_FROM,
    replyTo: BROCHURE_INTERNAL_TO,
    subject: "[Plateer Labs] 요청하신 XGEN 소개서를 보내드립니다",
    body: body,
    htmlBody: html,
  });

  MailApp.sendEmail({
    to: BROCHURE_INTERNAL_TO,
    name: BROCHURE_FROM,
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
      "• 접수 시각(KST): " + brochureSeoul_(d.receivedAt),
    ].join("\n"),
  });
}
