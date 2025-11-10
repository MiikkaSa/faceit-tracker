import { NextRequest, NextResponse } from 'next/server'
import { getPlayerMatches, getMatchStats } from '@/utils/faceitApi'

export async function GET(
  _req: NextRequest,
  context: { params: Promise<{ playerid: string }> } // params on promise
) {
  const { playerid } = await context.params

  try {
    // hae pelaajan matsit
    const matches = await getPlayerMatches(playerid)

    // lisää stats jokaiselle matsille
    const matchesWithStats = await Promise.all(
      matches.items.map(async (m: any) => {
        try {
          const stats = await getMatchStats(m.match_id)
          return { ...m, stats, player_id: playerid } // lisää player_id jotta MatchHistory löytää pelaajan
        } catch {
          return { ...m, stats: null, player_id: playerid }
        }
      })
    )

    return NextResponse.json(matchesWithStats)
  } catch (err) {
    console.error('Matches API error:', err)
    return NextResponse.json({ error: 'Failed to fetch matches' }, { status: 500 })
  }
}
