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

export default function Home() {
    // 히어로 하단 오버레이용 데이터(서버에서 읽어 클라이언트 Hero로 전달).
    const posts = getAllPosts();
    const news = posts.find((p) => p.category === "제품 소식");
    const productNews = news
        ? { slug: news.slug, title: news.title, category: news.category, date: news.date }
        : null;
    // 최근 Tech Note(블로그) — 헤드라인 뉴스 3단 중 하나.
    const tech = posts.find((x) => x.category === "Tech Note");
    const latestPost = tech
        ? { slug: tech.slug, title: tech.title, category: tech.category, date: tech.date }
        : null;
    const iss = getIssues()[0];
    const latestIssue = iss
        ? { slug: iss.slug, title: iss.title, vol: iss.vol, date: iss.date }
        : null;

    return (
        <>
            <JsonLd data={faqPageLd(dict.ko.faq.entries)} />
            <SiteNav overlay />
            <main>
                <Hero
                    productNews={productNews}
                    latestPost={latestPost}
                    latestIssue={latestIssue}
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
