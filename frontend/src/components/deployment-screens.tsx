import Image from "next/image";
import type { Locale } from "@/lib/i18n";

export function DeploymentScreens({ locale }: { locale: Locale }) {
    const en = locale === "en";
    return (
        <figure data-deployment-screens>
            <div className="relative w-[94%] overflow-hidden rounded-xl border border-[var(--color-line)] bg-white shadow-[0_18px_44px_-28px_rgba(20,40,80,0.28)]">
                <p className="bg-[var(--color-surface-alt)] px-4 py-3 text-[13.5px] font-bold text-[var(--color-ink)]">
                    {en ? "01 · Agent deployment" : "01 · 에이전트 배포"}
                </p>
                <Image
                    src="/product/screen-approval.png"
                    alt={en ? "XGEN agent deployment settings" : "XGEN 에이전트 배포 설정 화면"}
                    width={1904}
                    height={892}
                    sizes="(max-width: 1024px) 94vw, 520px"
                    className="h-auto w-full"
                />
                <div className="h-24" aria-hidden="true" />
            </div>
            <div className="relative z-10 -mt-24 ml-auto w-[58%] overflow-hidden rounded-xl border border-[var(--color-line)] bg-white shadow-[0_18px_44px_-24px_rgba(20,40,80,0.36)]">
                <p className="bg-[var(--color-surface-alt)] px-4 py-3 text-[13.5px] font-bold text-[var(--color-ink)]">
                    {en ? "02 · App deployment server" : "02 · 앱 배포 서버 등록"}
                </p>
                <Image
                    src="/product/app-deploy-server.png"
                    alt={en ? "XGEN app deployment server registration with app connection method and domain settings" : "XGEN 앱 배포 서버 등록 화면 — 앱 연결 방식과 앱 도메인, 배포 허용 설정"}
                    width={632}
                    height={747}
                    sizes="(max-width: 1024px) 58vw, 320px"
                    className="h-auto w-full"
                />
            </div>
            <figcaption className="mt-4 text-center text-[11px] text-[var(--color-ink-muted)]">
                {en ? "Actual product screens · Available options can vary by configuration" : "실제 제품 화면 · 구성에 따라 제공 항목이 달라질 수 있습니다"}
            </figcaption>
        </figure>
    );
}
