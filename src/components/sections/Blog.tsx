'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import { Calendar, Clock, ArrowRight, Tag } from 'lucide-react'
import { getBlogPosts, BlogPost } from '@/lib/blog-data'

export default function Blog() {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, margin: "-100px" })
    const [posts, setPosts] = useState<BlogPost[]>([])

    useEffect(() => {
        setPosts(getBlogPosts())
    }, [])

    const featuredPosts = posts.filter(post => post.featured)
    const recentPosts = posts.filter(post => !post.featured).slice(0, 3)

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

