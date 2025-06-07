// app/api/overview/route.ts
import { FACEIT_BASE_URL } from '@/utils/constants'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url)
    const nickname = searchParams.get('nickname')
    const game = searchParams.get('game') ?? 'cs2'

    if (!nickname) {
        return NextResponse.json({ error: 'Nickname is required' }, { status: 400 })
    }

    const url = new URL(`${FACEIT_BASE_URL}`)
    url.searchParams.set('nickname', nickname)
    url.searchParams.set('game', game)

    const res = await fetch(url.toString(), {
        headers: {
            Authorization: `Bearer ${process.env.FACEIT_API_KEY}`,
        },
    })

    if (!res.ok) {
        return NextResponse.json({ error: 'Failed to fetch player overview' }, { status: res.status })
    }

    const data = await res.json()
    return NextResponse.json(data)
}
