"use client";

import { useState } from "react";
import { DEMOS, YouTubeFacade } from "@/components/poc-demos";
import type { Locale } from "@/lib/i18n";

const VIBE_DEMO = DEMOS.find((demo) => demo.id === "0ql6M_P9qRw")!;

export function VibeCodingVideo({ locale }: { locale: Locale }) {
    const [loaded, setLoaded] = useState(false);
    return (
        <div className="overflow-hidden border border-[var(--color-line)] bg-white">
            <YouTubeFacade
                demo={VIBE_DEMO}
                loaded={loaded}
                start={0}
                onPlay={() => setLoaded(true)}
                locale={locale}
            />
        </div>
    );
}
