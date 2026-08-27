import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { MemberDetailView } from "@/components/member-detail";
import { JsonLd } from "@/components/json-ld";
import { getMemberDetail } from "@/lib/members/cache";
import { getAllPosts } from "@/lib/blog";
import { personLd, breadcrumbLd } from "@/lib/structured-data";

// Render at request time — see /members/page.tsx for rationale.
export const dynamic = "force-dynamic";
export const revalidate = 0;

const LOGIN_RE = /^[a-zA-Z0-9-]{1,39}$/;

export async function generateMetadata({
    params,
}: {
    params: Promise<{ login: string }>;
}): Promise<Metadata> {
    const { login } = await params;
    if (!LOGIN_RE.test(login)) return { title: "Member" };
    return pageMetadata({
        title: `@${login} — Member`,
        description: `GitHub profile, repositories, and stats for @${login} at Plateer AI Labs.`,
        path: `/members/${login}`,
        image: `https://github.com/${login}.png`,
        imageDims: { width: 460, height: 460 },
        /*
          개인 GitHub 계정·저장소·활동 이력이 실명과 묶여 나오는 화면이라
          검색 결과에서 뺀다. 목록(/members)과 같은 이유다.
        */
        robots: { index: false, follow: false },
    });
}

export default async function MemberPage({
    params,
}: {
    params: Promise<{ login: string }>;
}) {
    const { login } = await params;
    if (!LOGIN_RE.test(login)) notFound();

    let detail;
    try {
        detail = await getMemberDetail(login);
    } catch (e) {
        console.error(`[/members/${login}] failed:`, e);
        notFound();
    }

    // 이 멤버가 작성한 블로그 글 — 프론트매터 authorGithub로 매칭(대소문자 무시).
    const authored = getAllPosts().filter(
        (p) => p.authorGithub?.toLowerCase() === detail.login.toLowerCase(),
    );

    return (
        <>
            <JsonLd
                data={[
                    personLd(detail),
                    breadcrumbLd([
                        { name: "Home", path: "/" },
                        { name: "Members", path: "/members" },
                        {
                            name: detail.name || detail.login,
                            path: `/members/${detail.login}`,
                        },
                    ]),
                ]}
            />
            <SiteNav />
            <main className="mx-auto max-w-5xl px-6 pb-24 pt-14 md:pt-20">
                <MemberDetailView member={detail} posts={authored} />
            </main>
            <SiteFooter />
        </>
    );
}
