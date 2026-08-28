import type { Locale } from "@/lib/i18n";
import { EasyModeArt } from "@/components/easy-mode-art";
import { PathFinderArt } from "@/components/pathfinder-art";
import { FloUIArt } from "@/components/floui-art";
import { DexArt } from "@/components/dex-art";

/**
 * 핵심 기능 4종의 카드 일러스트를 한 자리에서 고른다.
 *
 * /product 의 특장점 카드와 상세 페이지의 「XGEN 핵심 기능 더 알아보기」가 같은
 * 그림을 쓴다. 다른 그림을 쓰면 같은 기능인데도 두 화면이 다른 것처럼 보인다.
 *
 * 네 장 모두 480x240 규격에 자기 테두리를 갖고 있어, 카드 안에 그대로 얹으면 된다.
 */
export type FeatureArtKey = "easy-mode" | "pathfinder" | "floui" | "xgen-dex";

const ART: Record<FeatureArtKey, (props: { locale?: Locale }) => React.ReactElement> = {
    "easy-mode": EasyModeArt,
    pathfinder: PathFinderArt,
    floui: FloUIArt,
    "xgen-dex": DexArt,
};

export function FeatureArt({ art, locale }: { art: FeatureArtKey; locale: Locale }) {
    const Art = ART[art];
    return <Art locale={locale} />;
}
