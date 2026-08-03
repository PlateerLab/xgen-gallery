// ── XGEN 통합 리드 웹훅 (컨택·소개서·구독) — 한 스프레드시트, 탭 분리 ──
// Code.gs 전체를 이 내용으로 교체 → 배포 관리 > 편집 > 새 버전 배포.
// (권한: SpreadsheetApp + MailApp — 기존과 동일, 추가 승인/차단 없음)

// ⚠️ 평소 이 메일들은 앱(mailer.ts, O365 SMTP)이 보낸다 — 아래 상수는 앱 장애 시
//    롤백(주석 해제)용이므로 수신자를 바꿀 때 frontend/src/lib/mailer.ts와 함께 고친다.
// 상담·소개서 양쪽에 공통으로 받는 담당자.
const EXTRA_INTERNAL_TO = "shinss@plateer.com, yklee@plateer.com, ndh6913@plateer.com, woomun_jung@plateer.com";
const CONTACT_TO  = "chat2plex@gmail.com";
const CONTACT_BCC = "swan@plateer.com, chat2plex@gmail.com, " + EXTRA_INTERNAL_TO;
// 소개서 내부 접수 알림 수신자 — swan + xgen + 공통 담당자.
const BROCHURE_TO = "swan@plateer.com, xgen@plateer.com, " + EXTRA_INTERNAL_TO;

// 브랜드 주소(답장 주소). ⚠️ plateer.com은 Microsoft365라 xgen@plateer.com은 O365 SMTP
//   별칭이고, Apps Script(MailApp)는 SMTP 별칭을 from으로 못 쓴다(구조적 한계 → 실제 발신은
//   소유 계정 chat2plex로 나감). 그래서 from은 지정하지 않고, 모든 메일의 표시이름을
//   "Plateer Labs"로, 답장주소(replyTo)를 이 주소로 통일한다. (진짜 xgen 발신은 앱+O365 SMTP 필요)
const FROM_ADDR = "xgen@plateer.com";
const FROM_NAME = "Plateer Labs";

// 브로셔 종류 — 요청의 asset 값 → { 표시명, 다운로드 PDF }.
// 새 종류가 생기면 여기 한 줄만 추가 + 해당 PDF를 /public/downloads 에 올리면 된다.
// ⚠️ 아래 /downloads/*.pdf 주소는 이제 **403**이다. 소개서 무단 다운로드를 막으려고
//    직접 접근을 차단하고, 서명·만료가 붙은 /api/brochure/download 링크로만 내려준다.
//    이 스크립트에서 메일 발송을 되살리려면 PDF를 첨부하거나, 앱이 만든 서명 링크를
//    받아 쓰도록 고쳐야 한다(서명 키가 앱에 있어 Apps Script 혼자서는 못 만든다).
//    현재 소개서 메일은 앱이 담당자에게만 보내고, 담당자가 확인 후 전달한다.
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
  ["agreeMarketing","마케팅 수신 동의"]
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

// from(발신주소) 별칭이 미등록이면 MailApp이 예외를 던지므로, from 없이 재시도해 발송을 보장.
function sendMail_(opts){
  try { MailApp.sendEmail(opts); }
  catch (err){
    var o = {}; for (var k in opts){ if (k !== "from") o[k] = opts[k]; }
    MailApp.sendEmail(o);
  }
}

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
  sendMail_({
    to: to, name: FROM_NAME, replyTo: FROM_ADDR,
    subject: "[Plateer Labs] 요청하신 " + t.name + " 소개서를 보내드립니다",
    body: text, htmlBody: html
  });
}

/** 상담 신청자에게 접수 확인 메일(보낸사람 xgen, 받는사람 = 폼 이메일). */
function contactConfirmToUser_(data){
  var to = String(data.email || "").trim();
  if (!to) return;
  var name = data.name || "고객";
  var text = [
    name + "님, 안녕하세요.",
    "",
    "Plateer Labs에 문의해 주셔서 감사합니다. 아래 내용으로 상담 신청이 접수되었습니다.",
    "",
    "• 문의 유형: " + (data.inquiryType || ""),
    "• 상담 내용: " + (data.inquiry || ""),
    "",
    "담당자가 영업일 기준 1~2일 내에 이메일 또는 전화로 연락드리겠습니다.",
    "",
    "감사합니다.",
    "Plateer Labs 드림"
  ].join("\n");
  var html =
    '<div style="font-family:Apple SD Gothic Neo,Malgun Gothic,sans-serif;font-size:15px;line-height:1.7;color:#1a2233">' +
    "<p>" + name + "님, 안녕하세요.</p>" +
    "<p>Plateer Labs에 문의해 주셔서 감사합니다.<br>아래 내용으로 <b>상담 신청이 접수</b>되었습니다.</p>" +
    '<div style="margin:16px 0;padding:14px 16px;background:#f5f7fb;border-radius:10px">' +
    "<p style=\"margin:0 0 6px\"><b>문의 유형</b> · " + escapeHtml_(data.inquiryType || "") + "</p>" +
    "<p style=\"margin:0;color:#5b6472\">" + escapeHtml_(data.inquiry || "") + "</p></div>" +
    "<p>담당자가 <b>영업일 기준 1~2일 내</b>에 이메일 또는 전화로 연락드리겠습니다.</p>" +
    "<p>감사합니다.<br>Plateer Labs 드림</p></div>";
  sendMail_({
    to: to, name: FROM_NAME, replyTo: FROM_ADDR,
    subject: "[Plateer Labs] 상담 신청이 접수되었습니다",
    body: text, htmlBody: html
  });
}

