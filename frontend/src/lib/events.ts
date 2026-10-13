import { HACKATHON_TITLE } from "./hackathon";

export type EventStatus = "preparing" | "registration" | "upcoming" | "ongoing" | "ended";

export interface LabEvent {
    id: string;
    name: string;
    headline: string;
    description: string;
    href: string;
    year: string;
    category: string;
    audience: string;
    venue?: string;
    /** ISO 8601 timestamps with an explicit time zone. Leave unknown dates unset. */
    registrationOpensAt?: string;
    registrationClosesAt?: string;
    startsAt?: string;
    endsAt?: string;
    draft?: boolean;
}

export const EVENT_STATUS_META: Record<EventStatus, { label: string; empty: string }> = {
    preparing: { label: "준비 중", empty: "준비 중인 이벤트가 없습니다." },
    registration: { label: "접수 중", empty: "접수 중인 이벤트가 없습니다." },
    upcoming: { label: "접수 마감", empty: "접수를 마치고 개최를 기다리는 이벤트가 없습니다." },
    ongoing: { label: "진행 중", empty: "진행 중인 이벤트가 없습니다." },
    ended: { label: "종료", empty: "종료된 이벤트가 아직 없습니다." },
};

export const HACKATHON_EVENT: LabEvent = {
    id: "ai-build-challenge-2026",
    name: "PLATEER AI Build Challenge",
    headline: HACKATHON_TITLE,
    description: "XGEN과 DexOn으로 업무를 개선하고 새로운 서비스의 가능성을 만드는 전사 AI 해커톤.",
    href: "/events/ai-build-challenge/2026",
    year: "2026",
    category: "해커톤",
    audience: "플래티어 전사 직원",
    draft: true,
};

// Keep completed events in this registry so their pages remain available.
export const LAB_EVENTS: readonly LabEvent[] = [HACKATHON_EVENT];

export function getEventStatus(event: LabEvent, now = Date.now()): EventStatus {
    const reached = (date?: string) => date !== undefined && now >= Date.parse(date);
    if (reached(event.endsAt)) return "ended";
    if (reached(event.startsAt)) return "ongoing";
    if (reached(event.registrationClosesAt)) return "upcoming";
    if (reached(event.registrationOpensAt)) return "registration";
    return "preparing";
}

const EVENT_DATE_FORMAT = new Intl.DateTimeFormat("ko-KR", {
    year: "numeric", month: "2-digit", day: "2-digit", timeZone: "Asia/Seoul",
});

export function getEventDateLabel(event: LabEvent): string {
    if (!event.startsAt) return "일정 추후 안내";
    const first = EVENT_DATE_FORMAT.format(new Date(event.startsAt));
    if (!event.endsAt) return first;
    const last = EVENT_DATE_FORMAT.format(new Date(event.endsAt));
    return first === last ? first : `${first} – ${last}`;
}

export function getEventListing(now = Date.now()) {
    return LAB_EVENTS.map((event) => ({ event, status: getEventStatus(event, now), dateLabel: getEventDateLabel(event) }));
}
