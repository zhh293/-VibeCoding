export interface Project {
  id: string
  title: string
  description: string
  image?: string | null
  tags: string[]
  github?: string | null
  demo?: string | null
  featured: boolean
  slug: string
  createdAt?: string
  updatedAt?: string
}

const BASE = '/api/projects'

export async function fetchProjects(opts?: { featured?: boolean }): Promise<Project[]> {
  const url = opts?.featured ? `${BASE}?featured=true` : BASE
  const res = await fetch(url)
  if (!res.ok) throw new Error(`获取项目失败: ${res.status}`)
  return res.json()
}

export async function fetchProjectById(id: string): Promise<Project | null> {
  const res = await fetch(`${BASE}/${id}`)
  if (res.status === 404) return null
  if (!res.ok) throw new Error(`获取项目失败: ${res.status}`)
  return res.json()
}

export async function fetchProjectBySlug(slug: string): Promise<Project | null> {
  const res = await fetch(`${BASE}/slug/${encodeURIComponent(slug)}`)
  if (res.status === 404) return null
  if (!res.ok) throw new Error(`获取项目失败: ${res.status}`)
  return res.json()
}

export async function createProject(input: {
  title: string
  description: string
  image?: string | null
  tags?: string[]
  github?: string | null
  demo?: string | null
  featured?: boolean
}): Promise<Project> {
  const res = await fetch(BASE, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(input),
  })
  if (!res.ok) throw new Error(`创建项目失败: ${await res.text()}`)
  return res.json()
}

export async function updateProject(id: string, input: Partial<{
  title: string
  description: string
  image: string | null
  tags: string[]
  github: string | null
  demo: string | null
  featured: boolean
}>): Promise<Project> {
  const res = await fetch(`${BASE}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(input),
  })
  if (!res.ok) throw new Error(`更新项目失败: ${await res.text()}`)
  return res.json()
}

export async function deleteProject(id: string): Promise<boolean> {
  const res = await fetch(`${BASE}/${id}`, { method: 'DELETE' })
  if (!res.ok) throw new Error(`删除项目失败: ${await res.text()}`)
  const data = await res.json()
  return !!data?.ok
}