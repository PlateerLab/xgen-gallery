"use client";

import { useEffect } from "react";

/**
 * 서버 컴포넌트가 아는 값을 전역 클라이언트 위젯에 알려주는 얇은 통로.
 *
 * 화면 우하단 구독 위젯(SubscribeCta)은 레이아웃에 한 번 붙는 전역 컴포넌트라
 * 지금 보고 있는 글의 카테고리를 알 수 없다. 상태 관리를 하나 더 들이는 대신
 * body 의 data 속성에 값을 남겨 위젯이 읽어가게 한다(구독 게이트도 같은 방식).
 */
export function BodyFlag({ name, value }: { name: string; value?: string }) {
    useEffect(() => {
        if (!value) return;
        document.body.dataset[name] = value;
        return () => {
            delete document.body.dataset[name];
        };
    }, [name, value]);
    return null;
}
