/**
 * Plateer 워드마크 이미지 — 지급받은 자산을 그대로 렌더한다(가공하지 않음).
 *
 * alt 는 "Plateer" 까지만 담는다. 헤더는 이 이미지 옆에 "AI LABS", 푸터는
 * "Plateer AI Labs" 를 텍스트로 붙이므로, alt 에 브랜드 전체를 넣으면 화면
 * 낭독기가 이름을 두 번 읽는다.
 */
export function BrandMark({ className }: { className?: string }) {
    return (
        // eslint-disable-next-line @next/next/no-img-element
        <img
            src="/plateer-logo.png"
            alt="Plateer"
            className={className}
            style={{ objectFit: "contain" }}
        />
    );
}
