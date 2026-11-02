"use client";

import { useState } from "react";
import AdminNav from "@/components/admin-nav";

type NewsletterFile = {
  id: string;
  label: string;
  title: string;
  url: string;
};

export default function NewsletterAdmin({
  files,
}: {
  files: readonly NewsletterFile[];
}) {
  const [selected, setSelected] = useState(files[0]?.id || "");
  const current = files.find((file) => file.id === selected);

  return (
    <div className="gov">
      <AdminNav current="newsletter" />
      <main className="workspace">
        <header className="page-head">
          <div>
            <h1>뉴스레터</h1>
            <p className="muted">
              사내용과 발송용 뉴스레터를 구분해 미리보기에서 확인합니다.
            </p>
          </div>
          {current && (
            <div className="actions">
              <a
                className="button primary"
                href={current.url}
                target="_blank"
                rel="noreferrer"
              >
                새 창에서 열기
              </a>
            </div>
          )}
        </header>
        <nav className="tabs" aria-label="뉴스레터 관리 메뉴">
          {files.map((file) => (
            <button
              key={file.id}
              type="button"
              aria-current={selected === file.id ? "page" : undefined}
              onClick={() => setSelected(file.id)}
            >
              {file.label}
            </button>
          ))}
        </nav>
        <p className="muted">
          상단 메뉴에서 용도를 선택하세요. 원본 HTML의 복사·가이드 기능은
          미리보기 안에서 그대로 사용할 수 있습니다.
        </p>
        {files.length ? (
          <section
            id="newsletter-preview"
            className="newsletter-frame-wrap"
            aria-label="뉴스레터 미리보기"
          >
            <iframe
              key={selected}
              src={current?.url}
              title={`${current?.title || "뉴스레터"} 미리보기`}
            />
          </section>
        ) : (
          <section className="empty">
            <h2>뉴스레터가 없습니다</h2>
            <p>관리자 공개 폴더에 등록된 발송용 HTML이 없습니다.</p>
          </section>
        )}
      </main>
    </div>
  );
}
