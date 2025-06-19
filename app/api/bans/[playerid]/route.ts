// app/api/ban/[playerid]/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { getBanStatus } from '@/utils/faceitApi'

export async function GET(
    req: NextRequest,
    context: Promise<{ params: { playerid: string } }>
) {
    const { params } = await context
    try {
        const banInfo = await getBanStatus(params.playerid)
        return NextResponse.json({ banned: banInfo.banned })
    } catch {
        return NextResponse.json({ error: 'Failed to fetch ban status' }, { status: 500 })
    }
}