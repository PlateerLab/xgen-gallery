import type { Metadata } from "next";
import "../globals.css";
import "./training.css";

export const metadata: Metadata = { title: "AI 거버넌스 교육 · Plateer AI Labs", robots: { index: false, follow: false }, referrer: "no-referrer" };
export default function TrainingLayout({ children }: { children: React.ReactNode }) {
    return <html lang="ko"><body>{children}</body></html>;
}
