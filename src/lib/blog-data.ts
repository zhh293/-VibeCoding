import { v4 as uuidv4 } from 'uuid'

// 文章数据类型定义
export interface BlogPost {
    id: string
    title: string
    excerpt: string
    content: string
    date: string
    readTime: string
    tags: string[]
    featured: boolean
    slug: string
}

// 使用统一的localStorage键名，以避免多个键名导致的问题
export const LOCAL_STORAGE_KEY = 'blog_posts'

// 旧的键名列表，用于清理
export const OLD_KEYS = ['blogPosts', 'blogs', 'blog-content', 'blog-posts']

// 默认文章数据
const defaultPosts: BlogPost[] = [
    {
        id: '1',
        title: '深入理解 React 18 并发特性',
        excerpt: '探索 React 18 的并发渲染、Suspense 和自动批处理等新特性，以及如何在实际项目中应用这些功能。',
        content: `# 深入理解 React 18 并发特性\n\nReact 18 引入了许多令人兴奋的新特性，其中最重要的是并发特性。这些特性让 React 应用能够更好地处理大量更新，提供更流畅的用户体验。\n\n## 什么是并发特性？\n\n并发特性是 React 18 的核心改进，它允许 React 中断、暂停、恢复或放弃工作。这意味着 React 可以在处理高优先级更新的同时，暂停低优先级的更新。\n\n## 主要特性\n\n### 1. 自动批处理 (Automatic Batching)\n\n在 React 18 之前，React 只在事件处理器中批处理更新。现在，React 会在所有情况下自动批处理更新。\n\n\`\`\`jsx\n// React 17 中，这些更新会触发两次渲染\nsetTimeout(() => {\n  setCount(c => c + 1);\n  setFlag(f => !f);\n  // React 17 会渲染两次，每次状态更新一次\n}, 1000);\n\n// React 18 中，这些更新会被批处理\nsetTimeout(() => {\n  setCount(c => c + 1);\n  setFlag(f => !f);\n  // React 18 只会渲染一次\n}, 1000);\n\`\`\`\n\n### 2. 并发渲染 (Concurrent Rendering)\n\n并发渲染允许 React 在渲染过程中中断工作，处理更高优先级的更新。\n\n\`\`\`jsx\nimport { startTransition } from 'react';\n\n// 高优先级更新\nsetInputValue(input);\n\n// 低优先级更新\nstartTransition(() => {\n  setSearchResults(data);\n});\n\`\`\`\n\n### 3. Suspense 改进\n\nReact 18 改进了 Suspense 的行为，现在可以在服务端渲染中使用。\n\n\`\`\`jsx\n<Suspense fallback={<Loading />}>\n  <ProfilePage />\n</Suspense>\n\`\`\`\n\n## 实际应用\n\n### 使用 useTransition\n\n\`useTransition\` 是一个新的 Hook，用于标记非紧急更新。\n\n\`\`\`jsx\nimport { useTransition, useState } from 'react';\n\nfunction SearchResults() {\n  const [isPending, startTransition] = useTransition();\n  const [query, setQuery] = useState('');\n  const [results, setResults] = useState([]);\n\n  const handleSearch = (value) => {\n    setQuery(value);\n    startTransition(() => {\n      // 这个更新会被标记为低优先级\n      setResults(searchData(value));\n    });\n  };\n\n  return (\n    <div>\n      <input \n        value={query} \n        onChange={(e) => handleSearch(e.target.value)} \n      />\n      {isPending && <div>搜索中...</div>}\n      <ResultsList results={results} />\n    </div>\n  );\n}\n\`\`\`\n\n### 使用 useDeferredValue\n\n\`useDeferredValue\` 可以延迟更新值，让 UI 保持响应。\n\n\`\`\`jsx\nimport { useDeferredValue, useMemo } from 'react';\n\nfunction ProductList({ products }) {\n  const [filter, setFilter] = useState('');\n  const deferredFilter = useDeferredValue(filter);\n  \n  const filteredProducts = useMemo(() => \n    products.filter(product => \n      product.name.toLowerCase().includes(deferredFilter.toLowerCase())\n    ), [products, deferredFilter]\n  );\n\n  return (\n    <div>\n      <input \n        value={filter} \n        onChange={(e) => setFilter(e.target.value)} \n      />\n      <ProductGrid products={filteredProducts} />\n    </div>\n  );\n}\n\`\`\`\n\n## 性能优化建议\n\n1. **合理使用 startTransition**：将非紧急更新包装在 \`startTransition\` 中\n2. **利用 useDeferredValue**：延迟处理昂贵的计算\n3. **优化 Suspense 边界**：合理设置 Suspense 边界\n4. **监控性能指标**：使用 React DevTools 监控渲染性能\n\n## 总结\n\nReact 18 的并发特性为构建高性能应用提供了强大的工具。通过合理使用这些特性，我们可以创建更流畅、更响应的用户界面。\n\n记住，并发特性是可选的，现有的 React 应用可以逐步采用这些新特性，无需重写整个应用。`,
        date: '2024-01-15',
        readTime: '8 分钟',
        tags: ['React', 'JavaScript', '前端'],
        featured: true,
        slug: 'react-18-concurrent-features'
    },
    {
        id: '2',
        title: 'Next.js 14 新特性详解',
        excerpt: '全面解析 Next.js 14 的 App Router、Server Components 和性能优化等新功能。',
        content: `# Next.js 14 新特性详解\n\nNext.js 14 带来了许多令人兴奋的新特性和改进，包括更好的性能、更简单的开发体验和更强大的功能。\n\n## 主要新特性\n\n### 1. App Router 稳定版\n\nApp Router 现在已经是稳定版本，提供了更直观的文件系统路由。\n\n\`\`\`\napp/\n├── page.tsx          # 首页\n├── layout.tsx        # 根布局\n├── about/\n│   └── page.tsx      # /about 页面\n└── blog/\n    ├── page.tsx      # /blog 页面\n    └── [slug]/\n        └── page.tsx  # /blog/[slug] 动态路由\n\`\`\`\n\n### 2. Server Components\n\nServer Components 允许在服务器端渲染组件，减少客户端 JavaScript 包大小。\n\n\`\`\`tsx\n// app/components/ServerComponent.tsx\nasync function ServerComponent() {\n  const data = await fetch('https://api.example.com/data');\n  const posts = await data.json();\n\n  return (\n    <div>\n      {posts.map(post => (\n        <article key={post.id}>\n          <h2>{post.title}</h2>\n          <p>{post.excerpt}</p>\n        </article>\n      ))}\n    </div>\n  );\n}\n\nexport default ServerComponent;\n\`\`\`\n\n### 3. 改进的 Image 组件\n\n新的 Image 组件提供了更好的性能和更简单的使用方式。\n\n\`\`\`tsx\nimport Image from 'next/image';\n\nfunction MyImage() {\n  return (\n    <Image\n      src="/hero.jpg"\n      alt="Hero image"\n      width={800}\n      height={600}\n      priority // 预加载重要图片\n      placeholder="blur" // 模糊占位符\n      blurDataURL="data:image/jpeg;base64,..."\n    />\n  );\n}\n\`\`\`\n\n### 4. 新的 Metadata API\n\n更简单和类型安全的元数据管理。\n\n\`\`\`tsx\n// app/layout.tsx\nimport type { Metadata } from 'next';\n\nexport const metadata: Metadata = {\n  title: '我的博客',\n  description: '一个现代化的技术博客',\n  openGraph: {\n    title: '我的博客',\n    description: '一个现代化的技术博客',\n    type: 'website',\n  },\n};\n\nexport default function RootLayout({\n  children,\n}: {\n  children: React.ReactNode;\n}) {\n  return (\n    <html lang="zh-CN">\n      <body>{children}</body>\n    </html>\n  );\n}\n\`\`\`\n\n### 5. 改进的字体优化\n\n新的字体系统提供了更好的性能和更简单的使用方式。\n\n\`\`\`tsx\n// app/layout.tsx\nimport { Inter } from 'next/font/google';\n\nconst inter = Inter({ \n  subsets: ['latin'],\n  display: 'swap',\n});\n\nexport default function RootLayout({\n  children,\n}: {\n  children: React.ReactNode;\n}) {\n  return (\n    <html lang="zh-CN" className={inter.className}>\n      <body>{children}</body>\n    </html>\n  );\n}\n\`\`\`\n\n## 性能优化\n\n### 1. 更快的构建速度\n\nNext.js 14 显著提高了构建速度，特别是在大型项目中。\n\n### 2. 改进的缓存策略\n\n新的缓存策略提供了更好的性能和更简单的配置。\n\n\`\`\`tsx\n// 页面级缓存\nexport const revalidate = 3600; // 1小时\n\n// 数据缓存\nasync function getData() {\n  const res = await fetch('https://api.example.com/data', {\n    next: { revalidate: 3600 }\n  });\n  return res.json();\n}\n\`\`\`\n\n### 3. 更好的开发体验\n\n- 更快的热重载\n- 更好的错误信息\n- 改进的 TypeScript 支持\n\n## 实际应用示例\n\n### 创建一个博客页面\n\n\`\`\`tsx\n// app/blog/page.tsx\nimport { Metadata } from 'next';\nimport Link from 'next/link';\n\nexport const metadata: Metadata = {\n  title: '博客 - 我的网站',\n  description: '查看我的最新博客文章',\n};\n\nasync function getPosts() {\n  const res = await fetch('https://api.example.com/posts', {\n    next: { revalidate: 3600 }\n  });\n  return res.json();\n}\n\nexport default async function BlogPage() {\n  const posts = await getPosts();\n\n  return (\n    <div className="container mx-auto px-4 py-8">\n      <h1 className="text-3xl font-bold mb-8">我的博客</h1>\n      <div className="grid gap-6">\n        {posts.map((post: any) => (\n          <article key={post.id} className="border rounded-lg p-6">\n            <h2 className="text-xl font-semibold mb-2">\n              <Link href={\`/blog/\${post.slug}\`}>\n                {post.title}\n              </Link>\n            </h2>\n            <p className="text-gray-600 mb-4">{post.excerpt}</p>\n            <time className="text-sm text-gray-500">\n              {new Date(post.date).toLocaleDateString('zh-CN')}\n            </time>\n          </article>\n        ))}\n      </div>\n    </div>\n  );\n}\n\`\`\`\n\n### 创建动态路由页面\n\n\`\`\`tsx\n// app/blog/[slug]/page.tsx\nimport { Metadata } from 'next';\nimport { notFound } from 'next/navigation';\n\ninterface Props {\n  params: { slug: string };\n}\n\nasync function getPost(slug: string) {\n  const res = await fetch(\`https://api.example.com/posts/\${slug}\`);\n  if (!res.ok) return null;\n  return res.json();\n}\n\nexport async function generateMetadata({ params }: Props): Promise<Metadata> {\n  const post = await getPost(params.slug);\n  \n  if (!post) {\n    return {\n      title: '文章未找到',\n    };\n  }\n\n  return {\n    title: post.title,\n    description: post.excerpt,\n  };\n}\n\nexport default async function PostPage({ params }: Props) {\n  const post = await getPost(params.slug);\n\n  if (!post) {\n    notFound();\n  }\n\n  return (\n    <article className="container mx-auto px-4 py-8">\n      <header className="mb-8">\n        <h1 className="text-4xl font-bold mb-4">{post.title}</h1>\n        <time className="text-gray-600">\n          {new Date(post.date).toLocaleDateString('zh-CN')}\n        </time>\n      </header>\n      <div \n        className="prose max-w-none"\n        dangerouslySetInnerHTML={{ __html: post.content }}\n      />\n    </article>\n  );\n}\n\`\`\`\n\n## 迁移指南\n\n### 从 Pages Router 迁移\n\n1. 创建 \`app\` 目录\n2. 移动页面文件到对应位置\n3. 更新导入路径\n4. 使用新的 Metadata API\n5. 测试所有路由\n\n### 更新依赖\n\n\`\`\`bash\nnpm install next@14 react@18 react-dom@18\n\`\`\`\n\n## 总结\n\nNext.js 14 提供了许多强大的新特性，让构建现代 Web 应用变得更加简单和高效。通过合理使用这些特性，我们可以创建更好的用户体验和更快的应用。\n\n建议逐步迁移到新版本，充分利用新特性的优势。`,
        date: '2024-01-10',
        readTime: '6 分钟',
        tags: ['Next.js', 'React', '全栈'],
        featured: true,
        slug: 'nextjs-14-new-features'
    }
]

