'use client'

import { motion } from 'framer-motion'
import { ArrowDown, Github, Linkedin, Mail, Twitter } from 'lucide-react'

export default function Hero() {
    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
            {/* 背景装饰 */}
            <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />

            {/* 粒子背景 */}
            <div className="absolute inset-0">
                <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-primary rounded-full animate-pulse" />
                <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-accent rounded-full animate-pulse delay-1000" />
                <div className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 bg-secondary rounded-full animate-pulse delay-500" />
                <div className="absolute bottom-1/3 right-1/4 w-1 h-1 bg-primary rounded-full animate-pulse delay-700" />
            </div>

            <div className="container relative z-10">
                <div className="text-center">
                    {/* 头像 */}
                    <motion.div
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="mb-8"
                    >
                        <div className="relative inline-block">
                            <div className="w-32 h-32 rounded-full bg-gradient-to-r from-primary to-accent p-1">
                                <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
                                    <div className="w-28 h-28 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center text-4xl font-bold gradient-text">
                                        Y
                                    </div>
                                </div>
                            </div>
                            <div className="absolute -top-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                                <div className="w-3 h-3 bg-white rounded-full animate-pulse" />
                            </div>
                        </div>
                    </motion.div>

                    {/* 标题 */}
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6"
                    >
                        <span className="gradient-text">你好，我是</span>
                        <br />
                        <span className="text-gray-900">开发者</span>
                    </motion.h1>

                    {/* 副标题 */}
                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="text-xl sm:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto"
                    >
                        专注于现代化前端开发，热爱创造优雅的用户体验
                        <br />
                        <span className="text-lg text-gray-500">React • Next.js • TypeScript • Tailwind CSS</span>
                    </motion.p>

                    {/* 社交链接 */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                        className="flex justify-center space-x-6 mb-12"
                    >
                        <a
                            href="https://github.com"
                            className="p-3 rounded-full bg-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
                            aria-label="GitHub"
                        >
                            <Github className="w-6 h-6 text-gray-700" />
                        </a>
                        <a
                            href="https://linkedin.com"
                            className="p-3 rounded-full bg-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
                            aria-label="LinkedIn"
                        >
                            <Linkedin className="w-6 h-6 text-gray-700" />
                        </a>
                        <a
                            href="https://twitter.com"
                            className="p-3 rounded-full bg-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
                            aria-label="Twitter"
                        >
                            <Twitter className="w-6 h-6 text-gray-700" />
                        </a>
                        <a
                            href="mailto:your@email.com"
                            className="p-3 rounded-full bg-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
                            aria-label="Email"
                        >
                            <Mail className="w-6 h-6 text-gray-700" />
                        </a>
                    </motion.div>

                    {/* CTA 按钮 */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.8 }}
                        className="flex flex-col sm:flex-row gap-4 justify-center"
                    >
                        <button className="btn-primary group">
                            查看我的作品
                            <ArrowDown className="ml-2 w-4 h-4 group-hover:translate-y-1 transition-transform" />
                        </button>
                        <button className="btn-secondary">
                            联系我
                        </button>
                    </motion.div>
                </div>
            </div>

            {/* 滚动指示器 */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 1.2 }}
                className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
            >
                <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="flex flex-col items-center text-gray-500"
                >
                    <span className="text-sm mb-2">向下滚动</span>
                    <ArrowDown className="w-5 h-5" />
                </motion.div>
            </motion.div>
        </section>
    )
}

