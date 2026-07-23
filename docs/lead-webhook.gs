// ── XGEN 통합 리드 웹훅 (컨택·소개서·구독) — 한 스프레드시트, 탭 분리 ──
// Code.gs 전체를 이 내용으로 교체 → 배포 관리 > 편집 > 새 버전 배포.
// (권한: SpreadsheetApp + MailApp — 기존과 동일, 추가 승인/차단 없음)

const CONTACT_TO  = "chat2plex@gmail.com";
const CONTACT_BCC = "swan@plateer.com,chat2plex@gmail.com";
// 소개서 내부 접수 알림 수신자 (테스트 단계 — swan. 운영 전환 시 "xgen@plateer.com" 로 변경)
const BROCHURE_TO = "swan@plateer.com";

// 브로셔 종류 — 요청의 asset 값 → { 표시명, 다운로드 PDF }.
// 새 종류가 생기면 여기 한 줄만 추가 + 해당 PDF를 /public/downloads 에 올리면 된다.
var BROCHURE_TYPES = {
  "xgen-brochure":           { name: "XGEN",              pdf: "https://labs.plateer.com/downloads/xgen-brochure.pdf" },
  "code-assistant-brochure": { name: "AI Code Assistant", pdf: "https://labs.plateer.com/downloads/code-assistant-brochure.pdf" }
};
function brochureType(d){ return (d && BROCHURE_TYPES[d.asset]) || BROCHURE_TYPES["xgen-brochure"]; }

var CONTACT_COLS = [
  ["receivedAt","수신시각"], ["inquiryType","문의 유형"], ["referrer","레퍼러 페이지"],
  ["name","성함"], ["email","이메일"], ["phone","연락처"], ["company","회사"],
  ["department","부서"], ["jobTitle","직급"], ["referralPath","방문경로"], ["inquiry","상담 내용"],
  ["agreePrivacyPolicy","개인정보취급방침 동의"], ["agreePrivacyCollect","개인정보 수집·이용 동의"],
  ["agreeThirdParty","제3자 정보제공 동의"], ["agreeMarketing","마케팅 수신 동의"]
];
// '소개서' 열에는 종류 표시명(XGEN / AI Code Assistant)을 기록(brochureType 필드).
var BROCHURE_COLS = [
  ["receivedAt","수신시각"], ["brochureType","소개서"],
  ["name","성함"], ["email","이메일"], ["phone","연락처"], ["company","회사"],
  ["department","부서"], ["jobTitle","직급"], ["referralPath","방문경로"],
  ["agreePrivacyPolicy","개인정보취급방침 동의"], ["agreePrivacyCollect","개인정보 수집·이용 동의"],
  ["agreeMarketing","마케팅 수신 동의"]
];
var SUB_COLS = [
  ["receivedAt","수신시각"], ["kind","구분"], ["email","이메일"], ["subscribed","구독여부"]
];

/** UTC ISO(receivedAt)를 한국(서울) 시간 문자열로. 없으면 현재 시각. */
function seoulTime(iso){
  return Utilities.formatDate(iso ? new Date(iso) : new Date(), "Asia/Seoul", "yyyy-MM-dd HH:mm:ss");
}

function fmt(v){ if (typeof v==="boolean") return v?"Y":"N"; return v==null?"":v; }

function sheetFor(name, cols){
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sh = ss.getSheetByName(name) || ss.insertSheet(name);
  var headers = cols.map(function(c){ return c[1]; });
  var need = true;
  if (sh.getLastRow() >= 1) {
    var first = sh.getRange(1,1,1,headers.length).getValues()[0];
    need = (first.join("|") !== headers.join("|"));
  }
  if (need){ sh.insertRowBefore(1); sh.getRange(1,1,1,headers.length).setValues([headers]); sh.setFrozenRows(1); }
  return sh;
}
function prepend(name, cols, data){
  var sh = sheetFor(name, cols);
  var row = cols.map(function(c){ return fmt(data[c[0]]); });
  sh.insertRowAfter(1);
  sh.getRange(2,1,1,row.length).setValues([row]);
}
function upsertSubscriber(data){       // 구독은 이메일+구분 기준 upsert(재구독/해지 시 갱신)
  var sh = sheetFor("subscribers", SUB_COLS);
  var last = sh.getLastRow();
  if (last >= 2){
    var vals = sh.getRange(2,1,last-1,SUB_COLS.length).getValues();
    for (var i=0;i<vals.length;i++){
      if (vals[i][2] === data.email && vals[i][1] === data.kind){
        sh.getRange(i+2,1).setValue(fmt(data.receivedAt));
        sh.getRange(i+2,4).setValue(fmt(data.subscribed));
        return;
      }
    }
  }
  prepend("subscribers", SUB_COLS, data);
}
function body(cols, data){
  return cols.filter(function(c){ return c[0]!=="receivedAt"; })
    .map(function(c){ return "• "+c[1]+": "+fmt(data[c[0]]); })
    .join("\n") + "\n\n접수 시각: " + fmt(data.receivedAt);
}