/**
 * 清理旧的localStorage键名，确保数据一致性
 */
export function cleanupOldKeys(): void {
  if (typeof window === 'undefined') {
    return;
  }
  
  try {
    const hasOldData = OLD_KEYS.some(key => {
      const data = localStorage.getItem(key)
      return data !== null && data !== '[]' && data.trim() !== ''
    })

    if (hasOldData) {
      console.log('发现旧的localStorage键，开始清理...')
      
      const newData = localStorage.getItem(LOCAL_STORAGE_KEY)
      let mergedPosts: BlogPost[] = []
      
      if (newData) {
        try {
          mergedPosts = JSON.parse(newData)
          if (!Array.isArray(mergedPosts)) {
            mergedPosts = []
          }
        } catch {
          mergedPosts = []
        }
      }
      
      OLD_KEYS.forEach(key => {
        const oldData = localStorage.getItem(key)
        if (oldData) {
          try {
            const oldPosts = JSON.parse(oldData)
            if (Array.isArray(oldPosts) && oldPosts.length > 0) {
              const existingIds = new Set(mergedPosts.map(post => post.id))
              const newPosts = oldPosts.filter((post: BlogPost) => 
                post && typeof post === 'object' && !existingIds.has(post.id)
              )
              
              if (newPosts.length > 0) {
                mergedPosts = [...mergedPosts, ...newPosts]
                console.log(`从键 ${key} 迁移了 ${newPosts.length} 篇文章`)
              }
            }
          } catch (err) {
            console.error(`解析键 ${key} 中的数据失败:`, err)
          }
          
          localStorage.removeItem(key)
          console.log(`已清理旧键: ${key}`)
        }
      })
      
      if (mergedPosts.length > 0) {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(mergedPosts))
        console.log(`数据迁移完成，总共 ${mergedPosts.length} 篇文章`)
      } else {
        console.log('没有找到可迁移的数据')
      }
    }
  } catch (err) {
    console.error('清理旧键名时发生错误:', err)
  }
}

