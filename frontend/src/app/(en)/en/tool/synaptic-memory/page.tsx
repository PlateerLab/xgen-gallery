import type { Metadata } from "next";
import {
    SynapticMemoryPageContent,
    SYNAPTIC_TOOL,
} from "@/components/pages/synaptic-memory-page";
import { toolMetadata } from "@/lib/tool-meta";

export const metadata: Metadata = toolMetadata(SYNAPTIC_TOOL, "en");

export default function SynapticMemoryPageEn() {
    return <SynapticMemoryPageContent locale="en" />;
}
