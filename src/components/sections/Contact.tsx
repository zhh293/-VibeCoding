'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { Mail, Phone, MapPin, Send, Github, Linkedin, Twitter, MessageCircle } from 'lucide-react'

export default function Contact() {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, margin: "-100px" })
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        // 这里可以添加表单提交逻辑
        console.log('Form submitted:', formData)
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const contactInfo = [
        {
            icon: Mail,
            title: '邮箱',
            value: 'your@email.com',
            href: 'mailto:your@email.com'
        },
        {
            icon: Phone,
            title: '电话',
            value: '+86 138 0000 0000',
            href: 'tel:+8613800000000'
        },
        {
            icon: MapPin,
            title: '位置',
            value: '北京市朝阳区',
            href: '#'
        }
    ]

    const socialLinks = [
        {
            icon: Github,
            name: 'GitHub',
            href: 'https://github.com/zhh293',
            color: 'hover:text-gray-900'
        },
        {
            icon: Linkedin,
            name: 'LinkedIn',
            href: 'https://linkedin.com',
            color: 'hover:text-blue-600'
        },
        {
            icon: Twitter,
            name: 'Twitter',
            href: 'https://twitter.com',
            color: 'hover:text-blue-400'
        }
    ]

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
                        联系我
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        有项目合作、技术交流或任何问题？欢迎随时联系我，我会尽快回复
                    </p>
                </motion.div>

                <div className="grid lg:grid-cols-2 gap-16">
                    {/* 联系信息 */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        <h3 className="text-2xl font-bold text-gray-900 mb-8">
                            联系方式
                        </h3>

                        {/* 联系信息卡片 */}
                        <div className="space-y-6 mb-8">
                            {contactInfo.map((info, index) => (
                                <motion.a
                                    key={info.title}
                                    href={info.href}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                                    transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                                    className="flex items-center p-4 rounded-lg border border-gray-200 hover:border-primary hover:shadow-md transition-all duration-300 group"
                                >
                                    <div className="p-3 rounded-full bg-primary/10 text-primary mr-4 group-hover:bg-primary group-hover:text-white transition-colors">
                                        <info.icon className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <div className="text-sm text-gray-500">{info.title}</div>
                                        <div className="font-medium text-gray-900 group-hover:text-primary transition-colors">
                                            {info.value}
                                        </div>
                                    </div>
                                </motion.a>
                            ))}
                        </div>

                        {/* 社交链接 */}
                        <div>
                            <h4 className="text-lg font-semibold text-gray-900 mb-4">
                                社交媒体
                            </h4>
                            <div className="flex space-x-4">
                                {socialLinks.map((social, index) => (
                                    <motion.a
                                        key={social.name}
                                        href={social.href}
                                        initial={{ opacity: 0, scale: 0 }}
                                        animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
                                        transition={{ duration: 0.3, delay: 0.8 + index * 0.1 }}
                                        className={`p-3 rounded-full bg-gray-100 text-gray-600 hover:bg-primary hover:text-white transition-all duration-300 hover:scale-110 ${social.color}`}
                                        aria-label={social.name}
                                    >
                                        <social.icon className="w-5 h-5" />
                                    </motion.a>
                                ))}
                            </div>
                        </div>

                        {/* 工作时间 */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                            transition={{ duration: 0.5, delay: 1 }}
                            className="mt-8 p-4 bg-gray-50 rounded-lg"
                        >
                            <h4 className="text-lg font-semibold text-gray-900 mb-2">
                                工作时间
                            </h4>
                            <p className="text-gray-600">
                                周一至周五：9:00 - 18:00
                                <br />
                                周末：10:00 - 16:00
                            </p>
                            <p className="text-sm text-gray-500 mt-2">
                                通常会在 24 小时内回复您的消息
                            </p>
                        </motion.div>
                    </motion.div>

                    {/* 联系表单 */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                    >
                        <h3 className="text-2xl font-bold text-gray-900 mb-8">
                            发送消息
                        </h3>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                                        姓名 *
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                                        placeholder="请输入您的姓名"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                        邮箱 *
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                                        placeholder="请输入您的邮箱"
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                                    主题 *
                                </label>
                                <input
                                    type="text"
                                    id="subject"
                                    name="subject"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                                    placeholder="请输入消息主题"
                                />
                            </div>

                            <div>
                                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                                    消息内容 *
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                    rows={6}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors resize-none"
                                    placeholder="请详细描述您的问题或需求..."
                                />
                            </div>

                            <motion.button
                                type="submit"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="w-full btn-primary group"
                            >
                                <Send className="w-4 h-4 mr-2 group-hover:translate-x-1 transition-transform" />
                                发送消息
                            </motion.button>
                        </form>

                        {/* 快速联系 */}
                        <div className="mt-8 p-4 bg-primary/5 rounded-lg">
                            <h4 className="text-lg font-semibold text-gray-900 mb-3">
                                快速联系
                            </h4>
                            <div className="flex flex-wrap gap-3">
                                <a
                                    href="mailto:your@email.com"
                                    className="inline-flex items-center px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                                >
                                    <Mail className="w-4 h-4 mr-2" />
                                    发送邮件
                                </a>
                                <a
                                    href="tel:+8613800000000"
                                    className="inline-flex items-center px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                                >
                                    <Phone className="w-4 h-4 mr-2" />
                                    拨打电话
                                </a>
                                <a
                                    href="#"
                                    className="inline-flex items-center px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                                >
                                    <MessageCircle className="w-4 h-4 mr-2" />
                                    在线聊天
                                </a>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}

