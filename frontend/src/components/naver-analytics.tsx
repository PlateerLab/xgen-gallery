"use client";

import Script from "next/script";
import { usePathname, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useRef } from "react";

/**
 * 네이버 검색광고 공통 스크립트(wcslog.js) — labs.plateer.com 전환추적 공통 인증키(s_17cf66bfdc4d).
 * (이전 xgen.im 키 s_1129c6843c7에서 교체, NHN DATA 설치 안내 2026-11-24)
 * 모든 페이지 공통(site-shell <head>). 이 사이트는 화면만 바뀌는 구조(Next.js)라
 * 페이지가 바뀔 때마다 wcs_do(_nasa)를 한 번씩 다시 실행한다(마케팅팀 요청).
 * 폼 접수 전환(wcs.trans)은 lib/lead-attribution.ts 의 pushLeadConversion 에서 보낸다.
 */
export const NAVER_WA = "s_17cf66bfdc4d";

type NaverWindow = Window & {
    wcs?: { inflow: (d: string) => void; trans: (c: object) => void };
    wcs_add?: Record<string, string>;
    _nasa?: Record<string, unknown>;
    wcs_do?: (n?: unknown) => void;
};

function naverInit() {
    const w = window as NaverWindow;
    if (!w.wcs_add) w.wcs_add = {};
    w.wcs_add["wa"] = NAVER_WA;
    if (!w._nasa) w._nasa = {};
    if (w.wcs) {
        w.wcs.inflow("plateer.com");
        w.wcs_do?.(w._nasa);
    }
}

function RouteTracker() {
    const pathname = usePathname();
    const search = useSearchParams()?.toString();
    const first = useRef(true);
    useEffect(() => {
        // 첫 화면은 스크립트 로드 직후 naverInit()이 이미 보낸다.
        if (first.current) {
            first.current = false;
            return;
        }
        const w = window as NaverWindow;
        if (w.wcs && w.wcs_do) {
            if (!w._nasa) w._nasa = {};
            w.wcs_do(w._nasa);
        }
    }, [pathname, search]);
    return null;
}

export function NaverAnalytics() {
    return (
        <>
            <Script
                id="naver-wcslog"
                src="//wcs.naver.net/wcslog.js"
                strategy="afterInteractive"
                onReady={naverInit}
            />
            <Suspense fallback={null}>
                <RouteTracker />
            </Suspense>
        </>
    );
}
