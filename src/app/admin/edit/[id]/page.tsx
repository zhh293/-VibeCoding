'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Save, Eye } from 'lucide-react'
import { getBlogPostsFromStorage, updateBlogPost, calculateReadTime, BlogPost, LOCAL_STORAGE_KEY, cleanupOldKeys } from '@/lib/blog-data'

export default function EditPostPage() {
    const router = useRouter()
    const params = useParams()
    const postId = params.id as string

    const [isLoading, setIsLoading] = useState(true)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [post, setPost] = useState<BlogPost | null>(null)
    const [error, setError] = useState<string | null>(null)
    const [formData, setFormData] = useState({
        title: '',
        excerpt: '',
        content: '',
        tags: '',
        featured: false
    })

    useEffect(() => {
        console.log(`Loading post for editing: ${postId}`)
        try {
            // 清理旧键名
            cleanupOldKeys()
            console.log(`Using localStorage key: ${LOCAL_STORAGE_KEY}`)
            
            const posts = getBlogPostsFromStorage()
            console.log(`Retrieved ${posts.length} posts from storage`)
            
            const foundPost = posts.find(p => p.id === postId)
            console.log(`Found post: ${foundPost ? 'Yes' : 'No'}`)

            if (!foundPost) {
                console.log('Post not found, redirecting to admin')
                router.push('/admin')
                return
            }

            setPost(foundPost)
            setFormData({
                title: foundPost.title,
                excerpt: foundPost.excerpt,
                content: foundPost.content,
                tags: foundPost.tags.join(', '),
                featured: foundPost.featured
            })
        } catch (err) {
            console.error('Error loading post for editing:', err)
            setError('加载文章失败')
        } finally {
            setIsLoading(false)
        }
    }, [postId, router])

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)
        setError(null)

        try {
            // 表单验证
            if (!formData.title.trim()) {
                setError('请输入文章标题')
                setIsSubmitting(false)
                return
            }
            
            if (!formData.excerpt.trim()) {
                setError('请输入文章摘要')
                setIsSubmitting(false)
                return
            }
            
            if (!formData.content.trim()) {
                setError('请输入文章内容')
                setIsSubmitting(false)
                return
            }

            const tags = formData.tags
                .split(',')
                .map(tag => tag.trim())
                .filter(tag => tag.length > 0)

            // 更新文章
            const updatedPost = updateBlogPost(postId, {
                title: formData.title.trim(),
                excerpt: formData.excerpt.trim(),
                content: formData.content.trim(),
                tags,
                featured: formData.featured,
                readTime: calculateReadTime(formData.content)
            })

            if (updatedPost) {
                console.log(`Post updated successfully, redirecting to: /blog/${updatedPost.slug}`)
                // 使用router.push确保更好的导航体验
                router.push(`/blog/${updatedPost.slug}`)
            } else {
                setError('更新文章时发生错误，请重试。可能是数据保存失败或文章已被删除。')
                // 提供重试按钮的提示
                setTimeout(() => {
                    console.log('Refreshing page data after failed update')
                    // 重新加载页面数据
                    const posts = getBlogPostsFromStorage()
                    const freshPost = posts.find(p => p.id === postId)
                    if (freshPost) {
                        setPost(freshPost)
                        setFormData({
                            title: freshPost.title,
                            excerpt: freshPost.excerpt,
                            content: freshPost.content,
                            tags: freshPost.tags.join(', '),
                            featured: freshPost.featured
                        })
                    } else {
                        setError('文章已不存在，正在返回管理页面...')
                        setTimeout(() => router.push('/admin'), 2000)
                    }
                }, 1000)
            }
        } catch (err) {
            console.error('Error updating post:', err)
            setError('更新文章时发生错误，请刷新页面后重试')
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

    if (!post) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">文章未找到</h2>
                    <Link 
                        href="/admin" 
                        className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        返回管理
                    </Link>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* 头部 */}
            <div className="bg-white border-b">
                <div className="container mx-auto px-4 py-6">
                    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                        <div className="flex items-center space-x-4">
                            <Link
                                href="/admin"
                                className="inline-flex items-center text-gray-600 hover:text-primary transition-colors group"
                            >
                                <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                                返回管理
                            </Link>
                            <h1 className="text-2xl font-bold text-gray-900">编辑文章</h1>
                        </div>
                        <div className="flex items-center space-x-3">
                            <Link
                                href={`/blog/${post.slug}`}
                                className="px-4 py-2 bg-gray-200 text-gray-800 font-medium rounded-lg hover:bg-gray-300 transition-colors inline-flex items-center"
                            >
                                <Eye className="w-4 h-4 mr-2" />
                                查看文章
                            </Link>
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
                                    保存中...
                                </>
                            ) : (
                                <>
                                    <Save className="w-4 h-4 mr-2" />
                                    保存更改
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
