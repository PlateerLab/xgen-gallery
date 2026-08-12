#!/usr/bin/env node
/**
 * 데모 커버리지 점검 — 어떤 라이브러리가 아직 자동 폴백 데모로 나가고 있는지 알려준다.
 *
 * 주간 자동 점검이 TOOLS 에 새 라이브러리를 추가하면 데모 페이지와 카드의 데모 버튼은
 * 자동으로 생기지만(lib/demo-fallback.ts), 그 데모는 카테고리 표준 형태일 뿐 그 라이브러리의
 * 실제 쓰임새를 보여주지는 못한다. 사람이 소재를 골라 매니페스트를 쓰기 전까지의 상태다.
 *
 * 이 스크립트는 그 대기열을 드러내기 위한 것이다 — 실패로 막지 않는다(폴백도 정상 동작이다).
 * 종료 코드는 항상 0, `--strict` 를 주면 폴백이 하나라도 있을 때 1 을 돌려준다.
 *
 *   node scripts/demo-coverage.mjs
 *   node scripts/demo-coverage.mjs --strict
 */
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { demoRegistry } from "@plateerlab/xgen-gallery";

const here = dirname(fileURLToPath(import.meta.url));
const src = (p) => readFileSync(join(here, "..", "src", "lib", p), "utf8");

/** tools.ts 의 항목을 name/repo 쌍으로 읽는다(정규식 — 항목 형식이 단순해 파서를 두지 않는다). */
function readTools() {
    const text = src("tools.ts");
    const body = text.slice(text.indexOf("export const TOOLS"));
    const out = [];
    const re = /repo:\s*"([^"]+)"[\s\S]{0,160}?name:\s*"([^"]+)"/g;
    let m;
    while ((m = re.exec(body))) out.push({ repo: m[1], name: m[2] });
    return out;
}

/** demo-manifests.ts 의 LOCAL_DEMO_MANIFESTS 키(= 저장소 이름) 목록. */
function readLocalKeys() {
    const text = src("demo-manifests.ts");
    const start = text.indexOf("export const LOCAL_DEMO_MANIFESTS");
    const block = text.slice(start, text.indexOf("};", start));
    return [...block.matchAll(/"([^"]+)":/g)].map((m) => m[1]);
}

const tools = readTools();
const local = new Set(readLocalKeys());
const packaged = new Set(Object.keys(demoRegistry ?? {}));

const fallback = tools.filter((t) => !local.has(t.repo) && !packaged.has(t.repo));
const curated = tools.length - fallback.length;

console.log(`데모 커버리지: 큐레이션 ${curated} / 전체 ${tools.length}`);

if (fallback.length === 0) {
    console.log("자동 폴백으로 나가는 라이브러리 없음 — 전부 전용 데모입니다.");
    process.exit(0);
}

console.log("\n아직 자동 폴백 데모인 라이브러리:");
for (const t of fallback) {
    console.log(`  - ${t.name}  (repo: ${t.repo})`);
}
console.log(
    "\n전용 데모로 올리려면 src/lib/demo-manifests.ts 에 매니페스트를 추가하고" +
        "\nLOCAL_DEMO_MANIFESTS 에 저장소 이름 그대로 등록하세요." +
        "\n한국어 문구를 쓰면 src/lib/demo-i18n.ts 의 DICT 에 영문도 함께 넣어야 합니다.",
);

process.exit(process.argv.includes("--strict") ? 1 : 0);
