'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { ExternalLink, Github, Eye } from 'lucide-react'

export default function Projects() {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, margin: "-100px" })

    const projects = [
        {
            title: '现代化电商平台',
            description: '基于 Next.js 和 TypeScript 构建的全栈电商应用，集成支付、订单管理、用户系统等功能。',
            image: '/images/project-1.jpg',
            tags: ['Next.js', 'TypeScript', 'Tailwind CSS', 'MongoDB', 'Stripe'],
            github: 'https://github.com',
            demo: 'https://demo.com',
            featured: true
        },
        {
            title: '实时聊天应用',
            description: '使用 Socket.io 和 React 构建的实时聊天应用，支持群聊、私聊、文件分享等功能。',
            image: '/images/project-2.jpg',
            tags: ['React', 'Socket.io', 'Node.js', 'Express', 'MongoDB'],
            github: 'https://github.com',
            demo: 'https://demo.com',
            featured: true
        },
        {
            title: '任务管理工具',
            description: '类似 Trello 的任务管理工具，支持拖拽、标签、截止日期等功能。',
            image: '/images/project-3.jpg',
            tags: ['React', 'Redux', 'Material-UI', 'Node.js', 'PostgreSQL'],
            github: 'https://github.com',
            demo: 'https://demo.com',
            featured: false
        },
        {
            title: '天气应用',
            description: '美观的天气应用，支持多城市、天气预报、历史数据等功能。',
            image: '/images/project-4.jpg',
            tags: ['Vue.js', 'Vuex', 'OpenWeather API', 'PWA'],
            github: 'https://github.com',
            demo: 'https://demo.com',
            featured: false
        },
        {
            title: '博客系统',
            description: '个人博客系统，支持 Markdown 编辑、评论系统、SEO 优化等功能。',
            image: '/images/project-5.jpg',
            tags: ['Next.js', 'MDX', 'Contentful', 'Vercel'],
            github: 'https://github.com',
            demo: 'https://demo.com',
            featured: false
        },
        {
            title: '数据可视化仪表板',
            description: '企业级数据可视化仪表板，支持多种图表类型和实时数据更新。',
            image: '/images/project-6.jpg',
            tags: ['React', 'D3.js', 'Chart.js', 'Python', 'FastAPI'],
            github: 'https://github.com',
            demo: 'https://demo.com',
            featured: false
        }
    ]

    const featuredProjects = projects.filter(project => project.featured)
    const otherProjects = projects.filter(project => !project.featured)

    return (
        <section ref={ref} className="section-padding bg-white">
            <div className="container">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                        精选项目
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        以下是我参与开发的一些代表性项目，展示了我的技术能力和创新思维
                    </p>
                </motion.div>

                {/* 精选项目 */}
                <div className="grid lg:grid-cols-2 gap-8 mb-16">
                    {featuredProjects.map((project, index) => (
                        <motion.div
                            key={project.title}
                            initial={{ opacity: 0, y: 30 }}
                            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                            transition={{ duration: 0.6, delay: index * 0.2 }}
                            className="group"
                        >
                            <div className="card overflow-hidden hover:shadow-xl transition-all duration-300">
                                {/* 项目图片 */}
                                <div className="relative overflow-hidden rounded-t-xl">
                                    <div className="aspect-video bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                                        <div className="text-6xl font-bold gradient-text opacity-50">
                                            {project.title.charAt(0)}
                                        </div>
                                    </div>
                                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-4">
                                        <a
                                            href={project.github}
                                            className="p-3 bg-white rounded-full hover:scale-110 transition-transform"
                                            aria-label="查看源码"
                                        >
                                            <Github className="w-5 h-5 text-gray-700" />
                                        </a>
                                        <a
                                            href={project.demo}
                                            className="p-3 bg-white rounded-full hover:scale-110 transition-transform"
                                            aria-label="查看演示"
                                        >
                                            <ExternalLink className="w-5 h-5 text-gray-700" />
                                        </a>
                                    </div>
                                </div>

                                {/* 项目内容 */}
                                <div className="p-6">
                                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary transition-colors">
                                        {project.title}
                                    </h3>
                                    <p className="text-gray-600 mb-4 leading-relaxed">
                                        {project.description}
                                    </p>

                                    {/* 技术标签 */}
                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {project.tags.map((tag) => (
                                            <span
                                                key={tag}
                                                className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium hover:bg-primary/10 hover:text-primary transition-colors"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>

                                    {/* 操作按钮 */}
                                    <div className="flex space-x-4">
                                        <a
                                            href={project.github}
                                            className="flex items-center text-sm font-medium text-gray-700 hover:text-primary transition-colors"
                                        >
                                            <Github className="w-4 h-4 mr-2" />
                                            源码
                                        </a>
                                        <a
                                            href={project.demo}
                                            className="flex items-center text-sm font-medium text-gray-700 hover:text-primary transition-colors"
                                        >
                                            <Eye className="w-4 h-4 mr-2" />
                                            演示
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* 其他项目 */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                >
                    <h3 className="text-2xl font-bold text-gray-900 text-center mb-8">
                        更多项目
                    </h3>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {otherProjects.map((project, index) => (
                            <motion.div
                                key={project.title}
                                initial={{ opacity: 0, y: 30 }}
                                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                                transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                                className="group"
                            >
                                <div className="card hover:shadow-lg transition-all duration-300 group-hover:-translate-y-1">
                                    {/* 项目图片 */}
                                    <div className="relative overflow-hidden rounded-t-lg mb-4">
                                        <div className="aspect-video bg-gradient-to-br from-secondary/20 to-accent/20 flex items-center justify-center">
                                            <div className="text-4xl font-bold text-secondary opacity-50">
                                                {project.title.charAt(0)}
                                            </div>
                                        </div>
                                    </div>

                                    {/* 项目内容 */}
                                    <div>
                                        <h4 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors">
                                            {project.title}
                                        </h4>
                                        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                                            {project.description}
                                        </p>

                                        {/* 技术标签 */}
                                        <div className="flex flex-wrap gap-1 mb-3">
                                            {project.tags.slice(0, 3).map((tag) => (
                                                <span
                                                    key={tag}
                                                    className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs"
                                                >
                                                    {tag}
                                                </span>
                                            ))}
                                            {project.tags.length > 3 && (
                                                <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
                                                    +{project.tags.length - 3}
                                                </span>
                                            )}
                                        </div>

                                        {/* 操作按钮 */}
                                        <div className="flex space-x-3">
                                            <a
                                                href={project.github}
                                                className="flex items-center text-xs text-gray-500 hover:text-primary transition-colors"
                                            >
                                                <Github className="w-3 h-3 mr-1" />
                                                源码
                                            </a>
                                            <a
                                                href={project.demo}
                                                className="flex items-center text-xs text-gray-500 hover:text-primary transition-colors"
                                            >
                                                <ExternalLink className="w-3 h-3 mr-1" />
                                                演示
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* 查看更多按钮 */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                    transition={{ duration: 0.8, delay: 1 }}
                    className="text-center mt-12"
                >
                    <button className="btn-primary group">
                        查看更多项目
                        <ExternalLink className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                </motion.div>
            </div>
        </section>
    )
}

