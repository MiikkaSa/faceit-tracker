// app/api/matches/[playerid]/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { getPlayerMatches } from '@/utils/faceitApi'

export async function GET(
    req: NextRequest,
    context: Promise<{ params: { playerid: string } }>
) {
    const { params } = await context
    try {
        const matches = await getPlayerMatches(params.playerid)
        return NextResponse.json(matches)
    } catch {
        return NextResponse.json({ error: 'Failed to fetch matches' }, { status: 500 })
    }
}