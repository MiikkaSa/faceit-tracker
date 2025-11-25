import { NextRequest, NextResponse } from "next/server";

export async function GET(
  _req: NextRequest,
  { params }: { params: { playerid: string } }
) {
  const { playerid } = params;

  if (!playerid) {
    return NextResponse.json({ error: "Missing player ID" }, { status: 400 });
  }

  try {
    const res = await fetch(`https://open.faceit.com/data/v4/players/${playerid}/bans`, {
      headers: {
        Authorization: `Bearer ${process.env.FACEIT_API_KEY}`,
      },
    });

    if (!res.ok) {
      throw new Error(`Faceit API returned ${res.status}`);
    }

    const data = await res.json();
    const isBanned = Array.isArray(data.items) && data.items.length > 0;

    return NextResponse.json({ banned: isBanned });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("Ban API error:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
