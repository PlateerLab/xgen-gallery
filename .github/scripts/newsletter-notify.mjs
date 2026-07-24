// 새로 추가된 뉴스레터 이슈를 감지해 앱 발행알림 라우트(/api/content-notify)로 전달한다.
// 앱이 구독자에게 xgen@plateer.com(O365 SMTP)에서 요약 메일을 발송한다.
// 뉴스레터는 frontend/src/lib/newsletter.ts 의 ISSUES 배열에 하드코딩된다.
//   env: NOTIFY_URL(기본 https://labs.plateer.com/api/content-notify) · TOKEN(=BLOG_NOTIFY_TOKEN) · BEFORE · AFTER
// 이번 푸시에서 "추가된" slug(vol-N)를 찾아 그 이슈의 title·summary·url을 보낸다.
import { execSync } from "node:child_process";
import { readFileSync } from "node:fs";

const SITE = "https://labs.plateer.com";
const NOTIFY_URL = process.env.NOTIFY_URL || `${SITE}/api/content-notify`;
const TOKEN = process.env.TOKEN;
const BEFORE = process.env.BEFORE || "";
const AFTER = process.env.AFTER || "HEAD";
const FILE = "frontend/src/lib/newsletter.ts";

if (!TOKEN) {
    console.log("BLOG_NOTIFY_TOKEN 시크릿 미설정 — 알림 생략");
    process.exit(0);
}

const range =
    BEFORE && !/^0+$/.test(BEFORE) ? `${BEFORE} ${AFTER}` : `${AFTER}~1 ${AFTER}`;
let diff = "";
try {
    diff = execSync(`git diff ${range} -- ${FILE}`, { encoding: "utf8" });
} catch (e) {
    console.log("git diff 실패 — 알림 생략:", e.message);
    process.exit(0);
}

// 추가(+)된 slug 중 삭제(-)되지 않은 것 = 새 이슈
const added = new Set(
    [...diff.matchAll(/^\+\s*slug:\s*["'](vol-\d+)["']/gm)].map((m) => m[1]),
);
const removed = new Set(
    [...diff.matchAll(/^-\s*slug:\s*["'](vol-\d+)["']/gm)].map((m) => m[1]),
);
const newSlugs = [...added].filter((s) => !removed.has(s));

if (!newSlugs.length) {
    console.log("새 뉴스레터 이슈 없음 — 알림 생략");
    process.exit(0);
}

const src = readFileSync(FILE, "utf8");
const unescape = (s) => s.replace(/\\"/g, '"').replace(/\\\\/g, "\\");
function issueMeta(slug) {
    const idx = src.indexOf(`slug: "${slug}"`);
    if (idx < 0) return null;
    const win = src.slice(idx, idx + 1500); // 이슈 상단(slug 뒤 title·summary 포함)
    const title = (win.match(/title:\s*"((?:[^"\\]|\\.)*)"/) || [])[1] || slug;
    const summary =
        (win.match(/summary:\s*(?:\r?\n\s*)?"((?:[^"\\]|\\.)*)"/) || [])[1] || "";
    return {
        title: unescape(title),
        description: unescape(summary),
        url: `${SITE}/newsletter/${slug}`,
    };
}

const posts = newSlugs.map(issueMeta).filter(Boolean);
if (!posts.length) {
    console.log("이슈 메타 추출 실패 — 알림 생략");
    process.exit(0);
}

const res = await fetch(NOTIFY_URL, {
    method: "POST",
    headers: { "content-type": "application/json; charset=utf-8" },
    body: JSON.stringify({ kind: "newsletter", token: TOKEN, posts }),
});
console.log(
    `뉴스레터 알림 전송: ${posts.map((p) => p.title).join(" / ")} → HTTP ${res.status} ${await res.text()}`,
);
