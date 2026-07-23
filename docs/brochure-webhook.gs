/**
 * Plateer AI Labs — XGEN 소개서(브로슈어) 첨부 발송 애드온 (Google Apps Script)
 *
 * ── 문제 ────────────────────────────────────────────────────────────
 * /resources 소개서 폼 → /api/brochure-request → 웹훅(DEMO_WEBHOOK_URL)으로
 * 리드가 전달되지만, 기존 웹훅은 "내부 알림 + 시트 저장"만 한다.
 * 요청자(고객)에게 소개서 PDF를 첨부해 보내는 로직이 없어서 메일이 오지 않았다.
 *
 * ── 이 파일의 역할 ──────────────────────────────────────────────────
 * 기존 doPost 를 통째로 바꾸지 않고, 아래 두 함수를 스크립트에 "추가"하고
 * doPost 안에서 한 줄만 호출하면 소개서 첨부 메일이 발송된다.
 *
 * ── 적용 방법 (기존 리드 웹훅 스크립트에 그대로 붙이기) ───────────────
 * 1) DEMO_WEBHOOK_URL 로 배포돼 있는 Apps Script 프로젝트를 연다.
 *    (스프레드시트 > 확장 프로그램 > Apps Script)
 * 2) 이 파일의 sendBrochureEmail_ / isBrochureRequest_ 함수를 붙여넣는다.
 * 3) 기존 doPost 안, 리드 저장·알림 처리 뒤에 아래 한 줄을 추가한다:
 *
 *        // 소개서 요청이면 요청자에게 PDF 첨부 메일 발송
 *        if (isBrochureRequest_(data)) sendBrochureEmail_(data);
 *
 *    ※ data 는 JSON.parse(e.postData.contents) 결과 변수명에 맞춘다.
 * 4) [배포] > [배포 관리] > 기존 배포 [편집] > 버전 "새 버전" 선택 후 배포.
 *    (URL 이 그대로 유지되므로 .env 재설정·재빌드 불필요)
 * 5) 최초 1회 UrlFetchApp(외부 요청)·MailApp 권한 승인이 필요하다.
 *
 * ※ 보낸사람 주소는 "스크립트 소유 계정"이 된다(현재 chat2plex@gmail.com).
 *   name 은 표시 이름만 바꾼다. 다른 주소로 보내려면 그 계정으로 스크립트를 소유.
 * ※ PDF(약 14MB) < 메일 첨부 한도(25MB)라 첨부 발송에 문제 없다.
 */

// 운영(labs.plateer.com)에 배포된 소개서 PDF(공개 정적 파일) — Apps Script가 가져와 첨부한다.
const BROCHURE_PDF_URL =
  "https://labs.plateer.com/downloads/xgen-brochure.pdf";
const BROCHURE_FILENAME = "XGEN_소개서.pdf";
const BROCHURE_FROM_NAME = "Plateer Labs";
// 내부 접수 알림 수신자(첨부 없음). 필요에 맞게 조정.
// (테스트 단계 — 우선 swan@plateer.com. 운영 전환 시 xgen@plateer.com 등으로 변경)
const BROCHURE_INTERNAL_TO = "swan@plateer.com";

/** UTC ISO(receivedAt)를 한국(서울) 시간 문자열로 변환. 없으면 현재 시각. */
function seoulTime_(iso) {
  return Utilities.formatDate(
    iso ? new Date(iso) : new Date(),
    "Asia/Seoul",
    "yyyy-MM-dd HH:mm:ss",
  );
}

/** 소개서 다운로드 요청인지 판별 (asset 우선, 없으면 레퍼러 경로로 판단). */
function isBrochureRequest_(d) {
  if (!d) return false;
  if (d.asset === "xgen-brochure") return true;
  return String(d.source || "").indexOf("resources") >= 0;
}

/** 요청자에게 소개서 PDF를 첨부해 발송 + 내부에 접수 알림. */
function sendBrochureEmail_(d) {
  const to = String(d.email || "").trim();
  if (!to) return;

  // 운영에 게시된 소개서 PDF를 가져와 첨부 blob 으로 준비
  const res = UrlFetchApp.fetch(BROCHURE_PDF_URL, { muteHttpExceptions: true });
  if (res.getResponseCode() !== 200) {
    throw new Error("brochure fetch failed: " + res.getResponseCode());
  }
  const pdf = res.getBlob().setName(BROCHURE_FILENAME);

  const name = d.name || "고객";
  const body = [
    name + "님, 안녕하세요.",
    "",
    "Plateer Labs XGEN에 관심 가져 주셔서 감사합니다.",
    "요청하신 XGEN 소개서를 첨부해 드립니다.",
    "",
    "도입 검토·PoC·보안 요건 상담이 필요하시면 본 메일에 회신하시거나",
    "아래 문의 페이지를 이용해 주세요.",
    "https://labs.plateer.com/contact",
    "",
    "감사합니다.",
    "Plateer Labs 드림",
  ].join("\n");

  // ① 요청자에게 소개서 첨부 발송
  MailApp.sendEmail({
    to: to,
    name: BROCHURE_FROM_NAME,
    replyTo: BROCHURE_INTERNAL_TO,
    subject: "[Plateer Labs] 요청하신 XGEN 소개서를 보내드립니다",
    body: body,
    attachments: [pdf],
  });

  // ② 내부 접수 알림(첨부 없음)
  const notice = [
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
    "• 자산: " + (d.asset || "xgen-brochure"),
    "• 레퍼러: " + (d.source || ""),
    "• 접수 시각(KST): " + seoulTime_(d.receivedAt),
  ].join("\n");
  MailApp.sendEmail({
    to: BROCHURE_INTERNAL_TO,
    name: BROCHURE_FROM_NAME,
    replyTo: to,
    subject: "[소개서 다운로드] " + (d.company || "") + " " + (d.name || ""),
    body: notice,
  });
}