// 从localStorage获取文章数据
export function getBlogPosts(): BlogPost[] {
    // 直接返回默认数据，让客户端组件负责从localStorage获取数据
    // 确保defaultPosts变量可用
    if (!defaultPosts || !Array.isArray(defaultPosts)) {
        console.error('defaultPosts is not defined or not an array');
        return [];
    }
    return defaultPosts;
}

// 仅在客户端使用的函数，直接从localStorage获取文章
export function getBlogPostsFromStorage(): BlogPost[] {
    if (typeof window === 'undefined') {
        console.warn('getBlogPostsFromStorage called on server, returning default posts')
        // 确保defaultPosts变量可用
        if (!defaultPosts || !Array.isArray(defaultPosts)) {
            console.error('defaultPosts is not defined or not an array');
            return [];
        }
        return defaultPosts
    }

    // 每次获取数据前检查并清理旧键名
    cleanupOldKeys()

    try {
        const stored = localStorage.getItem(LOCAL_STORAGE_KEY)
        console.log(`从localStorage获取文章，键名: ${LOCAL_STORAGE_KEY}，数据存在: ${!!stored}`)
        
        if (stored) {
            try {
                const posts = JSON.parse(stored)
                console.log('Successfully retrieved', posts.length, 'posts from localStorage')
                return posts
            } catch (parseError) {
                console.error('Failed to parse blog posts from localStorage:', parseError)
                // 如果解析失败，尝试清除损坏的数据
                localStorage.removeItem(LOCAL_STORAGE_KEY)
                return defaultPosts
            }
        }
        console.log('No posts found in localStorage, returning default posts')
        // 确保defaultPosts变量可用
        if (!defaultPosts || !Array.isArray(defaultPosts)) {
            console.error('defaultPosts is not defined or not an array');
            return [];
        }
        // 初始化localStorage
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(defaultPosts))
        return defaultPosts
    } catch (error) {
        console.error('Error accessing localStorage:', error)
        return defaultPosts
    }
}

