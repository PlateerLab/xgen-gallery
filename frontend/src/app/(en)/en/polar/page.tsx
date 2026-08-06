import { PolarPageContent } from "@/components/pages/polar-page";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
    title: "Polar — a private sLLM built for commerce",
    description:
        "Polar is Plateer's commerce-specialized private sLLM — build and run commerce AI on a domain-tuned model, RAG, and fine-tuning, on-premise.",
    path: "/polar",
    locale: "en",
});

export default function PolarPageEn() {
    return <PolarPageContent locale="en" />;
}
