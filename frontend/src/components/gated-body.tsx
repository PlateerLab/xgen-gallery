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
 * 여기서 받는 것은 약식 리드 정보(회사·담당자)를 겸한 구독이다. 시트에는
 * kind="field-report" 로 쌓여 뉴스레터·새 글 알림과 유입 경로가 구분된다.
 * 이미 구독 중인 독자는 이메일만 확인해 그대로 열어준다(/api/newsletter/check).
 *
 * 한 번 정보를 남긴 사람은 현장 리포트 **전체**를 계속 읽는다. 해제는 글 단위가
 * 아니라 사이트 전체에 걸리는 쿠키 한 줄로 기억하고(path=/), 쿠키가 지워지거나
 * 만료돼도 남겨둔 이메일로 조용히 다시 확인해 그대로 연다.
 */
const COOKIE = "xgen-fr-unlock";
const MAX_AGE = 60 * 60 * 24 * 365; // 1년
/** 쿠키가 사라졌을 때 다시 확인할 근거 — 재입력을 요구하지 않기 위해 남긴다. */
const EMAIL_KEY = "xgen-fr-email";
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const COPY = {
    ko: {
        badge: "구독하시면 이어서 읽을 수 있습니다",
        title: "현장 리포트 전문 보기",
        desc: "고객사 미팅과 PoC 현장에서 확인한 내용입니다. 아래 정보를 남기시면 이 글의 나머지가 바로 열리고, 새 현장 리포트가 나올 때 메일로 알려드립니다.",
        name: "담당자명",
        company: "회사명",
        jobTitle: "직급",
        email: "회사 이메일",
        agree: "개인정보 수집·이용 및 현장 리포트 수신에 동의합니다",
        alsoNews: "뉴스레터도 함께 받아볼게요 (선택)",
        submit: "구독하고 이어 읽기",
        submitting: "처리 중…",
        error: "모든 항목과 동의 여부를 확인해 주세요",
        done: "구독이 접수되었습니다",
        already: "현장 리포트를 구독 중이신가요?",
        checkTitle: "구독자 확인",
        checkDesc: "전에 현장 리포트를 받아보셨거나 뉴스레터를 구독 중이시라면, 그 이메일 주소만으로 바로 이어서 읽으실 수 있습니다.",
        checkSubmit: "확인하고 이어 읽기",
        checkFail: "구독 내역을 찾지 못했습니다. 아래에 정보를 남기고 이어 읽어주세요",
        back: "정보 남기고 읽기",
    },
    en: {
        badge: "Subscribe to keep reading",
        title: "Read the full field report",
        desc: "What we learned from customer meetings and PoCs. Leave the details below to open the rest — and we will let you know when a new field report lands.",
        name: "Your name",
        company: "Company",
        jobTitle: "Job title",
        email: "Work email",
        agree: "I agree to the use of my personal data and to receiving field reports",
        alsoNews: "Send me the newsletter too (optional)",
        submit: "Subscribe and continue",
        submitting: "Working…",
        error: "Fill in every field and tick the consent box",
        done: "Subscription received",
        already: "Already subscribed to field reports?",
        checkTitle: "Subscriber check",
        checkDesc: "If you have had a field report before, or subscribe to the newsletter, that email alone opens the rest.",
        checkSubmit: "Confirm and continue",
        checkFail: "We could not find that subscription. Leave your details below to continue",
        back: "Leave details instead",
    },
};

