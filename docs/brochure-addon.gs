/**
 * 소개서(브로셔) 처리 — 기존 "리드(DEMO) 웹앱"에 붙이는 애드온 (브로셔 종류 구분).
 *
 * 왜 이렇게 하나:
 *   새로 만든 Apps Script 프로젝트는 Google이 이메일(MailApp) 권한 승인을
 *   하드 차단("This app is blocked")한다. 이미 승인된 DEMO 웹앱에 붙이면 추가 승인 없이 동작.
 *   (권한: SpreadsheetApp(현재 시트) + MailApp — DEMO가 이미 가진 권한 그대로)
 *
 * ── 브로셔 종류 ─────────────────────────────────────────────────────
 *   요청의 asset 값으로 종류를 구분한다. 지금은 XGEN 하나, 나중에 Code Assistant 등 추가.
 *   새 종류가 생기면 BROCHURE_TYPES에 한 줄 추가하고, 해당 PDF를
 *   /public/downloads 에 올린 뒤 그 폼이 asset을 그 값으로 보내게만 하면 된다.
 *
 * ── 적용 방법 ───────────────────────────────────────────────────────
 * 1) 리드(DEMO) 스프레드시트에 바인딩된 Apps Script 프로젝트를 연다.
 * 2) 이 파일의 함수/상수를 그 프로젝트에 붙여넣는다(기존 코드 아래). 이 파일엔 doPost가 없다.
 * 3) 기존 doPost 안, 데이터 파싱 "직후 = 맨 앞"에 아래 분기를 넣는다.
 *    (⚠️ 반드시 기존 브로셔/리드 처리보다 "위"에 둬서 이 애드온이 먼저 처리·반환하게)
 *
 *      if (isBrochure_(data)) {
 *        handleBrochure_(data);
 *        return ContentService.createTextOutput(JSON.stringify({ ok: true }))
 *          .setMimeType(ContentService.MimeType.JSON);
 *      }
 *
 *    ※ 기존 doPost에 이미 브로셔(asset==='xgen-brochure') 처리 분기가 있으면 그건 삭제.
 *    ※ data = JSON.parse(e.postData.contents) 결과 변수명에 맞춘다.
 * 4) [배포]>[배포 관리]>기존 배포 [편집]>버전 "새 버전" > 배포. (권한 그대로 → 차단 없음)
 */

// 브로셔 종류 — asset 값 → { 표시명, 다운로드 PDF }. 새 종류는 여기 한 줄 추가.
var BROCHURE_TYPES = {
  "xgen-brochure": {
    name: "XGEN",
    pdf: "https://labs.plateer.com/downloads/xgen-brochure.pdf",
  },
  "code-assistant-brochure": {
    name: "AI Code Assistant",
    pdf: "https://labs.plateer.com/downloads/code-assistant-brochure.pdf",
  },
};
var BROCHURE_DEFAULT_ASSET = "xgen-brochure";

var BROCHURE_SHEET = "brochure"; // 리드 스프레드시트 내 전용 탭
var BROCHURE_FROM = "Plateer Labs";
var BROCHURE_INTERNAL_TO = "swan@plateer.com"; // 테스트 단계
// 기존 brochure 탭 스키마에 정렬(12열). B열 '소개서'에 종류 표시명(XGEN 등)을 기록.
var BROCHURE_HEADERS = [
  "수신시각", "소개서", "성함", "이메일", "연락처", "회사", "부서", "직급",
  "방문경로", "개인정보취급방침", "개인정보 수집·이용", "마케팅 수신 동의",
];

/** 소개서 다운로드 요청인지 판별(asset에 brochure 포함 or 레퍼러가 자료실). */
function isBrochure_(d) {
  return (
    !!d &&
    ((typeof d.asset === "string" && d.asset.indexOf("brochure") >= 0) ||
      String(d.source || "").indexOf("resources") >= 0)
  );
}

/** asset → 브로셔 종류 { name, pdf }. 미매칭이면 기본(XGEN). */
function brochureType_(d) {
  var key = (d && d.asset) || BROCHURE_DEFAULT_ASSET;
  return BROCHURE_TYPES[key] || BROCHURE_TYPES[BROCHURE_DEFAULT_ASSET];
}

