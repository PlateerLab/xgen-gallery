import { LabMembersPageContent } from "@/components/pages/lab-members-page";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
    title: "AI Lab Members",
    description:
        "The researchers and engineers behind Plateer AI Labs, and the tech notes and field reports they publish.",
    // 언어 중립 경로를 넘기면 헬퍼가 canonical(/en/members)과 hreflang을 함께 만든다.
    path: "/members",
    locale: "en",
    // 국문과 같은 이유로 색인 제외 — (ko)/members/page.tsx 참고.
    robots: { index: false, follow: false },
});

export default function MembersPageEn() {
    return <LabMembersPageContent locale="en" />;
}
