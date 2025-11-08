'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Calendar, Clock, ArrowRight, Tag, Settings } from 'lucide-react'
import { fetchPosts, BlogPost } from '@/lib/blog-api'

export default function BlogPage() {
    const [posts, setPosts] = useState<BlogPost[]>([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const loadPosts = async () => {
            try {
                console.log('Blog page loading posts...')
                const posts = await fetchPosts()
                console.log('Loaded posts count:', posts.length)
                setPosts(posts)
            } catch (e) {
                console.error('加载文章失败', e)
            } finally {
                setIsLoading(false)
            }
        }
        loadPosts()
        const interval = setInterval(loadPosts, 2000)
        return () => clearInterval(interval)
    }, [])

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">加载中...</p>
                </div>
            </div>
        )
    }

    const featuredPosts = posts.filter(post => post.featured)
    const recentPosts = posts.filter(post => !post.featured)

    return (
        <div className="min-h-screen bg-gray-50">
            {/* 页面头部 */}
            <div className="bg-white border-b">
                <div className="container mx-auto px-4 py-16">
                    <div className="max-w-3xl mx-auto text-center">
                        <div className="flex items-center justify-center mb-6">
                            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900">
                                技术博客
                            </h1>
                            <Link
                                href="/admin"
                                className="ml-4 p-2 text-gray-400 hover:text-blue-600 transition-colors"
                                title="管理文章"
                            >
                                <Settings className="w-6 h-6" />
                            </Link>
                        </div>
                        <p className="text-xl text-gray-600 leading-relaxed">
                            分享前端开发经验、技术见解和最佳实践，与开发者社区共同成长
                        </p>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-12">
                {/* 精选文章 */}
                <section className="mb-16">
                    <h2 className="text-3xl font-bold text-gray-900 mb-8">精选文章</h2>
                    <div className="grid lg:grid-cols-2 gap-8">
                        {featuredPosts.map((post) => (
                            <article key={post.slug} className="group">
                                <div className="card overflow-hidden hover:shadow-xl transition-all duration-300 group-hover:-translate-y-1">
                                    {/* 文章图片 */}
                                    <div className="relative overflow-hidden rounded-t-xl">
                                        <div className="aspect-video bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                                            <div className="text-6xl font-bold gradient-text opacity-50">
                                                {post.title.charAt(0)}
                                            </div>
                                        </div>
                                        <div className="absolute top-4 left-4">
                                            <span className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-sm font-medium text-gray-700">
                                                精选
                                            </span>
                                        </div>
                                    </div>

                                    {/* 文章内容 */}
                                    <div className="p-6">
                                        <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
                                            <div className="flex items-center">
                                                <Calendar className="w-4 h-4 mr-1" />
                                                {new Date(post.date).toLocaleDateString('zh-CN')}
                                            </div>
                                            <div className="flex items-center">
                                                <Clock className="w-4 h-4 mr-1" />
                                                {post.readTime}
                                            </div>
                                        </div>

                                        <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary transition-colors line-clamp-2">
                                            {post.title}
                                        </h3>

                                        <p className="text-gray-600 mb-4 leading-relaxed line-clamp-3">
                                            {post.excerpt}
                                        </p>

                                        {/* 标签 */}
                                        <div className="flex flex-wrap gap-2 mb-4">
                                            {post.tags.map((tag) => (
                                                <span
                                                    key={tag}
                                                    className="inline-flex items-center px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium hover:bg-primary/10 hover:text-primary transition-colors"
                                                >
                                                    <Tag className="w-3 h-3 mr-1" />
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>

                                        {/* 阅读更多 */}
                                        <Link
                                            href={`/blog/${post.slug}`}
                                            className="inline-flex items-center text-primary font-medium hover:text-primary-dark transition-colors group/link"
                                        >
                                            阅读全文
                                            <ArrowRight className="ml-2 w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                                        </Link>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>
                </section>

                {/* 最新文章 */}
                <section>
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-3xl font-bold text-gray-900">最新文章</h2>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {recentPosts.map((post) => (
                            <article key={post.slug} className="group">
                                <div className="card hover:shadow-lg transition-all duration-300 group-hover:-translate-y-1">
                                    {/* 文章图片 */}
                                    <div className="relative overflow-hidden rounded-t-lg mb-4">
                                        <div className="aspect-video bg-gradient-to-br from-secondary/20 to-accent/20 flex items-center justify-center">
                                            <div className="text-4xl font-bold text-secondary opacity-50">
                                                {post.title.charAt(0)}
                                            </div>
                                        </div>
                                    </div>

                                    {/* 文章内容 */}
                                    <div>
                                        <div className="flex items-center space-x-3 text-xs text-gray-500 mb-3">
                                            <div className="flex items-center">
                                                <Calendar className="w-3 h-3 mr-1" />
                                                {new Date(post.date).toLocaleDateString('zh-CN')}
                                            </div>
                                            <div className="flex items-center">
                                                <Clock className="w-3 h-3 mr-1" />
                                                {post.readTime}
                                            </div>
                                        </div>

                                        <h4 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors line-clamp-2">
                                            {post.title}
                                        </h4>

                                        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                                            {post.excerpt}
                                        </p>

                                        {/* 标签 */}
                                        <div className="flex flex-wrap gap-1 mb-3">
                                            {post.tags.slice(0, 2).map((tag) => (
                                                <span
                                                    key={tag}
                                                    className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs"
                                                >
                                                    {tag}
                                                </span>
                                            ))}
                                            {post.tags.length > 2 && (
                                                <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
                                                    +{post.tags.length - 2}
                                                </span>
                                            )}
                                        </div>

                                        <Link
                                            href={`/blog/${post.slug}`}
                                            className="inline-flex items-center text-sm text-primary font-medium hover:text-primary-dark transition-colors group/link"
                                        >
                                            阅读更多
                                            <ArrowRight className="ml-1 w-3 h-3 group-hover/link:translate-x-1 transition-transform" />
                                        </Link>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    )
}
