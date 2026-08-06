import { PolarPageContent } from "@/components/pages/polar-page";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
    title: "Polar — a private sLLM built for commerce",
    description:
        "Polar is an e-commerce-specialized private sLLM developed by Plateer. Keep enterprise data protected on-premise while building and running commerce AI applications on a domain-optimized model, RAG, and fine-tuning.",
    path: "/polar",
    locale: "en",
});

export default function PolarPageEn() {
    return <PolarPageContent locale="en" />;
}
