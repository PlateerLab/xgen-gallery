import type { Metadata } from "next";
import { ToolPageContent } from "@/components/pages/tool-page";
import { TOOLS } from "@/lib/tools";
import { toolMetadata } from "@/lib/tool-meta";

export function generateStaticParams() {
    return TOOLS.filter((t) => t.id !== "synaptic-memory").map((t) => ({ id: t.id }));
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ id: string }>;
}): Promise<Metadata> {
    const { id } = await params;
    const tool = TOOLS.find((t) => t.id === id);
    if (!tool) return { title: "Tool not found" };
    return toolMetadata(tool, "en");
}

export default async function ToolDemoPageEn({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    return <ToolPageContent params={params} locale="en" />;
}
