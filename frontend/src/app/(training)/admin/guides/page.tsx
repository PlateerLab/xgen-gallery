import type { Metadata } from "next";
import AdminNav from "@/components/admin-nav";

export const metadata: Metadata = { title: "운영 가이드 · Plateer AI Labs" };

const CTA_GUIDE_URL = "/guides/cta-operations.html";

export default function Page() {
  return (
    <div className="gov">
      <AdminNav current="guides" />
      <main className="workspace">
        <header className="page-head">
          <div>
            <h1>운영 가이드</h1>
            <p className="muted">콘텐츠 운영에 필요한 기준과 점검 절차를 확인합니다.</p>
          </div>
          <div className="actions">
            <a className="button primary" href={CTA_GUIDE_URL} target="_blank" rel="noreferrer">
              새 창에서 열기
            </a>
          </div>
        </header>
        <nav className="tabs" aria-label="운영 가이드 메뉴">
          <a href="#guide-preview" aria-current="page">CTA 운영 가이드</a>
        </nav>
        <p className="muted">CTA의 목적·문구·연결 경로와 운영 점검 기준을 확인합니다.</p>
        <section id="guide-preview" className="newsletter-frame-wrap admin-guide-frame" aria-label="CTA 운영 가이드 미리보기">
          <iframe src={CTA_GUIDE_URL} title="CTA 운영 가이드 미리보기" />
        </section>
      </main>
    </div>
  );
}
