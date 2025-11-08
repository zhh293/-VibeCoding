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

export async function GET(req: Request) {
  const url = new URL(req.url)
  const featuredParam = url.searchParams.get('featured')
  const where: any = featuredParam === 'true' ? { featured: true } : {}
  const projects = await prisma.project.findMany({
    where,
    orderBy: { createdAt: 'desc' },
  })
  return NextResponse.json(projects)
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { title, description, image = null, tags = [], github = null, demo = null, featured = false } = body

    if (!title || !description) {
      return NextResponse.json({ message: '标题与描述为必填' }, { status: 400 })
    }

    const slug = generateSlug(title)

    const created = await prisma.project.create({
      data: {
        title,
        description,
        image,
        tags,
        github,
        demo,
        featured,
        slug,
      },
    })
    return NextResponse.json(created, { status: 201 })
  } catch (e: any) {
    if (e?.code === 'P2002') {
      return NextResponse.json({ message: 'slug 已存在，请更换标题' }, { status: 409 })
    }
    return NextResponse.json({ message: '创建失败', error: String(e) }, { status: 500 })
  }
}