// 保存文章数据到localStorage
export function saveBlogPosts(posts: BlogPost[]): void {
    if (typeof window === 'undefined') {
        console.error('Attempted to save to localStorage on server!')
        return
    }

    // 确保在保存前清理旧键名
    cleanupOldKeys()
    
    try {
        console.log(`保存文章到localStorage，键名: ${LOCAL_STORAGE_KEY}，文章数量: ${posts.length}`)
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(posts))
        
        // 立即验证保存是否成功
        const saved = localStorage.getItem(LOCAL_STORAGE_KEY)
        if (saved) {
            try {
                const parsed = JSON.parse(saved)
                console.log('验证成功: 保存后检索到', parsed.length, '篇文章')
                // 验证第一篇文章的信息
                if (parsed.length > 0) {
                    console.log(`第一篇文章: ${parsed[0].title}, slug: ${parsed[0].slug}`)
                }
            } catch (parseError) {
                console.error('验证失败: 无法解析保存的数据', parseError)
            }
        } else {
            console.error('验证失败: 保存后无法从localStorage获取数据')
        }
    } catch (error) {
        console.error('保存文章到localStorage时出错:', error)
        // 尝试清除localStorage并重新保存
        try {
            console.log('尝试清理localStorage并重新保存...')
            localStorage.removeItem(LOCAL_STORAGE_KEY) // 只移除我们关心的键
            localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(posts))
            console.log('重试成功: 清理后保存文章成功')
        } catch (retryError) {
            console.error('重试失败:', retryError)
        }
    }
}

