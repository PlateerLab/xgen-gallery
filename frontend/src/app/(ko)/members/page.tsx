import { LabMembersPageContent } from "@/components/pages/lab-members-page";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
    title: "AI Lab Members",
    description:
        "Plateer AI Labs를 만드는 사람들과 이들이 남긴 기술 노트·현장 리포트를 소개합니다.",
    path: "/members",
});

export default function MembersPage() {
    return <LabMembersPageContent locale="ko" />;
}
