import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { Hero } from "@/components/hero";
import { HomeTrialBanner } from "@/components/home-trial-banner";
import { CustomerStrip } from "@/components/customer-strip";
import { HomePositioning } from "@/components/home-positioning";
import { HomeResearch } from "@/components/home-research";
import { HomeOpenSource } from "@/components/home-open-source";
import { HomeTechnology } from "@/components/home-technology";
import { HomeIndustries } from "@/components/home-industries";
import { HomeProductTour } from "@/components/home-product-tour";
import { HomeExperience } from "@/components/home-experience";
import { QualitySecurity } from "@/components/quality-security";
import { HomeInsights } from "@/components/home-insights";
import { HomeResources } from "@/components/home-resources";
import { Faq } from "@/components/faq";
import { Reveal } from "@/components/home-motion";
import { JsonLd } from "@/components/json-ld";
import { faqPageLd } from "@/lib/structured-data";
import { dict } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n";
import { getAllPosts } from "@/lib/blog";
import { getIssues } from "@/lib/newsletter";
import { getAllCases, caseLinkEnabled } from "@/lib/customers";

/**
 * 홈 — 한국어(`/`)와 영어(`/en`)가 공유하는 본문.
 *
 * 히어로 뉴스 스트립은 블로그·뉴스레터·고객사례에서 제목을 끌어온다. 영어판에서는
 * 블로그는 로케일별 원문(content/blog 또는 content/blog/en)에서 읽는다.
 * 뉴스레터·고객사례처럼 영문 필드가 선택적인 소스는 값이 있는 항목만 노출한다 —
 * 한국어 제목이 영문 페이지에 섞이면 페이지 언어 신호가 흐려지고 방문자도 읽지 못한다.
 */
export function HomePageContent({ locale }: { locale: Locale }) {
    const isKo = locale === "ko";

    // 로케일별 원문을 읽으므로 스트립에 세울 때 별도 필터가 필요 없다.
    const posts = getAllPosts(locale);
    const usable = posts;
    // 제품 소식 최신 2건 — 1번째는 스트립 윗줄 대표 자리, 2번째는 아래 3단의 제품 소식
    // 칸으로 보낸다(같은 글이 한 화면에 두 번 걸리지 않게).
    const newsPosts = usable.filter((p) => p.category === "제품 소식");
    const toHeroPost = (p: (typeof posts)[number]) => ({
        slug: p.slug,
        title: p.title,
        category: p.category,
        date: p.date,
    });
    const featuredPost = newsPosts[0] ? toHeroPost(newsPosts[0]) : null;
    const productNews = newsPosts[1] ? toHeroPost(newsPosts[1]) : null;
    // 최근 Tech Note(블로그) — 헤드라인 뉴스 3단 중 하나.
    // 최신 5개를 넘겨 Hero가 방문마다 그중 하나를 무작위로 노출한다.
    const techPosts = usable
        .filter((x) => x.category === "Tech Note")
        .slice(0, 5)
        .map(toHeroPost);
    const iss = getIssues()[0];
    const issTitle = isKo ? iss?.title : iss?.titleEn;
    const latestIssue =
        iss && issTitle
            ? { slug: iss.slug, title: issTitle, vol: iss.vol, date: iss.date }
            : null;
    // 최근 고객사례 — 상세본이 공개된(링크 가능한) 사례 중 가장 최신 1건.
    // 헤드라인(title)이 아니라 한 줄 요약(summary)을 넘긴다 — 히어로 스트립은 폭을
    // 넉넉히 주고 말줄임으로 끊는 자리라, 짧은 헤드라인보다 요약이 더 많이 읽힌다.
    const kase = getAllCases().find((c) => caseLinkEnabled(c.slug));
    const caseText = isKo ? kase?.summary : kase?.summaryEn;
    const latestCase = kase && caseText ? { slug: kase.slug, text: caseText } : null;

    return (
        <>
            <JsonLd data={faqPageLd(dict[locale].faq.entries)} />
            <SiteNav overlay />
            <main>
                <Hero
                    featuredPost={featuredPost}
                    productNews={productNews}
                    techPosts={techPosts}
                    latestIssue={latestIssue}
                    latestCase={latestCase}
                />
                <CustomerStrip locale={locale} />
                <HomeTrialBanner locale={locale} />
                <Reveal>
                    <HomePositioning locale={locale} />
                </Reveal>
                {/* 제품 가치·트러스트를 앞으로 */}
                <Reveal>
                    <HomeProductTour />
                </Reveal>
                <Reveal>
                    <HomeIndustries locale={locale} />
                </Reveal>
                <Reveal>
                    <QualitySecurity locale={locale} />
                </Reveal>
                {/* 연구·기술·오픈소스 = 신뢰 근거로 묶어 뒤로 */}
                <Reveal>
                    <HomeResearch locale={locale} />
                </Reveal>
                <Reveal>
                    <HomeOpenSource locale={locale} />
                </Reveal>
                <Reveal>
                    <HomeTechnology locale={locale} />
                </Reveal>
                {/* 전환 */}
                <Reveal>
                    <HomeExperience locale={locale} />
                </Reveal>
                <Reveal>
                    <HomeInsights locale={locale} />
                </Reveal>
                <Reveal>
                    <HomeResources locale={locale} />
                </Reveal>
                <Reveal>
                    <Faq />
                </Reveal>
            </main>
            <SiteFooter />
        </>
    );
}