// 根据slug获取单篇文章
export function getBlogPostBySlug(slug: string): BlogPost | null {
    // 服务器端直接从默认数据查找
    // 添加URL解码，处理中文等特殊字符
    const decodedSlug = decodeURIComponent(slug)
    console.log('Server side: Looking for post with slug:', slug, '(decoded:', decodedSlug, ')')
    const posts = getBlogPosts()
    // 先尝试精确匹配解码后的slug
    let found = posts.find(post => post.slug === decodedSlug) || null
    
    // 如果没有找到，再尝试匹配原始slug
    if (!found) {
        found = posts.find(post => post.slug === slug) || null
    }
    
    console.log('Server side: Post found:', !!found)
    return found
}

// 客户端从localStorage获取文章
export function getBlogPostBySlugFromStorage(slug: string): BlogPost | null {
    if (typeof window === 'undefined') {
        console.warn('getBlogPostBySlugFromStorage called on server')
        // 确保defaultPosts变量可用
        if (defaultPosts && Array.isArray(defaultPosts)) {
            return defaultPosts.find(post => post.slug === slug) || null;
        }
        return null
    }

    // 添加URL解码，处理中文等特殊字符
    const decodedSlug = decodeURIComponent(slug)
    console.log('Client side: Looking for post with slug:', slug, '(decoded:', decodedSlug, ')')
    
    const posts = getBlogPostsFromStorage()
    // 先尝试精确匹配解码后的slug
    let found = posts.find(post => post.slug === decodedSlug) || null
    
    // 如果没有找到，再尝试匹配原始slug
    if (!found) {
        found = posts.find(post => post.slug === slug) || null
    }
    
    console.log('Client side: Post found:', !!found)
    return found
}

// 客户端创建新博客文章的主函数
export function createBlogPost(postData: Omit<BlogPost, 'id' | 'slug'>): BlogPost {
    if (typeof window === 'undefined') {
        console.error('createBlogPost called on server side')
        throw new Error('createBlogPost must be called on client side')
    }

    console.log('Creating new blog post:', postData.title)
    
    // 参数验证
    if (!postData.title || postData.title.trim() === '') {
        throw new Error('文章标题不能为空')
    }
    
    if (!postData.content || postData.content.trim() === '') {
        throw new Error('文章内容不能为空')
    }

    // 获取现有文章
    const posts = getBlogPostsFromStorage()
    
    // 生成唯一ID和slug
    const id = uuidv4() // 使用uuid库生成更可靠的唯一ID
    
    // 生成安全的slug
    const slug = postData.title
        .toLowerCase()
        .normalize('NFD') // 标准化字符
        .replace(/[\u0300-\u036f]/g, '') // 移除重音符号
        .replace(/[^a-z0-9\u4e00-\u9fa5]+/g, '-') // 替换非字母数字和中文的字符为连字符
        .replace(/^-+|-+$/g, '') // 移除首尾连字符

    console.log(`Generated post ID: ${id}, slug: ${slug}`)

    // 创建新文章对象
    const newPost: BlogPost = {
        ...postData,
        id,
        slug
    }

    // 更新文章列表
    const updatedPosts = [newPost, ...posts]
    
    // 保存到localStorage
    saveBlogPosts(updatedPosts)
    console.log('Blog post created successfully')

    // 验证保存是否成功
    try {
        const savedPost = getBlogPostBySlugFromStorage(slug)
        if (savedPost) {
            console.log('Verification successful: Post was saved and can be retrieved')
        } else {
            console.warn('Warning: Failed to verify post retrieval after save')
        }
    } catch (verifyError) {
        console.error('Error during post verification:', verifyError)
    }

    return newPost
}

