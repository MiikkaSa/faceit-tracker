import { NextResponse } from "next/server";
import { getPlayerMatches, getMatchStats } from "@/utils/faceitApi";

type Ctx<T extends Record<string, string | string[]>> = { params: T };

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

export async function GET(_req: Request, context: unknown) {
  try {
    const { params } = context as Ctx<{ playerid: string | string[] }>;

    const playerid = Array.isArray(params.playerid)
      ? params.playerid[0]
      : params.playerid;

    if (!playerid) {
      return NextResponse.json({ error: "Missing playerid" }, { status: 400 });
    }

    const matches = await getPlayerMatches(playerid);

    const items: MatchItem[] = Array.isArray(matches?.items) ? matches.items : [];

    const matchesWithStats: MatchWithStats[] = await Promise.all(
      items.map(async (m) => {
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
