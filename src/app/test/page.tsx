'use client'

import { useState, useEffect } from 'react'
import { BlogPost, addBlogPost as addBlogPostUtil, getBlogPostBySlugFromStorage, LOCAL_STORAGE_KEY, cleanupOldKeys } from '@/lib/blog-data'

export default function TestPage() {
  const [localStorageData, setLocalStorageData] = useState<string | null>(null)
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([])
  const [testSlug, setTestSlug] = useState<string>('')
  const [foundPost, setFoundPost] = useState<BlogPost | null>(null)
  const [searchError, setSearchError] = useState<string>('')
  const [newPostTitle, setNewPostTitle] = useState<string>('测试文章 ' + new Date().toLocaleString())
  const [newPostContent, setNewPostContent] = useState<string>('# 测试文章\n\n这是一篇测试文章，用于调试文章存储功能。')
  const [newPostSummary, setNewPostSummary] = useState<string>('这是测试文章的摘要')
  const [newPostTags, setNewPostTags] = useState<string>('测试,调试')
  const [createResult, setCreateResult] = useState<string>('')

  // 使用从blog-data.ts导出的统一localStorage键名

  // 刷新localStorage数据
  const refreshLocalStorageData = () => {
    if (typeof window !== 'undefined') {
      console.log('刷新localStorage数据，使用键名:', LOCAL_STORAGE_KEY)
      const rawData = localStorage.getItem(LOCAL_STORAGE_KEY)
      setLocalStorageData(rawData)
      
      if (rawData) {
        try {
          const posts = JSON.parse(rawData)
          console.log('找到文章数量:', posts.length)
          setBlogPosts(posts)
        } catch (error) {
          console.error('解析localStorage数据失败:', error)
        }
      } else {
        console.log(`localStorage中没有${LOCAL_STORAGE_KEY}数据`)
        setBlogPosts([])
      }
    }
  }

  useEffect(() => {
    // 首先清理旧的localStorage键名并迁移数据
    cleanupOldKeys()
    console.log(`测试页面使用localStorage键名: ${LOCAL_STORAGE_KEY}`)
    refreshLocalStorageData()
  }, [])

  // 清空localStorage
  const clearLocalStorage = () => {
    if (typeof window !== 'undefined') {
      console.log('清空localStorage...')
      localStorage.removeItem(LOCAL_STORAGE_KEY)
      // 同时清理可能存在的旧键名
      if (localStorage.getItem('blog-posts')) {
        console.log('发现并清理旧键名: blog-posts')
        localStorage.removeItem('blog-posts')
      }
      refreshLocalStorageData()
      alert('localStorage已清空')
    }
  }

  // 搜索文章
  const searchPostBySlug = () => {
    if (!testSlug.trim()) {
      setSearchError('请输入slug')
      return
    }
    
    setSearchError('')
    console.log(`搜索文章，slug: ${testSlug}`)
    
    try {
      const post = getBlogPostBySlugFromStorage(testSlug)
      if (post) {
        console.log('找到文章:', post.title)
        setFoundPost(post)
      } else {
        console.log('未找到文章')
        setFoundPost(null)
        setSearchError('未找到文章')
      }
    } catch (error) {
      console.error('搜索文章出错:', error)
      setSearchError('搜索出错: ' + (error as Error).message)
    }
  }

  // 创建测试文章
  const createTestPost = () => {
    try {
      console.log('创建测试文章...')
      const tagsArray = newPostTags.split(',').map(tag => tag.trim()).filter(Boolean)
      
      const newPost = addBlogPostUtil({
        title: newPostTitle,
        content: newPostContent,
        summary: newPostSummary,
        tags: tagsArray
      })
      
      console.log('文章创建成功:', newPost)
      setCreateResult(`文章创建成功！Slug: ${newPost.slug}`)
      
      // 刷新文章列表
      refreshLocalStorageData()
    } catch (error) {
      console.error('创建文章失败:', error)
      setCreateResult('创建失败: ' + (error as Error).message)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">文章存储调试页面</h1>
      
      {/* 创建测试文章区域 */}
      <div className="mb-8 p-6 bg-blue-50 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">1. 创建测试文章</h2>
        <div className="space-y-4">
          <input
            type="text"
            value={newPostTitle}
            onChange={(e) => setNewPostTitle(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="文章标题"
          />
          <textarea
            value={newPostSummary}
            onChange={(e) => setNewPostSummary(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="文章摘要"
            rows={2}
          />
          <input
            type="text"
            value={newPostTags}
            onChange={(e) => setNewPostTags(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="标签，用逗号分隔"
          />
          <textarea
            value={newPostContent}
            onChange={(e) => setNewPostContent(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="文章内容（Markdown格式）"
            rows={4}
          />
          <button
            onClick={createTestPost}
            className="px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
          >
            创建测试文章
          </button>
          {createResult && (
            <div className={`p-3 rounded-md ${createResult.includes('失败') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
              {createResult}
            </div>
          )}
        </div>
      </div>

      {/* 搜索文章区域 */}
      <div className="mb-8 p-6 bg-purple-50 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">2. 搜索文章</h2>
        <div className="space-y-4">
          <div className="flex gap-2">
            <input
              type="text"
              value={testSlug}
              onChange={(e) => setTestSlug(e.target.value)}
              className="flex-1 p-2 border rounded"
              placeholder="输入文章slug"
            />
            <button
              onClick={searchPostBySlug}
              className="px-4 py-2 bg-purple-500 text-white rounded-md hover:bg-purple-600"
            >
              搜索
            </button>
          </div>
          {searchError && (
            <div className="p-3 bg-red-100 text-red-700 rounded-md">
              {searchError}
            </div>
          )}
          {foundPost && (
            <div className="p-4 bg-white rounded-md shadow">
              <h3 className="font-bold text-lg">找到文章：{foundPost.title}</h3>
              <p className="text-sm text-gray-600">ID: {foundPost.id}</p>
              <p className="text-sm text-gray-600">Slug: {foundPost.slug}</p>
              <p className="text-sm text-gray-600">创建时间: {foundPost.createdAt}</p>
              <p className="text-sm text-gray-600">标签: {foundPost.tags.join(', ')}</p>
            </div>
          )}
        </div>
      </div>

      {/* 查看localStorage数据 */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">3. localStorage 数据</h2>
          <button
            onClick={refreshLocalStorageData}
            className="px-4 py-1 bg-gray-200 rounded-md hover:bg-gray-300"
          >
            刷新数据
          </button>
        </div>
        
        <div className="bg-gray-100 p-4 rounded-md mb-4">
          <div className="text-sm font-medium mb-2">原始数据：</div>
          {localStorageData ? (
            <pre className="whitespace-pre-wrap text-xs max-h-40 overflow-auto">{localStorageData}</pre>
          ) : (
            <p>localStorage中没有blogPosts数据</p>
          )}
        </div>
      </div>

      {/* 文章列表 */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">4. 文章列表 ({blogPosts.length} 篇)</h2>
        {blogPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {blogPosts.map(post => (
              <div key={post.id} className="bg-white p-4 rounded-md shadow-sm border">
                <h3 className="font-medium text-blue-600 hover:underline cursor-pointer" onClick={() => setTestSlug(post.slug)}>
                  {post.title}
                </h3>
                <p className="text-sm text-gray-600">Slug: {post.slug}</p>
                <p className="text-sm text-gray-500">创建时间: {post.createdAt}</p>
                <div className="flex flex-wrap gap-1 mt-2">
                  {post.tags.map(tag => (
                    <span key={tag} className="text-xs bg-gray-100 px-2 py-1 rounded">{tag}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>没有找到文章</p>
        )}
      </div>

      <div className="flex gap-4">
        <button 
          onClick={clearLocalStorage}
          className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
        >
          清空 localStorage
        </button>
        <a 
          href="/admin/new" 
          target="_blank" 
          rel="noopener noreferrer"
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          打开文章创建页面
        </a>
      </div>
    </div>
  )
}