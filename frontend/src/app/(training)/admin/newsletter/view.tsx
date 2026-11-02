"use client";

import { useState } from "react";
import AdminNav from "@/components/admin-nav";

type NewsletterFile = { name: string; label: string; url: string };

export default function NewsletterAdmin({
  files,
}: {
  files: NewsletterFile[];
}) {
  const [selected, setSelected] = useState(files[0]?.url || "");
  const current = files.find((file) => file.url === selected);

  return (
    <div className="gov">
      <AdminNav current="newsletter" />
      <main className="workspace">
        <header className="page-head">
          <div>
            <h1>뉴스레터</h1>
            <p className="muted">
              발송용 HTML을 선택해 오른쪽 미리보기에서 확인합니다.
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
          <a href="#newsletter-preview" aria-current="page">
            발송본 미리보기
          </a>
        </nav>
        <p className="muted">
          목록에서 발송본을 선택하세요. 원본 HTML의 복사·가이드 기능은 미리보기
          안에서 그대로 사용할 수 있습니다.
        </p>
        {files.length ? (
          <div className="newsletter-manager">
            <nav className="newsletter-list" aria-label="뉴스레터 발송본 목록">
              <h2>발송본</h2>
              {files.map((file) => (
                <button
                  key={file.name}
                  type="button"
                  aria-current={selected === file.url ? "page" : undefined}
                  onClick={() => setSelected(file.url)}
                >
                  {file.label}
                </button>
              ))}
            </nav>
            <section
              id="newsletter-preview"
              className="newsletter-frame-wrap"
              aria-label="뉴스레터 미리보기"
            >
              <iframe
                key={selected}
                src={selected}
                title={`${current?.label || "뉴스레터"} 미리보기`}
              />
            </section>
          </div>
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
