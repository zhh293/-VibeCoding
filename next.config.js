/** @type {import('next').NextConfig} */
const nextConfig = {
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
    pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'], // 允许 MDX 作为页面
}

// 移除重复的module.exports并正确配置MDX
const withMDX = require('@next/mdx')()

module.exports = withMDX(nextConfig)

