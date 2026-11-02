"use client";

import { useMemo, useState } from "react";
import AdminNav from "@/components/admin-nav";

type NewsletterFile = {
  id: string;
  type: "internal" | "delivery";
  typeLabel: string;
  issue: string;
  date: string;
  title: string;
  url: string;
};

const TYPES = [
  { id: "internal", label: "사내용" },
  { id: "delivery", label: "발송용" },
] as const;

const PAGE_SIZE = 15;
const PAGE_WINDOW = 5;

export default function NewsletterAdmin({ files }: { files: readonly NewsletterFile[] }) {
  const [type, setType] = useState<NewsletterFile["type"]>("internal");
  const history = useMemo(() => files.filter((file) => file.type === type), [files, type]);
  const [selectedByType, setSelectedByType] = useState({
    internal: files.find((file) => file.type === "internal")?.id || "",
    delivery: files.find((file) => file.type === "delivery")?.id || "",
  });
  const [pageByType, setPageByType] = useState({ internal: 1, delivery: 1 });
  const totalPages = Math.max(1, Math.ceil(history.length / PAGE_SIZE));
  const currentPage = Math.min(pageByType[type], totalPages);
  const pageStart = (currentPage - 1) * PAGE_SIZE;
  const visibleHistory = history.slice(pageStart, pageStart + PAGE_SIZE);
  const windowStart = Math.floor((currentPage - 1) / PAGE_WINDOW) * PAGE_WINDOW + 1;
  const pageNumbers = Array.from(
    { length: Math.min(PAGE_WINDOW, totalPages - windowStart + 1) },
    (_, index) => windowStart + index,
  );
  const current = history.find((file) => file.id === selectedByType[type]) || history[0];

  function movePage(nextPage: number) {
    const page = Math.max(1, Math.min(nextPage, totalPages));
    const first = history[(page - 1) * PAGE_SIZE];
    setPageByType((previous) => ({ ...previous, [type]: page }));
    if (first) {
      setSelectedByType((previous) => ({ ...previous, [type]: first.id }));
    }
  }

  return (
    <div className="gov">
      <AdminNav current="newsletter" />
      <main className="workspace">
        <header className="page-head">
          <div>
            <h1>뉴스레터</h1>
            <p className="muted">사내용과 발송용 뉴스레터의 제작 히스토리를 구분해 확인합니다.</p>
          </div>
          {current && (
            <div className="actions">
              <a className="button primary" href={current.url} target="_blank" rel="noreferrer">
                새 창에서 열기
              </a>
            </div>
          )}
        </header>
        <nav className="tabs" aria-label="뉴스레터 용도 선택">
          {TYPES.map((item) => (
            <button
              key={item.id}
              type="button"
              aria-current={type === item.id ? "page" : undefined}
              onClick={() => setType(item.id)}
            >
              {item.label}
            </button>
          ))}
        </nav>
        <p className="muted">
          상단에서 용도를 고른 뒤 왼쪽 히스토리에서 제작본을 선택하세요. 원본 HTML의 복사·가이드 기능은
          미리보기 안에서 그대로 사용할 수 있습니다.
        </p>
        {current ? (
          <div className="newsletter-manager">
            <nav className="newsletter-history" aria-label={`${current.typeLabel} 제작 히스토리`}>
              <h2>{current.typeLabel} 히스토리</h2>
              <div className="newsletter-pagination" aria-label={`${current.typeLabel} 히스토리 페이지`}>
                {windowStart > 1 && (
                  <button type="button" aria-label="이전 페이지 묶음" onClick={() => movePage(windowStart - 1)}>
                    이전
                  </button>
                )}
                {pageNumbers.map((page) => (
                  <button
                    key={page}
                    type="button"
                    aria-current={currentPage === page ? "page" : undefined}
                    aria-label={`${page}페이지`}
                    onClick={() => movePage(page)}
                  >
                    {page}
                  </button>
                ))}
                {windowStart + PAGE_WINDOW <= totalPages && (
                  <button type="button" aria-label="다음 페이지 묶음" onClick={() => movePage(windowStart + PAGE_WINDOW)}>
                    다음
                  </button>
                )}
              </div>
              <div className="newsletter-history-items">
                {visibleHistory.map((file) => (
                  <button
                    className="newsletter-history-item"
                    key={file.id}
                    type="button"
                    aria-current={current.id === file.id ? "page" : undefined}
                    onClick={() => setSelectedByType((previous) => ({ ...previous, [type]: file.id }))}
                  >
                    <span className="newsletter-history-label">
                      <strong>{file.issue}</strong>: {file.date}
                    </span>
                  </button>
                ))}
              </div>
            </nav>
            <section id="newsletter-preview" className="newsletter-frame-wrap" aria-label={`${current.title} 미리보기`}>
              <iframe key={current.id} src={current.url} title={`${current.title} 미리보기`} />
            </section>
          </div>
        ) : (
          <section className="empty">
            <h2>뉴스레터가 없습니다</h2>
            <p>관리자 공개 폴더에 등록된 뉴스레터 HTML이 없습니다.</p>
          </section>
        )}
      </main>
    </div>
  );
}
