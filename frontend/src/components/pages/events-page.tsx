"use client";

import { useState } from "react";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { EVENT_STATUS_META, type EventStatus, type LabEvent } from "@/lib/events";
import styles from "./events-page.module.css";

type EventListing = { event: LabEvent; status: EventStatus; dateLabel: string };
const FILTERS: readonly EventStatus[] = ["preparing", "registration", "upcoming", "ongoing", "ended"];

export function EventsPageContent({ items }: { items: EventListing[] }) {
    const [filter, setFilter] = useState<EventStatus | "all">("all");
    const visible = items.filter((item) => filter === "all" || item.status === filter);

    return (
        <>
            <SiteNav showPromotion={false} />
            <main className={styles.page}>
                <section className={styles.hero} aria-labelledby="events-title">
                    <div className={styles.heroInner}>
                        <div><p className={styles.kicker}>PLATEER AI LABS / EVENTS</p><h1 id="events-title">만나고, 만들고,<br />변화를 나눕니다.</h1><p className={styles.intro}>플래티어의 해커톤과 기술 이벤트.<br />다가오는 행사부터 지난 기록까지, 한곳에서 만나보세요.</p></div>
                        <div className={styles.heroType} aria-hidden="true"><span>BUILD.</span><span>SHARE.</span></div>
                    </div>
                </section>

                <section className={styles.listSection} aria-labelledby="event-list-title">
                    <div className={styles.listHeader}><h2 id="event-list-title">이벤트</h2><span>{items.length}개의 이벤트</span></div>
                    <div className={styles.filters} role="group" aria-label="이벤트 상태 필터">
                        <button type="button" aria-pressed={filter === "all"} onClick={() => setFilter("all")}>전체 <span>{items.length}</span></button>
                        {FILTERS.map((status) => <button type="button" key={status} aria-pressed={filter === status} onClick={() => setFilter(status)}>{EVENT_STATUS_META[status].label} <span>{items.filter((item) => item.status === status).length}</span></button>)}
                    </div>
                    <p className={styles.resultCount} aria-live="polite">{filter === "all" ? "전체" : EVENT_STATUS_META[filter].label} · {visible.length}개</p>
                    {visible.length ? (
                        <div className={styles.eventGrid}>
                            {visible.map(({ event, status, dateLabel }) => (
                                <article className={styles.card} key={event.id}>
                                    <a href={event.href} target="_blank" rel="noopener noreferrer" className={styles.eventLink} aria-label={`${event.name} ${event.year} — ${event.headline}, 새 탭에서 열기`}>
                                        <div className={styles.poster}>
                                            <div className={styles.posterTop}><span>PLATEER LABS</span><span>{event.year}</span></div>
                                            <p className={styles.posterName}>{event.name}</p>
                                            <strong>{event.headline}</strong>
                                            <div className={styles.posterBottom}><span>{event.category}</span><span>PLATEER / EVENTS</span></div>
                                        </div>
                                        <div className={styles.cardMeta}><span className={styles.status} data-status={status}>{EVENT_STATUS_META[status].label}</span><span>{event.category}</span></div>
                                        <h3>{event.name} {event.year}</h3>
                                        <p className={styles.cardHeadline}>{event.headline}</p>
                                        <p className={styles.description}>{event.description}</p>
                                        <div className={styles.cardDetails}><span>{dateLabel}</span><span>{event.venue ?? "장소 추후 안내"}</span><span>{event.audience}</span></div>
                                        <span className={styles.cardAction}>{status === "ended" ? "지난 행사 보기" : "행사 자세히 보기"}<span className={styles.newTab}>새 탭</span></span>
                                    </a>
                                </article>
                            ))}
                        </div>
                    ) : (
                        <div className={styles.empty}><h3>{filter === "all" ? "등록된 이벤트가 없습니다." : EVENT_STATUS_META[filter].empty}</h3><p>새로운 이벤트와 지난 행사 소식은 이곳에서 안내합니다.</p><button type="button" onClick={() => setFilter("all")}>전체 이벤트 보기</button></div>
                    )}
                </section>
            </main>
            <SiteFooter hideCta />
        </>
    );
}
