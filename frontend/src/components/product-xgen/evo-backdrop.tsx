"use client";

/* AX Evolution Model 배경 모션 — Adobe Stock 474515521(「Abstract Futuristic Digital Plexus Network」, 무료 컬렉션 라이선스) 영상.
   웹용으로 1920px·소리 없음·16.5초로 줄이고, 끝 1.5초를 처음과 겹쳐 흐리게 이어 붙여 반복 재생이 끊기지 않게 했다.
   화면에 보일 때만 재생하고, 첫 로드 오류는 한 번 다시 불러온다. 동작 줄이기 설정이면 첫 장면(포스터) 정지 화면. */

import { useEffect, useRef, useState } from "react";

export function EvoBackdrop() {
    const ref = useRef<HTMLVideoElement>(null);
    const [reduced, setReduced] = useState(false);

    useEffect(() => {
        setReduced(!!window.matchMedia?.("(prefers-reduced-motion: reduce)").matches);
    }, []);

    useEffect(() => {
        const v = ref.current;
        if (!v) return;
        if (reduced) {
            v.pause();
            return;
        }
        let retried = false;
        const onError = () => {
            if (retried) return;
            retried = true;
            v.load();
        };
        v.addEventListener("error", onError);
        const io = new IntersectionObserver(
            ([e]) => {
                if (e.isIntersecting) v.play().catch(() => {});
                else v.pause();
            },
            { threshold: 0.05 },
        );
        io.observe(v);
        return () => {
            io.disconnect();
            v.removeEventListener("error", onError);
        };
    }, [reduced]);

    return (
        <video
            ref={ref}
            aria-hidden
            className="absolute inset-0 h-full w-full object-cover"
            src="/product/why/evolution-plexus.mp4"
            poster="/product/why/evolution-plexus-poster.jpg"
            muted
            loop
            playsInline
            preload="metadata"
        />
    );
}
