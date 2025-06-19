// app/api/stats/[playerid]/[gameid]/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { getPlayerStats } from '@/utils/faceitApi'

export async function GET(
    req: NextRequest,
    context: Promise<{ params: { playerid: string; gameid: string } }>
) {
    const { params } = await context
    try {
        const stats = await getPlayerStats(params.playerid, params.gameid)
        return NextResponse.json(stats)
    } catch {
        return NextResponse.json({ error: 'Failed to fetch stats' }, { status: 500 })
    }
}