// 添加新文章（仅在客户端使用） - 兼容旧函数
export function addBlogPost(post: Omit<BlogPost, 'id' | 'slug'>): BlogPost {
    console.warn('addBlogPost is deprecated, use createBlogPost instead')
    return createBlogPost(post)
}

// 更新文章
export function updateBlogPost(id: string, updates: Partial<Omit<BlogPost, 'id' | 'slug'>>): BlogPost | null {
    // 确保在客户端运行
    if (typeof window === 'undefined') {
        console.error('updateBlogPost called on server side')
        return null
    }
    
    try {
        // 参数验证
        if (!id || typeof id !== 'string') {
            console.error('Invalid post ID provided')
            return null
        }
        
        // 使用客户端存储函数获取最新数据
        const posts = getBlogPostsFromStorage()
        const index = posts.findIndex(post => post.id === id)

        if (index === -1) {
            console.log(`Update failed: Post with id ${id} not found`)
            return null
        }

        // 创建更新后的文章对象
        const updatedPost = {
            ...posts[index],
            ...updates
        }

        // 数据验证
        if (!updatedPost.title || updatedPost.title.trim() === '') {
            console.error('Update failed: Title cannot be empty')
            return null
        }
        
        if (!updatedPost.content || updatedPost.content.trim() === '') {
            console.error('Update failed: Content cannot be empty')
            return null
        }

        // 如果标题更新了，重新生成slug
        if (updates.title) {
            updatedPost.slug = updates.title
                .toLowerCase()
                .normalize('NFD') // 标准化字符
                .replace(/[\u0300-\u036f]/g, '') // 移除重音符号
                .replace(/[^a-z0-9\u4e00-\u9fa5]+/g, '-')
                .replace(/^-+|-+$/g, '')
            console.log(`Title updated, new slug generated: ${updatedPost.slug}`)
        }

        // 更新文章列表
        posts[index] = updatedPost
        
        // 保存到localStorage
        saveBlogPosts(posts)
        
        // 验证保存是否成功
        const savedPosts = getBlogPostsFromStorage()
        const savedPost = savedPosts.find(p => p.id === id)
        
        if (!savedPost || JSON.stringify(savedPost) !== JSON.stringify(updatedPost)) {
            console.error('Verification failed: Post was not saved correctly')
            return null
        }
        
        console.log(`Successfully updated post: ${updatedPost.title} (${id})`)
        return updatedPost
    } catch (error) {
        console.error('Error updating blog post:', error)
        return null
    }
}

// 删除文章
export function deleteBlogPost(id: string): boolean {
    // 确保在客户端运行
    if (typeof window === 'undefined') {
        console.error('deleteBlogPost called on server side')
        return false
    }
    
    try {
        // 参数验证
        if (!id || typeof id !== 'string') {
            console.error('Invalid post ID provided')
            return false
        }
        
        // 使用客户端存储函数获取最新数据
        const posts = getBlogPostsFromStorage()
        const postToDelete = posts.find(post => post.id === id)
        
        if (!postToDelete) {
            console.log(`Delete failed: Post with id ${id} not found`)
            return false
        }
        
        // 执行删除操作
        const filteredPosts = posts.filter(post => post.id !== id)
        
        // 验证过滤是否成功
        if (filteredPosts.length === posts.length) {
            console.error('Delete operation failed: Post still exists after filtering')
            return false
        }

        // 保存到localStorage
        saveBlogPosts(filteredPosts)
        
        // 验证删除是否成功
        const savedPosts = getBlogPostsFromStorage()
        const stillExists = savedPosts.some(post => post.id === id)
        
        if (stillExists) {
            console.error('Verification failed: Post still exists after deletion')
            return false
        }
        
        console.log(`Successfully deleted post: ${postToDelete.title} (${id})`)
        return true
    } catch (error) {
        console.error('Error deleting blog post:', error)
        // 尝试清理localStorage并重试
        try {
            console.log('Attempting to clean localStorage and retry deletion...')
            localStorage.removeItem(LOCAL_STORAGE_KEY)
            return false
        } catch (retryError) {
            console.error('Retry failed:', retryError)
            return false
        }
    }
}

// 生成阅读时间估算
export function calculateReadTime(content: string): string {
    const wordsPerMinute = 200
    const words = content.split(/\s+/).length
    const minutes = Math.ceil(words / wordsPerMinute)
    return `${minutes} 分钟`
}
