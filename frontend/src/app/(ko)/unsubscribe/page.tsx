import type { Metadata } from "next";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { UnsubscribeForm } from "@/components/unsubscribe-form";

export const metadata: Metadata = {
    title: "구독 해지 — Plateer Labs",
    description: "뉴스레터·블로그 수신을 해지합니다.",
    robots: { index: false, follow: false },
};

/**
 * 구독 해지 페이지 — 메일의 '수신 해지' 링크 대상.
 *   /unsubscribe?kind=blog&email=...  (블로그 새 글 알림 해지)
 *   /unsubscribe?kind=newsletter&email=...
 */
export default async function UnsubscribePage({
    searchParams,
}: {
    searchParams: Promise<{ email?: string; kind?: string }>;
}) {
    const sp = await searchParams;
    const kind = sp.kind === "blog" ? "blog" : "newsletter";
    return (
        <>
            <SiteNav />
            <main className="mx-auto flex min-h-[72vh] max-w-xl flex-col justify-center px-6 py-28">
                <UnsubscribeForm email={sp.email ?? ""} kind={kind} />
            </main>
            <SiteFooter />
        </>
    );
}
