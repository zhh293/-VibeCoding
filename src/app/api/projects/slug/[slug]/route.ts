import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(_: Request, { params }: { params: { slug: string } }) {
  const decoded = decodeURIComponent(params.slug)
  const item = await prisma.project.findUnique({ where: { slug: decoded } })
  if (!item) return NextResponse.json({ message: '未找到' }, { status: 404 })
  return NextResponse.json(item)
}