import { HomePageContent } from "@/components/pages/home-page";

// 라이브러리 수처럼 자주 바뀌는 메인 콘텐츠가 배포 전 HTML 캐시에 오래
// 남지 않게 한다. 실제 숫자는 HomePageContent가 TOOLS.length에서 가져온다.
export const revalidate = 300;

export default function Home() {
    return <HomePageContent locale="ko" />;
}
