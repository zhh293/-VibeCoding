'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { Code, Heart, Coffee, Users } from 'lucide-react'

export default function About() {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, margin: "-100px" })

    const stats = [
        { icon: Code, label: '代码行数', value: '50K+', color: 'text-blue-500' },
        { icon: Coffee, label: '咖啡杯数', value: '1000+', color: 'text-amber-500' },
        { icon: Heart, label: '项目热爱', value: '∞', color: 'text-red-500' },
        { icon: Users, label: '团队合作', value: '10+', color: 'text-green-500' },
    ]

    return (
        <section ref={ref} className="section-padding bg-white">
            <div className="container">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    {/* 左侧内容 */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
                            关于我
                        </h2>
                        <div className="space-y-4 text-lg text-gray-600 leading-relaxed">
                            <p>
                                我是一名充满热情的前端开发者，专注于创造现代化、用户友好的Web应用。
                                拥有多年的开发经验，擅长使用React、Next.js、TypeScript等现代技术栈。
                            </p>
                            <p>
                                我热爱学习新技术，喜欢挑战复杂的项目，并始终追求代码质量和用户体验的完美平衡。
                                在业余时间，我喜欢写技术博客，分享开发经验和心得体会。
                            </p>
                            <p>
                                我相信技术的力量能够改变世界，希望通过我的代码为用户创造价值，
                                为开发者社区贡献自己的力量。
                            </p>
                        </div>

                        {/* 技能标签 */}
                        <div className="mt-8">
                            <h3 className="text-xl font-semibold text-gray-900 mb-4">技术栈</h3>
                            <div className="flex flex-wrap gap-3">
                                {['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Node.js', 'MongoDB', 'Git', 'Docker'].map((skill) => (
                                    <span
                                        key={skill}
                                        className="px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium hover:bg-primary/20 transition-colors"
                                    >
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </motion.div>

                    {/* 右侧统计卡片 */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="grid grid-cols-2 gap-6"
                    >
                        {stats.map((stat, index) => (
                            <motion.div
                                key={stat.label}
                                initial={{ opacity: 0, y: 20 }}
                                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                                transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                                className="card text-center group hover:shadow-lg transition-all duration-300"
                            >
                                <div className={`inline-flex p-3 rounded-full bg-gray-50 mb-4 group-hover:scale-110 transition-transform ${stat.color}`}>
                                    <stat.icon className="w-6 h-6" />
                                </div>
                                <div className="text-3xl font-bold text-gray-900 mb-2">
                                    {stat.value}
                                </div>
                                <div className="text-sm text-gray-600">
                                    {stat.label}
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>

                {/* 时间线 */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="mt-20"
                >
                    <h3 className="text-2xl font-bold text-gray-900 text-center mb-12">
                        我的经历
                    </h3>
                    <div className="relative">
                        {/* 时间线 */}
                        <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-primary to-accent rounded-full" />

                        <div className="space-y-12">
                            {[
                                {
                                    year: '2024',
                                    title: '高级前端开发工程师',
                                    company: '科技公司',
                                    description: '负责大型企业级应用的前端架构设计和开发，带领团队完成多个重要项目。'
                                },
                                {
                                    year: '2022',
                                    title: '前端开发工程师',
                                    company: '互联网公司',
                                    description: '专注于React生态系统的开发，参与多个B端和C端产品的开发工作。'
                                },
                                {
                                    year: '2020',
                                    title: '初级前端开发工程师',
                                    company: '创业公司',
                                    description: '开始前端开发职业生涯，学习现代前端技术栈，参与多个项目的开发。'
                                }
                            ].map((item, index) => (
                                <div key={item.year} className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                                    <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                                        <div className="card group hover:shadow-lg transition-all duration-300">
                                            <div className="text-sm font-semibold text-primary mb-2">{item.year}</div>
                                            <h4 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h4>
                                            <div className="text-sm text-gray-600 mb-2">{item.company}</div>
                                            <p className="text-sm text-gray-500">{item.description}</p>
                                        </div>
                                    </div>
                                    <div className="w-4 h-4 bg-primary rounded-full border-4 border-white shadow-lg z-10" />
                                    <div className="w-1/2" />
                                </div>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}

