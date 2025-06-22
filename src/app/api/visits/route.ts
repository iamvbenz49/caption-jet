import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'


export async function POST() {
  try {
    const existing = await prisma.visit.findUnique({
      where: { slug: 'global' }
    })

    if (existing) {
      const updated = await prisma.visit.update({
        where: { slug: 'global' },
        data: { count: existing.count + 1 }
      })
      return NextResponse.json({ visits: updated.count }, { status: 200 })
    } else {
      const created = await prisma.visit.create({
        data: { slug: 'global', count: 1 }
      })
      return NextResponse.json({ visits: created.count }, { status: 200 })
    }
  } catch (err) {
    console.error('[API ERROR] POST /api/track-visits', err)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

export async function GET() {
  try {
    const data = await prisma.visit.findUnique({
      where: { slug: 'global' }
    })

    return NextResponse.json({ visits: data?.count ?? 0 }, { status: 200 })
  } catch (err) {
    console.error('[API ERROR] GET /api/track-visits', err)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
