/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        appDir: true,
    },
    images: {
        domains: ['localhost'],
        formats: ['image/webp', 'image/avif'],
    },
    async headers() {
        return [
            {
                source: '/(.*)',
                headers: [
                    {
                        key: 'X-Frame-Options',
                        value: 'DENY',
                    },
                    {
                        key: 'X-Content-Type-Options',
                        value: 'nosniff',
                    },
                    {
                        key: 'Referrer-Policy',
                        value: 'origin-when-cross-origin',
                    },
                ],
            },
        ]
    },
}
const withMDX = require('@next/mdx')()

module.exports = withMDX({
    pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'], // 允许 MDX 作为页面
})

module.exports = nextConfig

