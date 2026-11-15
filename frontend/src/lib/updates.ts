import { getAllPosts } from "@/lib/blog";
import { getIssuesFor } from "@/lib/newsletter";
import { getEventListing } from "@/lib/events";
import type { Locale } from "@/lib/i18n";
import type { UpdatesEventItem } from "@/components/pages/updates-page";

/** 소식·행사 허브용 요약 데이터 — 기존 목록 소스(블로그 News·뉴스레터·이벤트)를 그대로 재사용한다. */
export function getUpdatesSummary(locale: Locale) {
    const news = getAllPosts(locale)
        .filter((p) => p.category === "News")
        .slice(0, 3);
    const issues = getIssuesFor(locale).slice(0, 3);
    const events: UpdatesEventItem[] = getEventListing().map((item) => ({
        ...item,
        dateLabel: locale === "en" && !item.event.startsAt ? "Date to be announced" : item.dateLabel,
    }));
    return { news, issues, events };
}
