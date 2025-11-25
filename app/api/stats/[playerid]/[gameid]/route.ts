import { NextResponse } from "next/server";
import { getPlayerStats } from "@/utils/faceitApi";

type Ctx<T extends Record<string, string | string[]>> = { params: T };

export async function GET(_req: Request, context: unknown) {
  try {
    const { params } = context as Ctx<{
      playerid: string | string[];
      gameid: string | string[];
    }>;

    const playerid = Array.isArray(params.playerid)
      ? params.playerid[0]
      : params.playerid;

    const gameid = Array.isArray(params.gameid)
      ? params.gameid[0]
      : params.gameid;

    if (!playerid || !gameid) {
      return NextResponse.json(
        { error: "Missing playerid or gameid" },
        { status: 400 }
      );
    }

    const stats = await getPlayerStats(playerid, gameid);
    return NextResponse.json(stats);
  } catch (err) {
    console.error("Stats API error:", err);
    return NextResponse.json(
      { error: "Failed to fetch stats" },
      { status: 500 }
    );
  }
}
