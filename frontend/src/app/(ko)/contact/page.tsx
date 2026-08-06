import { ContactPageContent } from "@/components/pages/contact-page";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
    title: "데모 · 체험 · 기술 상담",
    description:
        "XGEN 제품 데모 요청, 15일 무료 체험 신청, PoC·기술 상담을 한 곳에서 접수합니다. 문의 유형을 선택해 남겨주시면 담당자가 영업일 기준 1–2일 내에 연락드립니다.",
    path: "/contact",
});

export default function ContactPage() {
    return <ContactPageContent locale="ko" />;
}
