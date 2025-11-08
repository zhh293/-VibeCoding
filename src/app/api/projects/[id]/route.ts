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

export async function GET(_: Request, { params }: { params: { id: string } }) {
  const item = await prisma.project.findUnique({ where: { id: params.id } })
  if (!item) return NextResponse.json({ message: '未找到' }, { status: 404 })
  return NextResponse.json(item)
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const body = await req.json()
    const data: any = { ...body }
    if (typeof body.title === 'string') {
      data.slug = generateSlug(body.title)
    }
    const updated = await prisma.project.update({
      where: { id: params.id },
      data,
    })
    return NextResponse.json(updated)
  } catch (e: any) {
    return NextResponse.json({ message: '更新失败', error: String(e) }, { status: 500 })
  }
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  try {
    await prisma.project.delete({ where: { id: params.id } })
    return NextResponse.json({ ok: true })
  } catch (e: any) {
    return NextResponse.json({ message: '删除失败', error: String(e) }, { status: 500 })
  }
}