function doPost(e){
  var data = {};
  try { data = JSON.parse(e.postData.contents); } catch(err){}

  // 새 콘텐츠 발행 알림 — 해당 종류 구독중(Y) 구독자에게 요약 메일. 공개 /exec 남용 방지로 토큰 인증.
  if (data.kind === "blog-notify"){
    return contentNotify_(data, "blog", "새 글", "Plateer Labs 블로그에 새 글이 올라왔습니다.");
  }
  if (data.kind === "newsletter-notify"){
    return contentNotify_(data, "newsletter", "새 뉴스레터", "Plateer Labs 뉴스레터 새 호가 나왔습니다.");
  }
  // 구독자 명단 조회 — 앱(/api/content-notify)이 xgen 발송을 위해 명단만 가져간다. 발송은 앱이 함.
  // (발행 알림은 이제 앱이 xgen@plateer.com에서 보내므로 여기 contentNotify_는 호출되지 않는다 — 폴백용 보존)
  if (data.kind === "subscribers"){
    var subTk = PropertiesService.getScriptProperties().getProperty("BLOG_NOTIFY_TOKEN");
    if (!subTk || String(data.token||"") !== subTk) return jsonOut_({ ok:false, error:"unauthorized" });
    return jsonOut_({ ok:true, emails: subscribedEmails_(data.subKind === "newsletter" ? "newsletter" : "blog") });
  }

  // 모든 탭 공통 — 수신시각을 한국(서울) 시간으로 통일
  data.receivedAt = seoulTime(data.receivedAt);

  // 시트 쓰기는 스크립트 락으로 직렬화 — 동시 제출이 겹쳐 같은 행을 덮어쓰는 유실 방지.
  var lock = LockService.getScriptLock();
  try { lock.waitLock(15000); } catch (e) {}
  try {

  if (data.kind === "newsletter" || data.kind === "blog"){
    upsertSubscriber(data);                          // 구독 → subscribers 탭(메일 없음)

  } else if (!!data.asset || (data.source||"").indexOf("resources") >= 0){
    var t = brochureType(data);                      // 소개서 종류 구분(XGEN / AI Code Assistant …)
    data.brochureType = t.name;                      // 시트 '소개서' 열에 종류 표시명 기록
    prepend("brochure", BROCHURE_COLS, data);        // 소개서 → brochure 탭(기록만)
    // ⛔ 소개서 CTA 메일(요청자 다운로드 링크 + 내부 알림)은 앱이 xgen@plateer.com(O365 SMTP)에서
    //    발송한다. 중복 방지를 위해 여기선 메일을 보내지 않는다. (앱 실패 시 아래 2줄 주석 해제로 롤백)
    // brochureMailToUser(data, t);
    // sendMail_({ to: BROCHURE_TO, name: FROM_NAME, replyTo: FROM_ADDR,
    //   subject: "[소개서 신청/" + t.name + "] " + (data.name||"") + " (" + (data.company||"") + ")", body: body(BROCHURE_COLS, data) });

  } else {
    prepend("leads", CONTACT_COLS, data);            // 컨택 → leads 탭(기록만)
    // ⛔ 상담 CTA 메일(접수확인 + 내부 알림)도 앱이 xgen@plateer.com에서 발송 → 여기선 미발송(중복 방지).
    //    (앱 실패 시 아래 2줄 주석 해제로 롤백)
    // contactConfirmToUser_(data);
    // sendMail_({ to: CONTACT_TO, bcc: CONTACT_BCC, name: FROM_NAME, replyTo: FROM_ADDR,
    //   subject: "[상담 문의] " + (data.inquiryType||"") + " - " + (data.name||"") + " (" + (data.company||"") + ")",
    //   body: body(CONTACT_COLS, data) + "\n레퍼러 페이지: " + fmt(data.referrer) });
  }

  } finally { lock.releaseLock(); }
  return ContentService.createTextOutput(JSON.stringify({ ok:true }))
    .setMimeType(ContentService.MimeType.JSON);
}

