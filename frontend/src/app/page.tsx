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
import { getAllPosts } from "@/lib/blog";
import { getIssues } from "@/lib/newsletter";
import { getAllCases, caseLinkEnabled } from "@/lib/customers";

export default function Home() {
    // 히어로 하단 오버레이용 데이터(서버에서 읽어 클라이언트 Hero로 전달).
    const posts = getAllPosts();
    const news = posts.find((p) => p.category === "제품 소식");
    const productNews = news
        ? { slug: news.slug, title: news.title, category: news.category, date: news.date }
        : null;
    // 최근 Tech Note(블로그) — 헤드라인 뉴스 3단 중 하나.
    // 최신 5개를 넘겨 Hero가 방문마다 그중 하나를 무작위로 노출한다.
    const techPosts = posts
        .filter((x) => x.category === "Tech Note")
        .slice(0, 5)
        .map((p) => ({ slug: p.slug, title: p.title, category: p.category, date: p.date }));
    const iss = getIssues()[0];
    const latestIssue = iss
        ? { slug: iss.slug, title: iss.title, vol: iss.vol, date: iss.date }
        : null;
    // 최근 고객사례 — 상세본이 공개된(링크 가능한) 사례 중 가장 최신 1건.
    // 헤드라인(title)이 아니라 한 줄 요약(summary)을 넘긴다 — 히어로 스트립은 폭을
    // 넉넉히 주고 말줄임으로 끊는 자리라, 짧은 헤드라인보다 요약이 더 많이 읽힌다.
    const kase = getAllCases().find((c) => caseLinkEnabled(c.slug));
    const latestCase = kase ? { slug: kase.slug, text: kase.summary } : null;

    return (
        <>
            <JsonLd data={faqPageLd(dict.ko.faq.entries)} />
            <SiteNav overlay />
            <main>
                <Hero
                    productNews={productNews}
                    techPosts={techPosts}
                    latestIssue={latestIssue}
                    latestCase={latestCase}
                />
                <CustomerStrip />
                <HomeTrialBanner />
                <Reveal><HomePositioning /></Reveal>
                {/* 제품 가치·트러스트를 앞으로 */}
                <Reveal><HomeProductTour /></Reveal>
                <Reveal><HomeIndustries /></Reveal>
                <Reveal><QualitySecurity /></Reveal>
                {/* 연구·기술·오픈소스 = 신뢰 근거로 묶어 뒤로 */}
                <Reveal><HomeResearch /></Reveal>
                <Reveal><HomeOpenSource /></Reveal>
                <Reveal><HomeTechnology /></Reveal>
                {/* 전환 */}
                <Reveal><HomeExperience /></Reveal>
                <Reveal><HomeInsights /></Reveal>
                <Reveal><HomeResources /></Reveal>
                <Reveal><Faq /></Reveal>
            </main>
            <SiteFooter />
        </>
    );
}
