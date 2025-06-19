// app/api/overview/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { getPlayerByNickname } from '@/utils/faceitApi'

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url)
    const nickname = searchParams.get('nickname')
    const game = searchParams.get('game') ?? 'cs2'

    if (!nickname) return NextResponse.json({ error: 'Missing nickname' }, { status: 400 })

    try {
        const data = await getPlayerByNickname(nickname)
        return NextResponse.json(data)
    } catch {
        return NextResponse.json({ error: 'Player not found' }, { status: 404 })
    }
}