/** 소개서 요청자에게 종류별 다운로드 링크 메일(첨부 X — 외부요청 권한 회피). */
function brochureMailToUser(data, t){
  var to = String(data.email||"").trim();
  if (!to) return;
  var name = data.name || "고객";
  var text = [
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
    "Plateer Labs 드림"
  ].join("\n");
  var html =
    '<div style="font-family:Apple SD Gothic Neo,Malgun Gothic,sans-serif;font-size:15px;line-height:1.7;color:#1a2233">' +
    "<p>" + name + "님, 안녕하세요.</p>" +
    "<p>Plateer Labs " + t.name + "에 관심 가져 주셔서 감사합니다.<br>" +
    "요청하신 <b>" + t.name + " 소개서</b>를 아래 버튼에서 바로 받으실 수 있습니다.</p>" +
    '<p style="margin:24px 0"><a href="' + t.pdf + '" ' +
    'style="display:inline-block;background:#2f7bff;color:#ffffff;text-decoration:none;padding:12px 22px;border-radius:8px;font-weight:bold">' +
    t.name + " 소개서 다운로드 (PDF)</a></p>" +
    '<p style="color:#5b6472;font-size:13.5px">버튼이 열리지 않으면 아래 주소를 복사해 주세요.<br>' + t.pdf + "</p>" +
    "<p>도입 검토·PoC·보안 요건 상담이 필요하시면 본 메일에 회신하시거나 " +
    '<a href="https://labs.plateer.com/contact">문의 페이지</a>를 이용해 주세요.</p>' +
    "<p>감사합니다.<br>Plateer Labs 드림</p></div>";
  MailApp.sendEmail({
    to: to, name: "Plateer Labs", replyTo: BROCHURE_TO,
    subject: "[Plateer Labs] 요청하신 " + t.name + " 소개서를 보내드립니다",
    body: text, htmlBody: html
  });
}

function doPost(e){
  var data = {};
  try { data = JSON.parse(e.postData.contents); } catch(err){}

  // 모든 탭 공통 — 수신시각을 한국(서울) 시간으로 통일
  data.receivedAt = seoulTime(data.receivedAt);

  if (data.kind === "newsletter" || data.kind === "blog"){
    upsertSubscriber(data);                          // 구독 → subscribers 탭(메일 없음)

  } else if (!!data.asset || (data.source||"").indexOf("resources") >= 0){
    var t = brochureType(data);                      // 소개서 종류 구분(XGEN / AI Code Assistant …)
    data.brochureType = t.name;                      // 시트 '소개서' 열에 종류 표시명 기록
    prepend("brochure", BROCHURE_COLS, data);        // 소개서 → brochure 탭
    brochureMailToUser(data, t);                     // ★ 요청자에게 종류별 다운로드 링크 메일
    MailApp.sendEmail({ to: BROCHURE_TO,             // 내부 접수 알림
      subject: "[소개서 신청/" + t.name + "] " + (data.name||"") + " (" + (data.company||"") + ")",
      body: body(BROCHURE_COLS, data) });

  } else {
    prepend("leads", CONTACT_COLS, data);            // 컨택 → leads 탭 + swan 메일
    MailApp.sendEmail({ to: CONTACT_TO, bcc: CONTACT_BCC, from: CONTACT_TO,
      subject: "[상담 문의] " + (data.inquiryType||"") + " - " + (data.name||"") + " (" + (data.company||"") + ")",
      body: body(CONTACT_COLS, data) + "\n레퍼러 페이지: " + fmt(data.referrer) });
  }
  return ContentService.createTextOutput(JSON.stringify({ ok:true }))
    .setMimeType(ContentService.MimeType.JSON);
}
