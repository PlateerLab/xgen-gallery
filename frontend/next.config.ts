import type { NextConfig } from 'next';
import path from 'path';

const nextConfig: NextConfig = {
    output: 'standalone',
    outputFileTracingRoot: path.join(__dirname),
    eslint: { ignoreDuringBuilds: true },
    typescript: { ignoreBuildErrors: true },
    images: {
        remotePatterns: [
            { protocol: 'https', hostname: 'avatars.githubusercontent.com' },
        ],
    },
    async headers() {
        return [
            // 내부용 QA 콘솔 — 색인 금지. robots.txt는 "예의 바른" 봇만 막으므로
            // 헤더로도 못 박는다(robots.txt를 무시하고 크롤한 경우에도 색인 제외).
            {
                source: '/qa-console',
                headers: [
                    {
                        key: 'X-Robots-Tag',
                        value: 'noindex, nofollow, noarchive, nosnippet',
                    },
                ],
            },
            {
                source: '/qa-console/:path*',
                headers: [
                    {
                        key: 'X-Robots-Tag',
                        value: 'noindex, nofollow, noarchive, nosnippet',
                    },
                ],
            },
            // 내부용 어드민(Decap CMS · 서명 생성기) — 색인 금지.
            // robots.ts 의 PRIVATE_PATHS 는 '/admin/' 이라 '/admin' 정확히는
            // 걸리지 않으므로, 양쪽 source 를 모두 두어 헤더로 못 박는다.
            {
                source: '/admin',
                headers: [
                    {
                        key: 'X-Robots-Tag',
                        value: 'noindex, nofollow, noarchive, nosnippet',
                    },
                ],
            },
            {
                source: '/admin/:path*',
                headers: [
                    {
                        key: 'X-Robots-Tag',
                        value: 'noindex, nofollow, noarchive, nosnippet',
                    },
                ],
            },
            /*
              구성원 소개 — 실명·직함·사진이 한자리에 모이고, /members/<login>
              에는 개인 GitHub 계정까지 붙는다. 검색 결과에 띄우지 않는다.

              robots.txt 로 크롤을 막지는 않는다. 크롤러가 페이지를 못 읽으면
              이 헤더도 못 읽고, 외부 링크만으로 URL 이 결과에 남을 수 있다.
              읽게 두고 "색인하지 말라"고 말하는 쪽이 확실하다.

              /en/members 도 함께 걸어야 한다 — 별도 라우트다.
            */
            ...["/members", "/en/members"].flatMap((base) =>
                [base, `${base}/:path*`].map((source) => ({
                    source,
                    headers: [
                        {
                            key: 'X-Robots-Tag',
                            value: 'noindex, nofollow, noarchive, nosnippet',
                        },
                    ],
                })),
            ),
        ];
    },
    async redirects() {
        return [
            // 블로그를 /insights → /blog 로 이전 (SEO 손실 방지, 영구 리다이렉트).
            { source: '/insights', destination: '/blog', permanent: true },
            { source: '/demo', destination: '/contact', permanent: true },
            // 중복/스크래치 페이지 정리 — 단일 정식 경로로 영구 리다이렉트.
            { source: '/products', destination: '/product', permanent: true },
            { source: '/research-areas2', destination: '/research', permanent: true },
            // 고객 검토용 히든 프리뷰 → 정식 공개본(고객 컨펌 완료). 검토 단계에서
            // 고객사에 공유했던 URL이라 끊지 않고 정식 경로로 넘긴다.
            {
                source: '/preview/jeju-genai-9b7f2e4a',
                destination: '/customers/case/jeju-bank-genai-platform',
                permanent: true,
            },
        ];
    },
    async rewrites() {
        // 갤러리 데모 API를 same-origin(/gallery-api)으로 프록시한다. 브라우저는
        // 항상 자기 오리진을 호출하고, Next 서버가 GALLERY_API_ORIGIN(도커:
        // http://backend:8000, 로컬 dev: http://localhost:8800)으로 서버사이드
        // 프록시한다. 예전엔 클라이언트가 http://localhost:8800을 직접 쳐서
        // 원격 방문자 브라우저에선 방문자 본인 PC를 가리켜 데모가 전부 실패했다.
        const apiOrigin =
            process.env.GALLERY_API_ORIGIN || 'http://localhost:8800';
        return [
            // Decap CMS 어드민 — public/admin/index.html 을 /admin 클린 URL로 서빙.
            { source: '/admin', destination: '/admin/index.html' },
            { source: '/gallery-api/:path*', destination: `${apiOrigin}/:path*` },
        ];
    },
};

export default nextConfig;
