import type { Metadata } from "next";
import NewsletterAdmin from "./view";

export const metadata: Metadata = { title: "뉴스레터 관리 · Plateer AI Labs" };

const NEWSLETTERS = [
  {
    id: "internal",
    label: "사내용",
    title: "XGEN 뉴스레터 Vol.5 사내용",
    url: "/admin/XGEN_Newsletter_2026-09_Vol5.html",
  },
  {
    id: "delivery",
    label: "발송용",
    title: "XGEN 뉴스레터 Vol.5 발송용",
    url: "/admin/XGEN_Newsletter_2026-10_Vol5_2.html",
  },
] as const;

export default function Page() {
  return <NewsletterAdmin files={NEWSLETTERS} />;
}
