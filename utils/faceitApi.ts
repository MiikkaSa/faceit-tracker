import { FACEIT_API_BASE } from "./constants";

const FACEIT_API = FACEIT_API_BASE;

const headers = {
    Authorization: `Bearer ${process.env.FACEIT_API_KEY}`,
};

export async function getPlayerByNickname(nickname: string) {
    const res = await fetch(`${FACEIT_API}/players?nickname=${nickname}`, {
        headers,
    });
    if (!res.ok) throw new Error('Failed to fetch player data');
    return res.json();
}

export async function getPlayerStats(playerId: string, gameId: string) {
    const res = await fetch(`${FACEIT_API}/players/${playerId}/stats/${gameId}`, {
        headers,
    });
    if (!res.ok) throw new Error('Failed to fetch player stats');
    return res.json();
}

export async function getPlayerMatches(playerId: string, limit = 30, offset = 0) {
    const url = new URL(`${FACEIT_API}/players/${playerId}/history`);
    url.searchParams.set('limit', limit.toString());
    url.searchParams.set('offset', offset.toString());
    url.searchParams.set('game', 'cs2');

    const res = await fetch(url.toString(), { headers });
    if (!res.ok) throw new Error('Failed to fetch match history');
    return res.json();
}

export async function getMatchStats(matchId: string) {
    const res = await fetch (`${FACEIT_API}/matches/${matchId}/stats`, {
        headers,
    })
    if (!res.ok) throw new Error('Failed to fetch match stats')
    return res.json()
}

export async function getPlayerDetails(playerId: string) {
    const res = await fetch(`${FACEIT_API_BASE}/players/${playerId}`, { headers })
    if (!res.ok) throw new Error('Failed to fetch player details')
    return res.json()
  } 
