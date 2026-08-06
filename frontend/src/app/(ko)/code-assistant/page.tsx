import { CodeAssistantPageContent } from "@/components/pages/code-assistant-page";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
    title: "AI Code Assistant — 사내 코드베이스를 이해하는 코드 어시스턴트",
    description:
        "AI Code Assistant는 사내 코드·API·DB 스키마·산출물을 학습해 프로젝트 맥락에서 코드 수준으로 답하는 엔터프라이즈 코드 어시스턴트입니다. GitLab과 연동되고 온프레미스·폐쇄망에 설치돼 소스가 외부로 나가지 않습니다.",
    path: "/code-assistant",
});

export default function CodeAssistantPage() {
    return <CodeAssistantPageContent locale="ko" />;
}
