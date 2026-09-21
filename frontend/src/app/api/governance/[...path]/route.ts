import { NextRequest } from "next/server";
import { appOrigin, SESSION_COOKIE } from "@/lib/governance/auth";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";
async function proxy(req: NextRequest, context: { params: Promise<{ path: string[] }> }) {
    const { path } = await context.params;
    const route = path.join("/");
    const allowed = /^(admin\/(report|assign|content\/(questions|video|slides)|assignments\/[A-Za-z0-9_-]+(\/(link|revoke))?)|quiz(\/(start|answers|submit|materials\/(video|slides)))?)$/;
    const responseHeaders = { "Content-Type": "application/json", "Cache-Control": "no-store", "Referrer-Policy": "no-referrer" };
    const error = (detail: string, status: number) => Response.json({ detail }, { status, headers: responseHeaders });
    if (!allowed.test(route)) return error("페이지를 찾을 수 없습니다.", 404);
    const isAdmin = route.startsWith("admin/");
    if (req.method !== "GET" && req.headers.get("origin") !== appOrigin(req)) return error("요청 출처를 확인할 수 없습니다.", 403);
    const auth = isAdmin ? `Bearer ${req.cookies.get(SESSION_COOKIE)?.value || ""}` : req.headers.get("authorization");
    if (!auth || auth === "Bearer ") return error("관리자 로그인이 필요합니다.", 401);
    const materialUpload = /^admin\/content\/(video|slides)$/.test(route);
    const maxSize = materialUpload ? 12 * 1024 * 1024 : 65536;
    if (Number(req.headers.get("content-length")) > maxSize) return error("요청이 너무 큽니다.", 413);
    let body: Uint8Array | undefined;
    if (req.method !== "GET" && req.body) {
        const reader = req.body.getReader();
        const chunks: Uint8Array[] = []; let size = 0;
        while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            size += value.byteLength;
            if (size > maxSize) { await reader.cancel(); return error("요청이 너무 큽니다.", 413); }
            chunks.push(value);
        }
        body = Buffer.concat(chunks);
    }
    try {
        const origin = process.env.GALLERY_API_ORIGIN || "http://localhost:8800";
        const upstream = await fetch(`${origin}/api/governance/${route}`, {
            method: req.method, headers: { Authorization: auth, "Content-Type": materialUpload ? "application/octet-stream" : "application/json" },
            body: body as BodyInit, cache: "no-store", signal: AbortSignal.timeout(30000), redirect: "error",
        });
        if (upstream.status >= 500) return error("교육 서버 응답을 확인하지 못했습니다. 잠시 후 다시 시도해 주세요.", 503);
        if (route.startsWith("quiz/materials/") && upstream.ok) {
            return new Response(upstream.body, { headers: { ...responseHeaders,
                "Content-Type": upstream.headers.get("content-type") || "application/octet-stream",
                "Content-Disposition": upstream.headers.get("content-disposition") || "attachment",
            } });
        }
        return new Response(await upstream.text(), { status: upstream.status, headers: responseHeaders });
    } catch { return error("교육 서버에 연결할 수 없습니다. 잠시 후 다시 시도해 주세요.", 503); }
}
export { proxy as GET, proxy as POST, proxy as PUT };
