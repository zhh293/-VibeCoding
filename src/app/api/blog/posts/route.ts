import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

function generateSlug(title: string) {
  return title
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\u4e00-\u9fa5]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

function calculateReadTime(content: string) {
  const wordsPerMinute = 200
  const words = content.split(/\s+/).length
  const minutes = Math.ceil(words / wordsPerMinute)
  return `${minutes} 分钟`
}

export async function GET(req: Request) {
  const url = new URL(req.url)
  const featuredParam = url.searchParams.get('featured')
  const where = featuredParam === 'true' ? { featured: true } : {}
  const posts = await prisma.blogPost.findMany({
    where,
    orderBy: { date: 'desc' },
  })

  return NextResponse.json(posts)
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { title, excerpt, content, tags = [], featured = false } = body

    if (!title || !content || !excerpt) {
      return NextResponse.json({ message: '标题、摘要与内容为必填' }, { status: 400 })
    }

    const slug = generateSlug(title)
    const readTime = calculateReadTime(content)

    const post = await prisma.blogPost.create({
      data: {
        title,
        excerpt,
        content,
        date: new Date(),
        readTime,
        tags,
        featured,
        slug,
      },
    })

    return NextResponse.json(post, { status: 201 })
  } catch (e: any) {
    if (e?.code === 'P2002') {
      return NextResponse.json({ message: 'slug 已存在，请更换标题' }, { status: 409 })
    }
    return NextResponse.json({ message: '创建失败', error: String(e) }, { status: 500 })
  }
}