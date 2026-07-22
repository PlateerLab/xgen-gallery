import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PRODUCTS, INDUSTRIES, type CaseStudy } from "@/lib/customers";
import { IndustryVisual } from "@/components/industry-visual";

/**
 * 최근 대표 고객 사례를 이미지 카드로 보여주는 키비주얼(라벨 없는 카드 본체).
 * 배경은 고객사 산업을 상징하는 브랜드 SVG, 키 메시지는 사례 제목+간략 설명.
 * 라벨/슬라이더 등은 호출부(FeaturedCaseSlider)에서 감싼다.
 */
export function FeaturedCaseCard({ item }: { item: CaseStudy }) {
    return (
        <Link
            href={`/customers/case/${item.slug}`}
            className="group block overflow-hidden rounded-2xl border border-white/15 shadow-[0_28px_60px_-24px_rgba(0,0,0,0.7)] transition hover:border-white/30"
        >
            <div className="relative aspect-[16/10] overflow-hidden">
                {/* 산업 상징 비주얼 */}
                <IndustryVisual
                    industry={item.industry}
                    className="absolute inset-0 transition duration-500 group-hover:scale-[1.03]"
                />
                {/* 하단 가독성 그라디언트 */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#050813] via-[#050813]/60 to-[#050813]/10" />

                {/* 상단 메타 배지 */}
                <div className="absolute left-4 top-4 flex flex-wrap items-center gap-2 text-[12.5px]">
                    <span className="rounded-full bg-[#5eead4]/20 px-2.5 py-0.5 font-semibold text-[#5eead4] backdrop-blur-sm">
                        {PRODUCTS[item.products[0]].name}
                    </span>
                    <span className="rounded-full bg-white/10 px-2.5 py-0.5 text-white/85 backdrop-blur-sm">
                        {INDUSTRIES[item.industry].ko}
                    </span>
                    <time
                        dateTime={item.published}
                        className="rounded-full bg-black/25 px-2.5 py-0.5 text-white/70 backdrop-blur-sm"
                    >
                        {item.published.slice(0, 7).replace("-", ".")}
                    </time>
                </div>

                {/* 하단 키 메시지 — 사례 제목 + 간략 설명 */}
                <div className="absolute inset-x-0 bottom-0 p-5">
                    <h3 className="text-[18px] font-bold leading-snug text-white">
                        {item.title}
                    </h3>
                    <p className="mt-2 line-clamp-2 text-[13.5px] leading-relaxed text-white/70">
                        {item.summary}
                    </p>
                    <span className="mt-3 inline-flex items-center gap-1 text-[13.5px] font-semibold text-[#5eead4]">
                        사례 보기
                        <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5" />
                    </span>
                </div>
            </div>
        </Link>
    );
}
