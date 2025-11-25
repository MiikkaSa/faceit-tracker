import { NextResponse } from "next/server";
import { getPlayerDetails } from "@/utils/faceitApi";

export async function GET(
  _req: Request,
  { params }: { params: { playerid: string } }
) {
  try {
    const data = await getPlayerDetails(params.playerid);
    return NextResponse.json(data);
  } catch (err) {
    console.error("Failed to fetch player details", err);
    return NextResponse.json(
      { error: "Failed to fetch player details" },
      { status: 500 }
    );
  }
}
