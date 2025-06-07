import { FACEIT_API_BASE } from "@/utils/constants";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
    req: NextRequest,
    context: { params: { playerid: string; gameid: string } } | Promise<{ params: { playerid: string; gameid: string } }>
) {
    // awaitataan context, jos se on Promise
    const { params } = await context;

    const { searchParams } = new URL(req.url);
    const offset = searchParams.get('offset') ?? '0';
    const limit = searchParams.get('limit') ?? '20';
    const from = searchParams.get('from');
    const to = searchParams.get('to');

    const url = new URL(`${FACEIT_API_BASE}/players/${params.playerid}/stats/${params.gameid}`);
    url.searchParams.set('offset', offset);
    url.searchParams.set('limit', limit);
    if (from) url.searchParams.set('from', from);
    if (to) url.searchParams.set('to', to);

    const res = await fetch(url.toString(), {
        headers: {
            Authorization: `Bearer ${process.env.FACEIT_API_KEY}`,
        },
    });

    if (!res.ok) {
        return NextResponse.json({ error: 'Failed to fetch stats' }, { status: res.status });
    }

    const data = await res.json();
    return NextResponse.json(data);
}
