import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/layout/Navbar'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: '个人博客 - 现代化技术博客平台',
    description: '一个现代化、视觉震撼的个人博客平台，集内容管理、社交互动、个人品牌展示于一体',
    keywords: ['个人博客', '技术博客', '前端开发', 'React', 'Next.js'],
    authors: [{ name: 'Your Name' }],
    openGraph: {
        title: '个人博客 - 现代化技术博客平台',
        description: '一个现代化、视觉震撼的个人博客平台',
        type: 'website',
        locale: 'zh_CN',
    },
    twitter: {
        card: 'summary_large_image',
        title: '个人博客 - 现代化技术博客平台',
        description: '一个现代化、视觉震撼的个人博客平台',
    },
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="zh-CN">
            <body className={inter.className}>
                <Navbar />
                <main className="pt-24">
                    {children}
                </main>
            </body>
        </html>
    )
}

