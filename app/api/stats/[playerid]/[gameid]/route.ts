import { NextRequest, NextResponse } from 'next/server'
import { getPlayerStats } from '@/utils/faceitApi'

export async function GET(
  req: NextRequest,
  { params }: { params: { playerid: string; gameid: string } }
) {
  try {
    const stats = await getPlayerStats(params.playerid, params.gameid)
    return NextResponse.json(stats)
  } catch (err) {
    console.error('Stats API error:', err)
    return NextResponse.json({ error: 'Failed to fetch stats' }, { status: 500 })
  }
}
