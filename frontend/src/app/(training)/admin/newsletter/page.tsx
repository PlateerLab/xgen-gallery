import type { Metadata } from "next";
import NewsletterAdmin from "./view";

export const metadata: Metadata = { title: "뉴스레터 관리 · Plateer AI Labs" };

const NEWSLETTERS = [
  { id: "internal-vol5", type: "internal", typeLabel: "사내용", issue: "Vol.5", date: "2026.10.02", title: "XGEN 뉴스레터 Vol.5 사내용", url: "/admin/XGEN_Newsletter_2026-09_Vol5.html" },
  { id: "internal-vol4", type: "internal", typeLabel: "사내용", issue: "Vol.4", date: "2026.09.08", title: "XGEN 뉴스레터 Vol.4 사내용", url: "/admin/XGEN_Newsletter_2026-09_Vol4.html" },
  { id: "delivery-vol5", type: "delivery", typeLabel: "발송용", issue: "Vol.5", date: "2026.10.07", title: "XGEN 뉴스레터 Vol.5 발송용", url: "/admin/XGEN_Newsletter_2026-10_Vol5_2.html" },
  { id: "delivery-vol4", type: "delivery", typeLabel: "발송용", issue: "Vol.4", date: "2026.09.08", title: "XGEN 뉴스레터 Vol.4 발송용", url: "/admin/XGEN_Newsletter_2026-09_Vol4_2.html" },
] as const;

export default function Page() {
  return <NewsletterAdmin files={NEWSLETTERS} />;
}
