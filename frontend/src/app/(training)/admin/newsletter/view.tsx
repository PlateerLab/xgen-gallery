"use client";

import { useMemo, useState } from "react";
import AdminNav from "@/components/admin-nav";

type NewsletterFile = {
  id: string;
  type: "internal" | "delivery";
  typeLabel: string;
  issue: string;
  period: string;
  title: string;
  url: string;
};

const TYPES = [
  { id: "internal", label: "사내용" },
  { id: "delivery", label: "발송용" },
] as const;

export default function NewsletterAdmin({ files }: { files: readonly NewsletterFile[] }) {
  const [type, setType] = useState<NewsletterFile["type"]>("internal");
  const history = useMemo(() => files.filter((file) => file.type === type), [files, type]);
  const [selectedByType, setSelectedByType] = useState({
    internal: files.find((file) => file.type === "internal")?.id || "",
    delivery: files.find((file) => file.type === "delivery")?.id || "",
  });
  const current = history.find((file) => file.id === selectedByType[type]) || history[0];

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
              {history.map((file) => (
                <button
                  key={file.id}
                  type="button"
                  aria-current={current.id === file.id ? "page" : undefined}
                  onClick={() => setSelectedByType((previous) => ({ ...previous, [type]: file.id }))}
                >
                  <strong>{file.issue}</strong>
                  <span>{file.period}</span>
                </button>
              ))}
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
