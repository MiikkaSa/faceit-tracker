import { NextResponse } from "next/server";
import { getPlayerMatches, getMatchStats } from "@/utils/faceitApi";

interface MatchItem {
  match_id: string;
}

interface MatchWithStats extends MatchItem {
  stats: MatchStats | null;
}

interface MatchStats {
  rounds?: Array<{
    round_stats?: Record<string, string>;
    teams?: Team[];
  }>;
}

interface Team {
  team_id: string;
  team_stats?: Record<string, string>;
  players: Player[];
}

interface Player {
  player_id: string;
  nickname: string;
  player_stats?: Record<string, string>;
}

export async function GET(
  _req: Request,
  { params }: { params: { playerid: string } }
) {
  try {
    const matches = await getPlayerMatches(params.playerid);

    const matchesWithStats: MatchWithStats[] = await Promise.all(
      matches.items.map(async (m: MatchItem) => {
        try {
          const stats = await getMatchStats(m.match_id);
          return { ...m, stats };
        } catch {
          return { ...m, stats: null };
        }
      })
    );

    return NextResponse.json(matchesWithStats);
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Failed to fetch matches" },
      { status: 500 }
    );
  }
}
