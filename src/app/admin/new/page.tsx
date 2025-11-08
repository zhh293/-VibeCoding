'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Save, Eye } from 'lucide-react'
import { createPost, calculateReadTime } from '@/lib/blog-api'

export default function NewPostPage() {
    const router = useRouter()
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [formData, setFormData] = useState({
        title: '',
        excerpt: '',
        content: '',
        tags: '',
        featured: false
    })

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)
        setError(null)

        try {
            const tags = formData.tags
                .split(',')
                .map(tag => tag.trim())
                .filter(tag => tag.length > 0)

            const newPost = await createPost({
                title: formData.title,
                excerpt: formData.excerpt,
                content: formData.content,
                tags,
                featured: formData.featured,
            })

            console.log('New post created with slug:', newPost.slug)
            window.location.href = `/blog/${newPost.slug}`
        } catch (err) {
            console.error('Error creating post:', err)
            setError('创建文章时发生错误，请重试')
        } finally {
            setIsSubmitting(false)
        }
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
        }))
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="text-red-500 mb-4">❌</div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">{error}</h2>
                    <p className="text-gray-600 mb-6">请刷新页面重试</p>
                    <button 
                        onClick={() => window.location.reload()} 
                        className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        刷新页面
                    </button>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* 头部 */}
            <div className="bg-white border-b">
                <div className="container mx-auto px-4 py-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <Link
                                href="/admin"
                                className="inline-flex items-center text-gray-600 hover:text-primary transition-colors group"
                            >
                                <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                                返回管理
                            </Link>
                            <h1 className="text-2xl font-bold text-gray-900">新建文章</h1>
                        </div>
                        <div className="flex items-center space-x-3">
                            <button
                                type="button"
                                onClick={() => {
                                    // 预览功能 - 可以打开新窗口预览
                                    const previewWindow = window.open('', '_blank')
                                    if (previewWindow) {
                                        previewWindow.document.write(`
                                            <html>
                                                <head>
                                                    <title>${formData.title || '预览'}</title>
                                                    <style>
                                                        body { font-family: system-ui, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; }
                                                        h1 { color: #1f2937; }
                                                        .excerpt { color: #6b7280; font-size: 1.1em; margin: 20px 0; }
                                                        .content { line-height: 1.6; }
                                                    </style>
                                                </head>
                                                <body>
                                                    <h1>${formData.title || '文章标题'}</h1>
                                                    <div class="excerpt">${formData.excerpt || '文章摘要'}</div>
                                                    <div class="content">${formData.content.replace(/\n/g, '<br>') || '文章内容'}</div>
                                                </body>
                                            </html>
                                        `)
                                    }
                                }}
                                className="px-4 py-2 bg-gray-200 text-gray-800 font-medium rounded-lg hover:bg-gray-300 transition-colors inline-flex items-center"
                            >
                                <Eye className="w-4 h-4 mr-2" />
                                预览
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* 表单 */}
            <div className="container mx-auto px-4 py-8">
                <form onSubmit={handleSubmit} className="max-w-4xl mx-auto space-y-6">
                    {/* 标题 */}
                    <div>
                        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                            文章标题 *
                        </label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            value={formData.title}
                            onChange={handleInputChange}
                            required
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="输入文章标题"
                        />
                    </div>

                    {/* 摘要 */}
                    <div>
                        <label htmlFor="excerpt" className="block text-sm font-medium text-gray-700 mb-2">
                            文章摘要 *
                        </label>
                        <textarea
                            id="excerpt"
                            name="excerpt"
                            value={formData.excerpt}
                            onChange={handleInputChange}
                            required
                            rows={3}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="输入文章摘要，用于在列表中显示"
                        />
                    </div>

                    {/* 标签 */}
                    <div>
                        <label htmlFor="tags" className="block text-sm font-medium text-gray-700 mb-2">
                            标签
                        </label>
                        <input
                            type="text"
                            id="tags"
                            name="tags"
                            value={formData.tags}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="输入标签，用逗号分隔（如：React, JavaScript, 前端）"
                        />
                        <p className="text-sm text-gray-500 mt-1">
                            多个标签请用逗号分隔
                        </p>
                    </div>

                    {/* 精选文章 */}
                    <div className="flex items-center">
                        <input
                            type="checkbox"
                            id="featured"
                            name="featured"
                            checked={formData.featured}
                            onChange={handleInputChange}
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                        <label htmlFor="featured" className="ml-2 block text-sm text-gray-700">
                            设为精选文章
                        </label>
                    </div>

                    {/* 内容 */}
                    <div>
                        <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">
                            文章内容 *
                        </label>
                        <textarea
                            id="content"
                            name="content"
                            value={formData.content}
                            onChange={handleInputChange}
                            required
                            rows={20}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-sm"
                            placeholder="输入文章内容，支持 Markdown 格式"
                        />
                        <p className="text-sm text-gray-500 mt-1">
                            支持 Markdown 格式，包括标题、代码块、列表等
                        </p>
                    </div>

                    {/* 提交按钮 */}
                    <div className="flex items-center justify-end space-x-4 pt-6 border-t">
                        <Link
                            href="/admin"
                            className="px-4 py-2 bg-gray-200 text-gray-800 font-medium rounded-lg hover:bg-gray-300 transition-colors"
                        >
                            取消
                        </Link>
                        <button
                            type="submit"
                            disabled={isSubmitting || !formData.title || !formData.excerpt || !formData.content}
                            className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors inline-flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isSubmitting ? (
                                <>
                                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                    创建中...
                                </>
                            ) : (
                                <>
                                    <Save className="w-4 h-4 mr-2" />
                                    创建文章
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
