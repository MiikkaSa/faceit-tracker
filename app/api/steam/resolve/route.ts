import { NextResponse } from "next/server";
import { SteamVanityResponse } from "@/types/faceit";

const STEAM_API_KEY = process.env.STEAM_API_KEY;

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const customId = searchParams.get("customId");

  if (!customId) {
    return NextResponse.json(
      { error: "Missing customId parameter" },
      { status: 400 }
    );
  }

  try {
    // Jos käyttäjä antoi suoraan numerollisen SteamID64:n
    if (/^\d{17}$/.test(customId)) {
      return NextResponse.json({ steamid: customId });
    }

    // Jos käyttäjä antoi täyden URL:n
    if (customId.includes("steamcommunity.com")) {
      const profileMatch = customId.match(/\/profiles\/(\d{17})/);
      const vanityMatch = customId.match(/\/id\/([^\/]+)/);

      if (profileMatch) {
        // Profiili-URL sisältää jo steamid64:n
        return NextResponse.json({ steamid: profileMatch[1] });
      } else if (vanityMatch) {
        const vanityId = vanityMatch[1];
        return await resolveVanityId(vanityId);
      } else {
        return NextResponse.json(
          { error: "Invalid Steam URL format" },
          { status: 400 }
        );
      }
    }

    // Jos käyttäjä antoi pelkän custom ID:n
    return await resolveVanityId(customId);
  } catch (err) {
    const errorMessage =
    err instanceof Error ? err.message : "Steam resolve error";
    console.error("Steam resolve error:", errorMessage);
    return NextResponse.json(
      { error: errorMessage || "Unexpected Steam API error" },
      { status: 500 }
    );
  }
}

// Apufunktio vanity-ID:n ratkaisuun
async function resolveVanityId(vanityId: string) {
  if (!STEAM_API_KEY) {
    throw new Error("Missing Steam API key (STEAM_API_KEY not set)");
  }

  const url = `https://api.steampowered.com/ISteamUser/ResolveVanityURL/v1/?key=${STEAM_API_KEY}&vanityurl=${encodeURIComponent(
    vanityId
  )}`;

  const res = await fetch(url);
  const text = await res.text();

  if (!text) throw new Error("Empty response from Steam API");

  let data: SteamVanityResponse;
  try {
    data = JSON.parse(text) as SteamVanityResponse;
  } catch {
    throw new Error("Invalid JSON from Steam API");
  }

  if (!data.response || data.response.success !== 1) {
    throw new Error("Steam ID not found or invalid vanity URL");
  }

  return NextResponse.json({ steamid: data.response.steamid });
}
