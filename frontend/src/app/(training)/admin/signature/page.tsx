import type { Metadata } from "next";
import AdminNav from "@/components/admin-nav";

export const metadata: Metadata = { title: "이메일 서명 · Plateer AI Labs" };

const SIGNATURE_URL = "/admin/signature.html";

export default function Page() {
  return (
    <div className="gov">
      <AdminNav current="signature" />
      <main className="workspace">
        <header className="page-head">
          <div>
            <h1>이메일 서명</h1>
            <p className="muted">메일 서명을 만들고 복사합니다.</p>
          </div>
          <div className="actions">
            <a className="button primary" href={SIGNATURE_URL} target="_blank" rel="noreferrer">
              새 창에서 열기
            </a>
          </div>
        </header>
        <section className="newsletter-frame-wrap admin-guide-frame" aria-label="이메일 서명">
          <iframe src={SIGNATURE_URL} title="이메일 서명" allow="clipboard-write" />
        </section>
      </main>
    </div>
  );
}
