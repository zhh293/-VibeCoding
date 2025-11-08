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

const BASE = '/api/blog'

export async function fetchPosts(opts?: { featured?: boolean }): Promise<BlogPost[]> {
  const url = opts?.featured ? `${BASE}/posts?featured=true` : `${BASE}/posts`
  const res = await fetch(url)
  if (!res.ok) throw new Error(`获取文章失败: ${res.status}`)
  return res.json()
}

export async function fetchPostBySlug(slug: string): Promise<BlogPost | null> {
  const res = await fetch(`${BASE}/slug/${encodeURIComponent(slug)}`)
  if (res.status === 404) return null
  if (!res.ok) throw new Error(`获取文章失败: ${res.status}`)
  return res.json()
}

export async function fetchPostById(id: string): Promise<BlogPost | null> {
  const res = await fetch(`${BASE}/posts/${id}`)
  if (res.status === 404) return null
  if (!res.ok) throw new Error(`获取文章失败: ${res.status}`)
  return res.json()
}

export async function createPost(input: {
  title: string
  excerpt: string
  content: string
  tags?: string[]
  featured?: boolean
}): Promise<BlogPost> {
  const res = await fetch(`${BASE}/posts`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(input),
  })
  if (!res.ok) throw new Error(`创建文章失败: ${await res.text()}`)
  return res.json()
}

export async function updatePost(id: string, input: Partial<{
  title: string
  excerpt: string
  content: string
  tags: string[]
  featured: boolean
}>): Promise<BlogPost> {
  const res = await fetch(`${BASE}/posts/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(input),
  })
  if (!res.ok) throw new Error(`更新文章失败: ${await res.text()}`)
  return res.json()
}

export async function deletePost(id: string): Promise<boolean> {
  const res = await fetch(`${BASE}/posts/${id}`, { method: 'DELETE' })
  if (!res.ok) throw new Error(`删除文章失败: ${await res.text()}`)
  const data = await res.json()
  return !!data?.ok
}

export function calculateReadTime(content: string): string {
  const wordsPerMinute = 200
  const words = content.split(/\s+/).length
  const minutes = Math.ceil(words / wordsPerMinute)
  return `${minutes} 分钟`
}