export function GatedBody({ teaser, rest }: { teaser: string; rest: string }) {
    const { locale } = useI18n();
    const t = COPY[locale === "en" ? "en" : "ko"];
    const [unlocked, setUnlocked] = useState(false);
    const [form, setForm] = useState({
        name: "",
        company: "",
        jobTitle: "",
        email: "",
    });
    const [agree, setAgree] = useState(false);
    // 뉴스레터는 별개 구독이다 — 원하는 사람만 함께 신청한다.
    const [alsoNews, setAlsoNews] = useState(false);
    const [status, setStatus] = useState<"idle" | "sending" | "error">("idle");
    // 이미 구독한 독자용 — 이메일만 받아 구독자 시트에서 확인한다.
    const [mode, setMode] = useState<"subscribe" | "check">("subscribe");
    const [checkEmail, setCheckEmail] = useState("");
    const [checkFailed, setCheckFailed] = useState(false);

    function unlock(email?: string) {
        document.cookie = `${COOKIE}=1; path=/; max-age=${MAX_AGE}; samesite=lax`;
        if (email) {
            try {
                localStorage.setItem(EMAIL_KEY, email.toLowerCase());
            } catch {
                /* 저장이 막힌 브라우저면 쿠키만으로 기억한다 */
            }
        }
        setUnlocked(true);
    }

    async function verify(e: React.FormEvent) {
        e.preventDefault();
        const value = checkEmail.trim();
        if (!EMAIL_RE.test(value)) {
            setCheckFailed(true);
            return;
        }
        setStatus("sending");
        setCheckFailed(false);
        try {
            const res = await fetch("/api/newsletter/check", {
                method: "POST",
                headers: { "content-type": "application/json" },
                body: JSON.stringify({ email: value }),
            });
            const data = (await res.json()) as { subscribed?: boolean };
            if (data.subscribed) {
                unlock(value);
                return;
            }
        } catch {
            /* 확인 실패는 아래에서 안내한다 */
        }
        setStatus("idle");
        setCheckFailed(true);
    }

    const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm((f) => ({ ...f, [k]: e.target.value }));
        if (status === "error") setStatus("idle");
    };

    // 서버 렌더는 항상 잠긴 상태로 두고, 마운트 후 쿠키를 보고 연다
    // (초기 상태를 쿠키로 잡으면 하이드레이션이 어긋난다).
    useEffect(() => {
        if (document.cookie.split("; ").some((c) => c.startsWith(`${COOKIE}=`))) {
            setUnlocked(true);
            return;
        }
        // 쿠키가 지워졌거나 만료됐어도, 전에 정보를 남긴 사람에게 같은 폼을 다시
        // 내밀지 않는다 — 남겨둔 주소로 명단을 확인해 조용히 연다.
        let stale = false;
        const saved = (() => {
            try {
                return localStorage.getItem(EMAIL_KEY);
            } catch {
                return null;
            }
        })();
        if (!saved) return;
        (async () => {
            try {
                const res = await fetch("/api/newsletter/check", {
                    method: "POST",
                    headers: { "content-type": "application/json" },
                    body: JSON.stringify({ email: saved }),
                });
                const data = (await res.json()) as { subscribed?: boolean };
                if (!stale && data.subscribed) unlock(saved);
            } catch {
                /* 확인이 안 되면 평소대로 게이트를 보여준다 */
            }
        })();
        return () => {
            stale = true;
        };
    }, []);

    // 이 글에는 게이트 카드가 이미 구독 폼이라, 화면 우하단의 플로팅 구독
    // 위젯(SubscribeCta)까지 뜨면 같은 요청이 두 번 나온다. body 에 표시를 남겨
    // 그 위젯이 스스로 빠지게 한다(해제 후에도 이미 구독한 독자라 계속 감춘다).
    useEffect(() => {
        document.body.dataset.blogGate = "on";
        return () => {
            delete document.body.dataset.blogGate;
        };
    }, []);

    async function submit(e: React.FormEvent) {
        e.preventDefault();
        const v = {
            name: form.name.trim(),
            company: form.company.trim(),
            jobTitle: form.jobTitle.trim(),
            email: form.email.trim(),
        };
        if (!EMAIL_RE.test(v.email) || !v.name || !v.company || !v.jobTitle || !agree) {
            setStatus("error");
            return;
        }
        setStatus("sending");
        try {
            await fetch("/api/newsletter", {
                method: "POST",
                headers: { "content-type": "application/json" },
                body: JSON.stringify({ ...v, kind: "field-report" }),
            });
            // 뉴스레터는 종류가 달라 시트에서도 다른 행으로 관리된다.
            // 한쪽만 해지해도 다른 쪽이 유지되도록 요청을 나눠 보낸다.
            if (alsoNews) {
                await fetch("/api/newsletter", {
                    method: "POST",
                    headers: { "content-type": "application/json" },
                    body: JSON.stringify({ email: v.email, kind: "newsletter" }),
                });
            }
        } catch {
            // 전송이 실패해도 열어준다 — 웹훅이 비동기라 성공 여부가 즉시 확정되지
            // 않는데, 여기서 막으면 독자만 손해다.
        }
        unlock(v.email);
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
                                {mode === "check" ? t.checkTitle : t.title}
                            </p>
                            <p className="mt-2 text-[14.5px] leading-relaxed text-[var(--color-ink-muted)]">
                                {mode === "check" ? t.checkDesc : t.desc}
                            </p>

                            {mode === "check" ? (
                                <form onSubmit={verify} className="mt-5">
                                    <input
                                        type="email"
                                        required
                                        value={checkEmail}
                                        onChange={(e) => {
                                            setCheckEmail(e.target.value);
                                            setCheckFailed(false);
                                        }}
                                        placeholder={t.email}
                                        aria-label={t.email}
                                        disabled={status === "sending"}
                                        className="w-full rounded-xl border border-[var(--color-line)] bg-white px-4 py-3 text-[15px] outline-none transition focus:border-[#8b5cf6] focus:ring-2 focus:ring-[#8b5cf6]/20 disabled:opacity-60"
                                    />
                                    {checkFailed && (
                                        <p className="mt-2 text-[13px] font-semibold text-[#dc2626]">
                                            {t.checkFail}
                                        </p>
                                    )}
                                    <button
                                        type="submit"
                                        disabled={status === "sending"}
                                        className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#6d28d9] px-5 py-3 text-[15px] font-bold text-white transition hover:bg-[#5b21b6] disabled:opacity-60"
                                    >
                                        {status === "sending" ? t.submitting : t.checkSubmit}
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setMode("subscribe");
                                            setCheckFailed(false);
                                        }}
                                        className="mt-3 w-full text-[13.5px] font-semibold text-[#6d28d9] transition hover:text-[#5b21b6]"
                                    >
                                        {t.back}
                                    </button>
                                </form>
                            ) : (
                            <form onSubmit={submit} className="mt-5">
                                <div className="grid gap-2.5 sm:grid-cols-2">
                                    {/* 회사 → 담당자 순. 2열이라 위 줄에 회사 정보,
                                        아래 줄에 담당자 정보가 놓인다. */}
                                    {(
                                        [
                                            ["company", t.company, "text"],
                                            ["email", t.email, "email"],
                                            ["name", t.name, "text"],
                                            ["jobTitle", t.jobTitle, "text"],
                                        ] as const
                                    ).map(([key, label, type]) => (
                                        <input
                                            key={key}
                                            type={type}
                                            required
                                            value={form[key]}
                                            onChange={set(key)}
                                            placeholder={label}
                                            aria-label={label}
                                            disabled={status === "sending"}
                                            className="w-full rounded-xl border border-[var(--color-line)] bg-white px-4 py-3 text-[15px] outline-none transition focus:border-[#8b5cf6] focus:ring-2 focus:ring-[#8b5cf6]/20 disabled:opacity-60"
                                        />
                                    ))}
                                </div>
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
                                <label className="mt-2 flex cursor-pointer items-center gap-2 text-[13.5px] text-[var(--color-ink-muted)]">
                                    <input
                                        type="checkbox"
                                        checked={alsoNews}
                                        onChange={(e) => setAlsoNews(e.target.checked)}
                                        className="h-4 w-4 rounded border-[var(--color-line-strong)] accent-[#8b5cf6]"
                                    />
                                    <span>{t.alsoNews}</span>
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
                                <button
                                    type="button"
                                    onClick={() => setMode("check")}
                                    className="mt-3 w-full text-[13.5px] font-semibold text-[var(--color-ink-subtle)] transition hover:text-[#6d28d9]"
                                >
                                    {t.already}
                                </button>
                            </form>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}
