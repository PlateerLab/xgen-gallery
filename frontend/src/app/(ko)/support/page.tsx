import { SupportPageContent } from "@/components/pages/support-page";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
    title: "운영·기술지원",
    description:
        "구축을 넘어 운영까지 — XGEN 온프레미스 환경의 유지보수, 장애 대응, 모니터링, 운영지원(상주·원격)을 제공합니다.",
    path: "/support",
});

export default function SupportPage() {
    return <SupportPageContent locale="ko" />;
}