/** 소개서 요청 처리 — 종류별 전용 탭 저장 + 요청자 링크 메일 + 내부 알림. */
function handleBrochure_(d) {
  var t = brochureType_(d);
  brochureToSheet_(d, t);
  brochureMail_(d, t);
}

/** UTC ISO → 한국(서울) 시간 문자열. */
function brochureSeoul_(iso) {
  return Utilities.formatDate(
    iso ? new Date(iso) : new Date(),
    "Asia/Seoul",
    "yyyy-MM-dd HH:mm:ss",
  );
}

/** 'brochure' 탭에 저장 — 1행 헤더 보장 + 최신 데이터 위로. B열=종류 표시명. */
function brochureToSheet_(d, t) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sh = ss.getSheetByName(BROCHURE_SHEET) || ss.insertSheet(BROCHURE_SHEET);
  if (sh.getRange(1, 1).getValue() !== BROCHURE_HEADERS[0]) {
    sh.insertRowBefore(1);
    sh.getRange(1, 1, 1, BROCHURE_HEADERS.length).setValues([BROCHURE_HEADERS]);
    sh.setFrozenRows(1);
  }
  var row = [
    brochureSeoul_(d.receivedAt),
    t.name, // 소개서 종류(XGEN / AI Code Assistant …)
    d.name || "", d.email || "", d.phone || "",
    d.company || "", d.department || "", d.jobTitle || "",
    d.referralPath || "",
    d.agreePrivacyPolicy ? "Y" : "N",
    d.agreePrivacyCollect ? "Y" : "N",
    d.agreeMarketing ? "Y" : "N",
  ];
  sh.insertRowBefore(2);
  sh.getRange(2, 1, 1, row.length).setValues([row]);
}

/** 요청자에게 종류별 소개서 다운로드 링크 메일 + 내부 접수 알림. */
function brochureMail_(d, t) {
  var to = String(d.email || "").trim();
  if (!to) return;
  var name = d.name || "고객";

  var body = [
    name + "님, 안녕하세요.",
    "",
    "Plateer Labs " + t.name + "에 관심 가져 주셔서 감사합니다.",
    "요청하신 " + t.name + " 소개서는 아래 링크에서 바로 받으실 수 있습니다.",
    "",
    t.pdf,
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
    "<p>Plateer Labs " + t.name + "에 관심 가져 주셔서 감사합니다.<br>" +
    "요청하신 <b>" + t.name + " 소개서</b>를 아래 버튼에서 바로 받으실 수 있습니다.</p>" +
    '<p style="margin:24px 0">' +
    '<a href="' + t.pdf + '" style="display:inline-block;background:#2f7bff;' +
    'color:#ffffff;text-decoration:none;padding:12px 22px;border-radius:8px;font-weight:bold">' +
    t.name + " 소개서 다운로드 (PDF)</a></p>" +
    '<p style="color:#5b6472;font-size:13.5px">버튼이 열리지 않으면 아래 주소를 복사해 주세요.<br>' +
    t.pdf + "</p>" +
    "<p>도입 검토·PoC·보안 요건 상담이 필요하시면 본 메일에 회신하시거나 " +
    '<a href="https://labs.plateer.com/contact">문의 페이지</a>를 이용해 주세요.</p>' +
    "<p>감사합니다.<br>Plateer Labs 드림</p></div>";

  MailApp.sendEmail({
    to: to,
    name: BROCHURE_FROM,
    replyTo: BROCHURE_INTERNAL_TO,
    subject: "[Plateer Labs] 요청하신 " + t.name + " 소개서를 보내드립니다",
    body: body,
    htmlBody: html,
  });

  MailApp.sendEmail({
    to: BROCHURE_INTERNAL_TO,
    name: BROCHURE_FROM,
    replyTo: to,
    subject: "[소개서 다운로드/" + t.name + "] " + (d.company || "") + " " + (d.name || ""),
    body: [
      t.name + " 소개서 다운로드 요청이 접수되었습니다.",
      "",
      "• 소개서 종류: " + t.name + " (" + (d.asset || "") + ")",
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
