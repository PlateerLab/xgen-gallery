"use client";

import { useEffect, useState } from "react";
import { Check, Lock } from "lucide-react";
import { useI18n } from "@/components/i18n-provider";

/**
 * 구독 게이트 — 도입부는 열어두고 본론부터 가린다.
 *
 * 본문 HTML 은 서버에서 **전량** 내려간다. 화면에서만 흐리게 덮으므로 검색엔진과
 * AI 크롤러는 지금처럼 전문을 읽는다(검색 노출 손실 없음). 대신 개발자도구로는
 * 우회되므로, 이 장치의 목적은 콘텐츠 차단이 아니라 리드 수집이다.
 *
 * 해제는 쿠키 한 줄로 기억한다. 서버 세션이 없고 구독자 명단을 사이트가 조회할 수
 * 없는 구조라(구독은 웹훅 단방향) 이메일 진위까지 확인하지는 않는다.
 */
const COOKIE = "xgen-fr-unlock";
const MAX_AGE = 60 * 60 * 24 * 180; // 180일
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const COPY = {
    ko: {
        badge: "구독하면 이어서 읽을 수 있습니다",
        title: "현장 리포트 전문 보기",
        desc: "고객사 미팅과 PoC 현장에서 확인한 내용을 정리해 보내드립니다. 이메일을 남기시면 이 글의 나머지가 바로 열립니다.",
        placeholder: "이메일 주소를 입력하세요",
        agree: "구독 및 개인정보 수집·이용에 동의합니다",
        submit: "구독하고 이어 읽기",
        submitting: "처리 중…",
        error: "이메일 주소와 동의 여부를 확인해 주세요",
        done: "구독이 접수되었습니다",
    },
    en: {
        badge: "Subscribe to keep reading",
        title: "Read the full field report",
        desc: "We send what we learn from customer meetings and PoCs. Leave your email and the rest of this piece opens right away.",
        placeholder: "Enter your email address",
        agree: "I agree to the subscription and to the use of my personal data",
        submit: "Subscribe and continue",
        submitting: "Working…",
        error: "Check the email address and the consent box",
        done: "Subscription received",
    },
};

export function GatedBody({ teaser, rest }: { teaser: string; rest: string }) {
    const { locale } = useI18n();
    const t = COPY[locale === "en" ? "en" : "ko"];
    const [unlocked, setUnlocked] = useState(false);
    const [email, setEmail] = useState("");
    const [agree, setAgree] = useState(false);
    const [status, setStatus] = useState<"idle" | "sending" | "error">("idle");

    // 서버 렌더는 항상 잠긴 상태로 두고, 마운트 후 쿠키를 보고 연다
    // (초기 상태를 쿠키로 잡으면 하이드레이션이 어긋난다).
    useEffect(() => {
        if (document.cookie.split("; ").some((c) => c.startsWith(`${COOKIE}=`))) {
            setUnlocked(true);
        }
    }, []);

    async function submit(e: React.FormEvent) {
        e.preventDefault();
        const value = email.trim();
        if (!EMAIL_RE.test(value) || !agree) {
            setStatus("error");
            return;
        }
        setStatus("sending");
        try {
            await fetch("/api/newsletter", {
                method: "POST",
                headers: { "content-type": "application/json" },
                body: JSON.stringify({ email: value, subscribe: true, kind: "blog" }),
            });
        } catch {
            // 전송이 실패해도 열어준다 — 웹훅이 비동기라 성공 여부가 즉시 확정되지
            // 않는데, 여기서 막으면 독자만 손해다.
        }
        document.cookie = `${COOKIE}=1; path=/; max-age=${MAX_AGE}; samesite=lax`;
        setUnlocked(true);
    }

    return (
        <>
            <article
                className="blog-prose"
                dangerouslySetInnerHTML={{ __html: teaser }}
            />

            <div className={unlocked ? undefined : "blog-gate"}>
                <article
                    className="blog-prose"
                    aria-hidden={unlocked ? undefined : true}
                    dangerouslySetInnerHTML={{ __html: rest }}
                />

                {!unlocked && (
                    <div className="blog-gate__panel">
                        <div className="rounded-2xl border border-[var(--color-line)] bg-white p-7 shadow-[0_24px_60px_-20px_rgba(20,40,80,0.28)]">
                            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#f5f3ff] px-3 py-1 text-[12.5px] font-bold text-[#6d28d9]">
                                <Lock className="h-3.5 w-3.5" />
                                {t.badge}
                            </span>
                            <p className="mt-3 text-[19px] font-bold tracking-tight text-[var(--color-ink)]">
                                {t.title}
                            </p>
                            <p className="mt-2 text-[14.5px] leading-relaxed text-[var(--color-ink-muted)]">
                                {t.desc}
                            </p>

                            <form onSubmit={submit} className="mt-5">
                                <input
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => {
                                        setEmail(e.target.value);
                                        if (status === "error") setStatus("idle");
                                    }}
                                    placeholder={t.placeholder}
                                    aria-label={t.placeholder}
                                    disabled={status === "sending"}
                                    className="w-full rounded-xl border border-[var(--color-line)] bg-white px-4 py-3 text-[15px] outline-none transition focus:border-[#8b5cf6] focus:ring-2 focus:ring-[#8b5cf6]/20 disabled:opacity-60"
                                />
                                <label className="mt-3 flex cursor-pointer items-center gap-2 text-[13.5px] text-[var(--color-ink-muted)]">
                                    <input
                                        type="checkbox"
                                        checked={agree}
                                        onChange={(e) => {
                                            setAgree(e.target.checked);
                                            if (status === "error") setStatus("idle");
                                        }}
                                        className="h-4 w-4 rounded border-[var(--color-line-strong)] accent-[#8b5cf6]"
                                    />
                                    <span>{t.agree}</span>
                                </label>
                                {status === "error" && (
                                    <p className="mt-2 text-[13px] font-semibold text-[#dc2626]">
                                        {t.error}
                                    </p>
                                )}
                                <button
                                    type="submit"
                                    disabled={status === "sending"}
                                    className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#6d28d9] px-5 py-3 text-[15px] font-bold text-white transition hover:bg-[#5b21b6] disabled:opacity-60"
                                >
                                    {status === "sending" ? (
                                        t.submitting
                                    ) : (
                                        <>
                                            <Check className="h-4 w-4" />
                                            {t.submit}
                                        </>
                                    )}
                                </button>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}
