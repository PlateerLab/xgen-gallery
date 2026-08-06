import { SecurityPageContent } from "@/components/pages/security-page";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
    title: "Security & Governance",
    description:
        "Guardrails and control policy in the XGEN Agentic AI Platform — external guard models, PII masking, blocklist filters, a unified audit log, and AI risk grading keep enterprise AI under control.",
    path: "/security-and-governance",
    locale: "en",
});

export default function SecurityPageEn() {
    return <SecurityPageContent locale="en" />;
}
