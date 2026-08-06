import { SecurityPageContent } from "@/components/pages/security-page";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
    title: "Security & Governance",
    description:
        "Guardrails in XGEN — external guard models, PII masking, blocklist filters, a unified audit log, and AI risk grading keep enterprise AI in control.",
    path: "/security-and-governance",
    locale: "en",
});

export default function SecurityPageEn() {
    return <SecurityPageContent locale="en" />;
}
