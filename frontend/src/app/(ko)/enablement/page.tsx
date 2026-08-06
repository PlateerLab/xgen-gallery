import { EnablementPageContent } from "@/components/pages/enablement-page";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
    title: "Enablement — 활용 지원·교육",
    description:
        "솔루션 납품 후 고객사를 직접 방문해 관리자·실무자·운영자가 XGEN 기반 AI를 스스로 운영·확장하도록 교육하고 내재화하는 Enterprise AI Enablement 서비스 — 온사이트 교육, 핸즈온 실습, 운영 인수인계까지.",
    path: "/enablement",
});

export default function EnablementPage() {
    return <EnablementPageContent locale="ko" />;
}
