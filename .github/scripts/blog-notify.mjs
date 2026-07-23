// 새로 발행된 블로그 글을 감지해 구독자 알림 웹훅(Apps Script)으로 전달한다.
// GitHub Action(.github/workflows/blog-notify.yml)에서 실행.
//   env: WEBHOOK(=DEMO_WEBHOOK_URL) · TOKEN(=BLOG_NOTIFY_TOKEN) · BEFORE · AFTER
// 이번 푸시에서 "추가된(A)" frontend/content/blog/*.md 중 draft가 아닌 글만 대상.
import { execSync } from "node:child_process";
import { readFileSync } from "node:fs";
import path from "node:path";

const WEBHOOK = process.env.WEBHOOK;
const TOKEN = process.env.TOKEN;
const BEFORE = process.env.BEFORE || "";
const AFTER = process.env.AFTER || "HEAD";
const SITE = "https://labs.plateer.com";
const BLOG_DIR = "frontend/content/blog";

if (!WEBHOOK || !TOKEN) {
    console.log("WEBHOOK/BLOG_NOTIFY_TOKEN 시크릿 미설정 — 알림 생략");
    process.exit(0);
}

// 이번 푸시 범위. 최초 푸시(before=0000…)면 마지막 커밋만.
const range = BEFORE && !/^0+$/.test(BEFORE) ? `${BEFORE} ${AFTER}` : `${AFTER}~1 ${AFTER}`;
let diff = "";
try {
    diff = execSync(`git diff --name-status ${range} -- ${BLOG_DIR}`, {
        encoding: "utf8",
    });
} catch (e) {
    console.log("git diff 실패 — 알림 생략:", e.message);
    process.exit(0);
}

const added = diff
    .split("\n")
    .filter((l) => /^A\t/.test(l))
    .map((l) => l.split("\t")[1])
    .filter((f) => f && f.endsWith(".md"));

if (!added.length) {
    console.log("새로 추가된 블로그 글 없음 — 알림 생략");
    process.exit(0);
}

function frontmatter(md) {
    const m = md.match(/^---\r?\n([\s\S]*?)\r?\n---/);
    if (!m) return {};
    const fm = {};
    for (const line of m[1].split(/\r?\n/)) {
        const mm = line.match(/^([A-Za-z_]+):\s*(.*)$/);
        if (!mm) continue;
        fm[mm[1]] = mm[2].trim().replace(/^["']|["']$/g, "");
    }
    return fm;
}

const posts = [];
for (const f of added) {
    let md;
    try {
        md = readFileSync(f, "utf8");
    } catch {
        continue;
    }
    const fm = frontmatter(md);
    if (String(fm.draft) === "true") {
        console.log("초안 건너뜀:", f);
        continue;
    }
    const slug = path.basename(f, ".md");
    posts.push({
        title: fm.title || slug,
        description: fm.description || "",
        url: `${SITE}/blog/${slug}`,
    });
}

if (!posts.length) {
    console.log("발행 대상 글 없음(초안만) — 알림 생략");
    process.exit(0);
}

const res = await fetch(WEBHOOK, {
    method: "POST",
    headers: { "content-type": "application/json; charset=utf-8" },
    body: JSON.stringify({ kind: "blog-notify", token: TOKEN, posts }),
});
console.log(
    `알림 전송: ${posts.map((p) => p.title).join(" / ")} → HTTP ${res.status}`,
);
