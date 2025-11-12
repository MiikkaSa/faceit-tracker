import { NextResponse } from "next/server";

const FACEIT_API_KEY = process.env.FACEIT_API_KEY;
const BASE_URL = "https://open.faceit.com/data/v4";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const nickname = searchParams.get("nickname");
  const steamId = searchParams.get("steamId");
  const game = searchParams.get("game") || "cs2";

  if (!nickname && !steamId) {
    return NextResponse.json(
      { error: "Missing nickname or steamId parameter" },
      { status: 400 }
    );
  }

  try {
    let url = "";

    if (steamId) {
      // 🔹 Jos haetaan Steam ID:llä
      url = `${BASE_URL}/players?game=${game}&game_player_id=${steamId}`;
    } else if (nickname) {
      // 🔹 Jos haetaan Faceit-nickillä
      url = `${BASE_URL}/players?nickname=${encodeURIComponent(nickname)}`;
    }

    const res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${FACEIT_API_KEY}`,
      },
      next: { revalidate: 60 },
    });

    // 🔹 Luetaan aina ensin raakateksti (voi olla JSON, virhesivu tai tyhjä)
    const raw = await res.text();

    if (!res.ok) {
      console.error("FACEIT API returned error:", res.status, raw);
      return NextResponse.json(
        { error: `FACEIT API returned ${res.status}`, details: raw || "No response body" },
        { status: res.status }
      );
    }

    // 🔹 Jos vastaus on tyhjä
    if (!raw) {
      console.error("Empty response body from Faceit API");
      return NextResponse.json(
        { error: "Empty response body from Faceit API" },
        { status: 502 }
      );
    }

    // 🔹 Yritetään jäsentää JSON turvallisesti
    let data;
    try {
      data = JSON.parse(raw);
    } catch (parseErr) {
      console.error("Failed to parse Faceit API JSON:", parseErr);
      return NextResponse.json(
        { error: "Invalid JSON from Faceit API", raw },
        { status: 500 }
      );
    }

    if (!data || !data.player_id) {
      return NextResponse.json(
        { error: "Player not found", raw },
        { status: 404 }
      );
    }

    return NextResponse.json(data);
  } catch (err) {
    const errorMessage =
    err instanceof Error ? err.message : "Overview API error"
    console.error("Overview API error:", errorMessage);
    return NextResponse.json(
      { error: errorMessage || "Unexpected server error" },
      { status: 500 }
    );
  }
}
