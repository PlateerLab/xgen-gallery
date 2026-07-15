import { NextResponse } from "next/server";
import fs from "node:fs";
import path from "node:path";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * 블로그 조회수 카운터 — DB 없이 디스크 JSON 파일에 저장한다.
 *  - GET  /api/views/{slug} : 현재 조회수 반환(증가 없음)
 *  - POST /api/views/{slug} : 조회수 +1 후 반환
 * 동일 출처(Next 앱)라 CORS가 없다. ViewCount가 세션당 1회만 POST해 중복을 막는다.
 *
 * 저장 위치는 VIEWS_DATA_DIR(기본 <cwd>/.data). 재배포 간 유지하려면 이 경로를
 * 볼륨으로 마운트한다. (미마운트 시 배포마다 리셋 — 기능 자체는 정상 동작)
 */
const DATA_DIR = process.env.VIEWS_DATA_DIR || path.join(process.cwd(), ".data");
const FILE = path.join(DATA_DIR, "views.json");
const SLUG_RE = /^[a-z0-9][a-z0-9-]{0,120}$/i;

let cache: Record<string, number> | null = null;
let writeChain: Promise<void> = Promise.resolve();

function load(): Record<string, number> {
    if (cache) return cache;
    try {
        cache = JSON.parse(fs.readFileSync(FILE, "utf8")) as Record<
            string,
            number
        >;
    } catch {
        cache = {};
    }
    return cache;
}

/** 인스턴스 내 쓰기를 직렬화해 파일 경쟁을 막는다. */
function persist(data: Record<string, number>) {
    writeChain = writeChain.then(async () => {
        try {
            await fs.promises.mkdir(DATA_DIR, { recursive: true });
            await fs.promises.writeFile(FILE, JSON.stringify(data), "utf8");
        } catch (e) {
            console.error("[views] persist failed:", e);
        }
    });
    return writeChain;
}

export async function GET(
    _req: Request,
    { params }: { params: Promise<{ slug: string }> },
) {
    const { slug } = await params;
    if (!SLUG_RE.test(slug)) {
        return NextResponse.json({ error: "invalid slug" }, { status: 400 });
    }
    const data = load();
    return NextResponse.json({ slug, count: data[slug] ?? 0 });
}

export async function POST(
    _req: Request,
    { params }: { params: Promise<{ slug: string }> },
) {
    const { slug } = await params;
    if (!SLUG_RE.test(slug)) {
        return NextResponse.json({ error: "invalid slug" }, { status: 400 });
    }
    const data = load();
    data[slug] = (data[slug] ?? 0) + 1;
    void persist(data);
    return NextResponse.json({ slug, count: data[slug] });
}
