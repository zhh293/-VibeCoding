'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import {
    Code2,
    Palette,
    Database,
    Smartphone,
    Globe,
    Zap,
    GitBranch,
    Shield,
    Layers
} from 'lucide-react'

export default function Skills() {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, margin: "-100px" })

    const skillCategories = [
        {
            title: '前端开发',
            icon: Code2,
            color: 'from-blue-500 to-cyan-500',
            skills: [
                { name: 'React', level: 95 },
                { name: 'Next.js', level: 90 },
                { name: 'TypeScript', level: 88 },
                { name: 'JavaScript', level: 92 },
                { name: 'HTML/CSS', level: 95 },
                { name: 'Tailwind CSS', level: 90 },
            ]
        },
        {
            title: 'UI/UX 设计',
            icon: Palette,
            color: 'from-purple-500 to-pink-500',
            skills: [
                { name: 'Figma', level: 85 },
                { name: 'Adobe XD', level: 80 },
                { name: 'Sketch', level: 75 },
                { name: 'Photoshop', level: 70 },
                { name: 'Illustrator', level: 65 },
                { name: 'Principle', level: 60 },
            ]
        },
        {
            title: '后端开发',
            icon: Database,
            color: 'from-green-500 to-emerald-500',
            skills: [
                { name: 'Node.js', level: 85 },
                { name: 'Express', level: 80 },
                { name: 'MongoDB', level: 75 },
                { name: 'PostgreSQL', level: 70 },
                { name: 'Redis', level: 65 },
                { name: 'GraphQL', level: 60 },
            ]
        },
        {
            title: '移动开发',
            icon: Smartphone,
            color: 'from-orange-500 to-red-500',
            skills: [
                { name: 'React Native', level: 80 },
                { name: 'Flutter', level: 70 },
                { name: 'Swift', level: 60 },
                { name: 'Kotlin', level: 55 },
                { name: 'PWA', level: 85 },
                { name: 'Ionic', level: 65 },
            ]
        },
        {
            title: '工具 & 平台',
            icon: Globe,
            color: 'from-indigo-500 to-purple-500',
            skills: [
                { name: 'Git', level: 90 },
                { name: 'Docker', level: 75 },
                { name: 'AWS', level: 70 },
                { name: 'Vercel', level: 85 },
                { name: 'Netlify', level: 80 },
                { name: 'CI/CD', level: 75 },
            ]
        },
        {
            title: '性能优化',
            icon: Zap,
            color: 'from-yellow-500 to-orange-500',
            skills: [
                { name: 'Webpack', level: 80 },
                { name: 'Vite', level: 85 },
                { name: 'Lighthouse', level: 90 },
                { name: 'Core Web Vitals', level: 85 },
                { name: 'CDN', level: 75 },
                { name: 'Caching', level: 80 },
            ]
        }
    ]

    const additionalSkills = [
        { icon: GitBranch, name: '版本控制', description: 'Git, GitHub, GitLab' },
        { icon: Shield, name: '安全', description: 'OAuth, JWT, HTTPS' },
        { icon: Layers, name: '架构设计', description: '微服务, 组件化' },
    ]

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
                        技能专长
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        掌握多种现代技术栈，具备全栈开发能力，专注于创造高质量的用户体验
                    </p>
                </motion.div>

                {/* 技能分类网格 */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                    {skillCategories.map((category, categoryIndex) => (
                        <motion.div
                            key={category.title}
                            initial={{ opacity: 0, y: 30 }}
                            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                            transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
                            className="card group hover:shadow-lg transition-all duration-300"
                        >
                            <div className="flex items-center mb-6">
                                <div className={`p-3 rounded-lg bg-gradient-to-r ${category.color} mr-4 group-hover:scale-110 transition-transform`}>
                                    <category.icon className="w-6 h-6 text-white" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900">{category.title}</h3>
                            </div>

                            <div className="space-y-4">
                                {category.skills.map((skill, skillIndex) => (
                                    <div key={skill.name}>
                                        <div className="flex justify-between items-center mb-2">
                                            <span className="text-sm font-medium text-gray-700">{skill.name}</span>
                                            <span className="text-sm text-gray-500">{skill.level}%</span>
                                        </div>
                                        <div className="w-full bg-gray-200 rounded-full h-2">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                animate={isInView ? { width: `${skill.level}%` } : { width: 0 }}
                                                transition={{ duration: 1, delay: 0.5 + categoryIndex * 0.1 + skillIndex * 0.05 }}
                                                className={`h-2 rounded-full bg-gradient-to-r ${category.color}`}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* 额外技能 */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="text-center"
                >
                    <h3 className="text-2xl font-bold text-gray-900 mb-8">其他技能</h3>
                    <div className="grid md:grid-cols-3 gap-6">
                        {additionalSkills.map((skill, index) => (
                            <motion.div
                                key={skill.name}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                                className="card text-center group hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                            >
                                <div className="inline-flex p-4 rounded-full bg-primary/10 text-primary mb-4 group-hover:scale-110 transition-transform">
                                    <skill.icon className="w-8 h-8" />
                                </div>
                                <h4 className="text-lg font-bold text-gray-900 mb-2">{skill.name}</h4>
                                <p className="text-sm text-gray-600">{skill.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* 技能统计 */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                    transition={{ duration: 0.8, delay: 1 }}
                    className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8"
                >
                    {[
                        { number: '5+', label: '年开发经验' },
                        { number: '50+', label: '完成项目' },
                        { number: '20+', label: '技术栈' },
                        { number: '100%', label: '客户满意度' },
                    ].map((stat, index) => (
                        <div key={stat.label} className="text-center">
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={isInView ? { scale: 1 } : { scale: 0 }}
                                transition={{ duration: 0.5, delay: 1.2 + index * 0.1 }}
                                className="text-3xl font-bold gradient-text mb-2"
                            >
                                {stat.number}
                            </motion.div>
                            <div className="text-sm text-gray-600">{stat.label}</div>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    )
}

