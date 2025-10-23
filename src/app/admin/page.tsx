'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Plus, Edit, Trash2, Eye, ArrowLeft } from 'lucide-react'
import { BlogPost, getBlogPostsFromStorage, deleteBlogPost, LOCAL_STORAGE_KEY, cleanupOldKeys } from '@/lib/blog-data'

export default function AdminPage() {
    const [posts, setPosts] = useState<BlogPost[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        console.log('Admin page loading...')
        try {
            // 清理旧键名
            cleanupOldKeys()
            console.log(`Using localStorage key: ${LOCAL_STORAGE_KEY}`)
            const blogPosts = getBlogPostsFromStorage()
            console.log(`Retrieved ${blogPosts.length} posts`)
            setPosts(blogPosts)
        } catch (err) {
            console.error('Error loading posts:', err)
            setError('加载文章时出错')
        } finally {
            setIsLoading(false)
        }
    }, [])

    const handleDelete = (id: string) => {
        // 获取要删除的文章信息，用于显示更友好的提示
        const postToDelete = posts.find(post => post.id === id)
        const postTitle = postToDelete?.title || '这篇文章'
        
        if (confirm(`确定要删除文章 "${postTitle}" 吗？此操作无法撤销。`)) {
            try {
                // 添加一个临时状态，显示删除中
                console.log(`Deleting post: ${postTitle} (${id})`)
                
                const success = deleteBlogPost(id)
                
                if (success) {
                    // 更新文章列表
                    const updatedPosts = getBlogPostsFromStorage()
                    setPosts(updatedPosts)
                    
                    // 显示成功提示
                    alert(`文章 "${postTitle}" 已成功删除！`)
                } else {
                    // 显示失败提示
                    alert(`删除文章失败！可能是因为文章不存在或数据保存失败。请刷新页面后重试。`)
                    // 重新加载文章列表
                    setPosts(getBlogPostsFromStorage())
                }
            } catch (error) {
                console.error('Error during delete operation:', error)
                alert('删除文章时发生错误！请刷新页面后重试。')
            }
        }
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

    return (
        <div className="min-h-screen bg-gray-50">
                {/* 头部 */}
                <div className="bg-white border-b">
                    <div className="container mx-auto px-4 py-6">
                        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                            <div className="flex items-center space-x-4">
                                <Link
                                    href="/"
                                    className="inline-flex items-center text-gray-600 hover:text-blue-600 transition-colors group"
                                >
                                    <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                                    返回首页
                                </Link>
                                <h1 className="text-2xl font-bold text-gray-900">文章管理</h1>
                            </div>
                            <Link
                                href="/admin/new"
                                className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors inline-flex items-center"
                            >
                                <Plus className="w-4 h-4 mr-2" />
                                新建文章
                            </Link>
                        </div>
                    </div>
                </div>

                {/* 文章列表 */}
                <div className="container mx-auto px-4 py-8">
                {posts.length === 0 ? (
                    <div className="text-center py-12">
                            <div className="text-gray-400 mb-4">
                                <Edit className="w-16 h-16 mx-auto" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">还没有文章</h3>
                            <p className="text-gray-600 mb-6">开始创建您的第一篇文章吧！</p>
                            <Link 
                                href="/admin/new" 
                                className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
                            >
                                创建文章
                            </Link>
                        </div>
                ) : (
                    <div className="space-y-6">
                            {posts.map((post) => (
                                <div 
                                    key={post.id} 
                                    className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
                                >
                                <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
                    <div className="flex-1 mb-4 md:mb-0">
                        <div className="flex items-center space-x-3 mb-2 flex-wrap">
                            <h3 className="text-xl font-semibold text-gray-900">
                                {post.title}
                            </h3>
                            {post.featured && (
                                <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs font-medium rounded-full">
                                    精选
                                </span>
                            )}
                        </div>

                        <p className="text-gray-600 mb-3 line-clamp-2">
                            {post.excerpt}
                        </p>

                        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                            <span>{new Date(post.date).toLocaleDateString('zh-CN')}</span>
                            <span>{post.readTime}</span>
                            <div className="flex flex-wrap gap-1">
                                {post.tags.slice(0, 3).map((tag) => (
                                    <span
                                        key={tag}
                                        className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs"
                                    >
                                        {tag}
                                    </span>
                                ))}
                                {post.tags.length > 3 && (
                                    <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
                                        +{post.tags.length - 3}
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center space-x-2 ml-0 md:ml-4">
                        <Link
                            href={`/blog/${post.slug}`}
                            className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
                            title="查看文章"
                        >
                            <Eye className="w-4 h-4" />
                        </Link>
                        <Link
                            href={`/admin/edit/${post.id}`}
                            className="p-2 text-gray-400 hover:text-green-600 transition-colors"
                            title="编辑文章"
                        >
                            <Edit className="w-4 h-4" />
                        </Link>
                        <button
                            onClick={() => handleDelete(post.id)}
                            className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                            title="删除文章"
                        >
                            <Trash2 className="w-4 h-4" />
                        </button>
                    </div>
                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}
