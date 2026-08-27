import { LabMembersPageContent } from "@/components/pages/lab-members-page";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
    title: "AI Lab Members",
    description:
        "Plateer AI Labs를 만드는 사람들과 이들이 남긴 기술 노트·현장 리포트를 소개합니다.",
    path: "/members",
    /*
      구성원 실명·직함·사진이 한자리에 모인 화면이라 검색 결과로 노출하지 않는다.
      robots.txt 로 크롤을 막지는 않는다 — 크롤러가 페이지를 못 읽으면 이
      noindex 도 못 읽고, 외부 링크만으로 URL 이 결과에 남을 수 있다.
    */
    robots: { index: false, follow: false },
});

export default function MembersPage() {
    return <LabMembersPageContent locale="ko" />;
}
