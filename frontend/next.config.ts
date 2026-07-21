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
    async redirects() {
        return [
            // 블로그를 /insights → /blog 로 이전 (SEO 손실 방지, 영구 리다이렉트).
            { source: '/insights', destination: '/blog', permanent: true },
            { source: '/demo', destination: '/contact', permanent: true },
            // 중복/스크래치 페이지 정리 — 단일 정식 경로로 영구 리다이렉트.
            { source: '/products', destination: '/product', permanent: true },
            { source: '/research-areas2', destination: '/research', permanent: true },
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