/* ── 블로그 발행 알림 ─────────────────────────────────────────────────
 * 새 글이 올라오면(GitHub Action이 호출) 'blog' 구독중(Y) 구독자에게 요약 메일 발송.
 * 공개 /exec 남용 방지: 스크립트 속성 BLOG_NOTIFY_TOKEN 과 요청 token 이 일치해야 실행.
 *  설정: 좌측 ⚙️ 프로젝트 설정 > 스크립트 속성 > 속성 추가
 *        BLOG_NOTIFY_TOKEN = <임의의 긴 문자열>  (GitHub Actions 시크릿과 동일 값)
 * 요청 형식: { kind:"blog-notify", token:"...", posts:[{title, description, url}, ...] }
 */
// 콘텐츠(블로그/뉴스레터) 발행 알림 공용. kind=구독 종류, word=제목 접두어, heading=본문 머리말.
function contentNotify_(d, kind, word, heading){
  var token = PropertiesService.getScriptProperties().getProperty("BLOG_NOTIFY_TOKEN");
  if (!token || String(d.token || "") !== token){
    return jsonOut_({ ok:false, error:"unauthorized" });
  }
  var posts = (d.posts && d.posts.length) ? d.posts
            : (d.title ? [{ title:d.title, description:d.description, url:d.url }] : []);
  if (!posts.length) return jsonOut_({ ok:false, error:"no posts" });

  var subs = subscribedEmails_(kind);            // 해당 종류 구독중(Y) 이메일(취소 N 자동 제외)
  var subject = posts.length === 1
      ? "[Plateer Labs] " + word + ": " + posts[0].title
      : "[Plateer Labs] " + word + " " + posts.length + "건이 올라왔어요";
  var sent = 0;
  for (var i=0;i<subs.length;i++){
    // 수신자별 해지 링크(/unsubscribe?kind=…&email=…)
    var unsub = "https://labs.plateer.com/unsubscribe?kind=" + kind + "&email=" + encodeURIComponent(subs[i]);
    sendMail_({ to: subs[i], name: FROM_NAME, replyTo: FROM_ADDR, subject: subject,
      body: notifyText_(posts, unsub, heading), htmlBody: notifyHtml_(posts, unsub, heading) });
    sent++;
  }
  return jsonOut_({ ok:true, sent:sent, subscribers:subs.length });
}

/** subscribers 탭에서 특정 종류의 '구독중(Y)' 이메일 목록(중복 제거). */
function subscribedEmails_(kind){
  var sh = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("subscribers");
  var out = [];
  if (sh && sh.getLastRow() >= 2){
    var vals = sh.getRange(2, 1, sh.getLastRow() - 1, SUB_COLS.length).getValues();
    for (var i=0;i<vals.length;i++){       // SUB_COLS: 0 수신시각 · 1 구분 · 2 이메일 · 3 구독여부
      var k = vals[i][1], email = String(vals[i][2] || "").trim();
      var sub = String(vals[i][3] || "").toUpperCase();
      if (k === kind && sub === "Y" && email && out.indexOf(email) < 0) out.push(email);
    }
  }
  return out;
}

function notifyText_(posts, unsub, heading){
  var lines = [heading, ""];
  posts.forEach(function(p){
    lines.push("• " + (p.title || ""));
    if (p.description) lines.push("  " + p.description);
    if (p.url) lines.push("  " + p.url);
    lines.push("");
  });
  lines.push("— Plateer Labs");
  lines.push("수신 해지: " + (unsub || "https://labs.plateer.com/unsubscribe?kind=blog"));
  return lines.join("\n");
}

function notifyHtml_(posts, unsub, heading){
  var unsubUrl = unsub || "https://labs.plateer.com/unsubscribe";
  var items = posts.map(function(p){
    return '<div style="margin:0 0 20px">' +
      '<a href="' + (p.url || "#") + '" style="font-size:17px;font-weight:bold;color:#1a2233;text-decoration:none">' + escapeHtml_(p.title) + '</a>' +
      (p.description ? '<p style="margin:6px 0 8px;color:#5b6472;line-height:1.7">' + escapeHtml_(p.description) + '</p>' : '') +
      (p.url ? '<a href="' + p.url + '" style="display:inline-block;color:#2f7bff;font-weight:bold;text-decoration:none">글 보러가기 →</a>' : '') +
      '</div>';
  }).join('<hr style="border:none;border-top:1px solid #eceef2;margin:16px 0">');
  return '<div style="font-family:Apple SD Gothic Neo,Malgun Gothic,sans-serif;font-size:15px;line-height:1.7;color:#1a2233">' +
    '<p>' + escapeHtml_(heading) + '</p>' + items +
    '<p style="margin-top:24px;color:#8b93a4;font-size:12.5px">수신을 원치 않으시면 ' +
    '<a href="' + unsubUrl + '" style="color:#8b93a4">여기</a>에서 해지하실 수 있습니다.</p></div>';
}

function escapeHtml_(s){
  return String(s || "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function jsonOut_(o){
  return ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON);
}
