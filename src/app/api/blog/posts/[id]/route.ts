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

export async function GET(_: Request, { params }: { params: { id: string } }) {
  const post = await prisma.blogPost.findUnique({ where: { id: params.id } })
  if (!post) return NextResponse.json({ message: '未找到' }, { status: 404 })
  return NextResponse.json(post)
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const body = await req.json()
    const data: any = { ...body }
    if (typeof body.title === 'string') {
      data.slug = generateSlug(body.title)
    }
    if (typeof body.content === 'string') {
      data.readTime = calculateReadTime(body.content)
    }

    const updated = await prisma.blogPost.update({
      where: { id: params.id },
      data,
    })
    return NextResponse.json(updated)
  } catch (e) {
    return NextResponse.json({ message: '更新失败', error: String(e) }, { status: 500 })
  }
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  try {
    await prisma.blogPost.delete({ where: { id: params.id } })
    return NextResponse.json({ ok: true })
  } catch (e) {
    return NextResponse.json({ message: '删除失败', error: String(e) }, { status: 500 })
  }
}