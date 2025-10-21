'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { Calendar, Clock, ArrowRight, Tag } from 'lucide-react'

export default function Blog() {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, margin: "-100px" })

    const blogPosts = [
        {
            title: '深入理解 React 18 并发特性',
            excerpt: '探索 React 18 的并发渲染、Suspense 和自动批处理等新特性，以及如何在实际项目中应用这些功能。',
            date: '2024-01-15',
            readTime: '8 分钟',
            tags: ['React', 'JavaScript', '前端'],
            image: '/images/blog-1.jpg',
            slug: 'react-18-concurrent-features',
            featured: true
        },
        {
            title: 'Next.js 14 新特性详解',
            excerpt: '全面解析 Next.js 14 的 App Router、Server Components 和性能优化等新功能。',
            date: '2024-01-10',
            readTime: '6 分钟',
            tags: ['Next.js', 'React', '全栈'],
            image: '/images/blog-2.jpg',
            slug: 'nextjs-14-new-features',
            featured: true
        },
        {
            title: 'TypeScript 高级类型技巧',
            excerpt: '学习 TypeScript 的高级类型系统，包括条件类型、映射类型和模板字面量类型。',
            date: '2024-01-05',
            readTime: '10 分钟',
            tags: ['TypeScript', 'JavaScript', '类型系统'],
            image: '/images/blog-3.jpg',
            slug: 'typescript-advanced-types',
            featured: false
        },
        {
            title: 'Tailwind CSS 最佳实践',
            excerpt: '分享使用 Tailwind CSS 构建现代 Web 应用的最佳实践和设计模式。',
            date: '2024-01-01',
            readTime: '5 分钟',
            tags: ['CSS', 'Tailwind', '设计系统'],
            image: '/images/blog-4.jpg',
            slug: 'tailwind-css-best-practices',
            featured: false
        },
        {
            title: 'Web 性能优化指南',
            excerpt: '从 Core Web Vitals 到实际优化技巧，全面提升网站性能和用户体验。',
            date: '2023-12-28',
            readTime: '12 分钟',
            tags: ['性能优化', 'Web Vitals', '用户体验'],
            image: '/images/blog-5.jpg',
            slug: 'web-performance-optimization',
            featured: false
        },
        {
            title: '现代前端工程化实践',
            excerpt: '探讨现代前端开发中的工程化实践，包括构建工具、代码质量和部署流程。',
            date: '2023-12-25',
            readTime: '9 分钟',
            tags: ['工程化', '构建工具', 'DevOps'],
            image: '/images/blog-6.jpg',
            slug: 'modern-frontend-engineering',
            featured: false
        }
    ]

    const featuredPosts = blogPosts.filter(post => post.featured)
    const recentPosts = blogPosts.filter(post => !post.featured).slice(0, 3)

    return (
        <section ref={ref} className="section-padding bg-gray-50">
            <div className="container">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                        技术博客
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        分享前端开发经验、技术见解和最佳实践，与开发者社区共同成长
                    </p>
                </motion.div>

                {/* 精选文章 */}
                <div className="grid lg:grid-cols-2 gap-8 mb-16">
                    {featuredPosts.map((post, index) => (
                        <motion.article
                            key={post.slug}
                            initial={{ opacity: 0, y: 30 }}
                            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                            transition={{ duration: 0.6, delay: index * 0.2 }}
                            className="group"
                        >
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
                                    <a
                                        href={`/blog/${post.slug}`}
                                        className="inline-flex items-center text-primary font-medium hover:text-primary-dark transition-colors group/link"
                                    >
                                        阅读全文
                                        <ArrowRight className="ml-2 w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                                    </a>
                                </div>
                            </div>
                        </motion.article>
                    ))}
                </div>

                {/* 最新文章 */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                >
                    <div className="flex items-center justify-between mb-8">
                        <h3 className="text-2xl font-bold text-gray-900">最新文章</h3>
                        <a
                            href="/blog"
                            className="text-primary hover:text-primary-dark font-medium flex items-center group"
                        >
                            查看全部
                            <ArrowRight className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </a>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {recentPosts.map((post, index) => (
                            <motion.article
                                key={post.slug}
                                initial={{ opacity: 0, y: 30 }}
                                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                                transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                                className="group"
                            >
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

                                        <a
                                            href={`/blog/${post.slug}`}
                                            className="inline-flex items-center text-sm text-primary font-medium hover:text-primary-dark transition-colors group/link"
                                        >
                                            阅读更多
                                            <ArrowRight className="ml-1 w-3 h-3 group-hover/link:translate-x-1 transition-transform" />
                                        </a>
                                    </div>
                                </div>
                            </motion.article>
                        ))}
                    </div>
                </motion.div>

                {/* 订阅按钮 */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                    transition={{ duration: 0.8, delay: 1 }}
                    className="text-center mt-16"
                >
                    <div className="card max-w-2xl mx-auto">
                        <h3 className="text-xl font-bold text-gray-900 mb-4">
                            订阅我的博客
                        </h3>
                        <p className="text-gray-600 mb-6">
                            获取最新的技术文章和开发心得，与开发者社区保持同步
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                            <input
                                type="email"
                                placeholder="输入您的邮箱地址"
                                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                            />
                            <button className="btn-primary whitespace-nowrap">
                                立即订阅
                            </button>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}

