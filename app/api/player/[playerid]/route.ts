// app/api/player/[playerid]/route.ts
import { NextResponse } from "next/server";
import { getPlayerDetails } from "@/utils/faceitApi";

type Ctx<T extends Record<string, string | string[]>> = { params: T };

export async function GET(_req: Request, context: unknown) {
  try {
    const { params } = context as Ctx<{ playerid: string | string[] }>;

    const playerid = Array.isArray(params.playerid)
      ? params.playerid[0]
      : params.playerid;

    if (!playerid) {
      return NextResponse.json({ error: "Missing playerid" }, { status: 400 });
    }

    const data = await getPlayerDetails(playerid);
    return NextResponse.json(data);
  } catch (err) {
    console.error("Failed to fetch player details", err);
    return NextResponse.json(
      { error: "Failed to fetch player details" },
      { status: 500 }
    );
  }
}
