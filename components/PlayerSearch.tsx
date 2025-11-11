"use client";

import { useState } from "react";
import { DEFAULT_GAME_ID } from "@/utils/constants";
import StatsCard from "./StatsCard";
import BanCard from "./BanInfo";
import EloCard from "./EloStats";
import MatchHistory from "./MatchList";
import PlayerDetails from "./PlayerCard";

export default function PlayerSearch() {
  const [nickname, setNickname] = useState("");
  const [playerId, setPlayerId] = useState<string | null>(null);
  const [stats, setStats] = useState<any>(null);
  const [ban, setBan] = useState<boolean | null>(null);
  const [elo, setElo] = useState<number | null>(null);
  const [csgoElo, setCsgoElo] = useState<number | null>(null);
  const [country, setCountry] = useState<string | null>(null);
  const [matches, setMatches] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function fetchPlayerId(nick: string) {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(
        `/api/overview?nickname=${encodeURIComponent(
          nick
        )}&game=${DEFAULT_GAME_ID}`
      );
      const data = await res.json();
      if (res.ok && data.player_id) {
        setPlayerId(data.player_id);
        setElo(data.games?.cs2?.faceit_elo ?? null);
        setCountry(data.country ?? null);
        setCsgoElo(data.games?.csgo.faceit_elo ?? null);
        return data.player_id;
      } else {
        setError("Player not found");
        setPlayerId(null);
        return null;
      }
    } catch {
      setError("Failed to fetch player ID");
      setPlayerId(null);
      return null;
    } finally {
      setLoading(false);
    }
  }

  async function fetchStats(playerId: string) {
    try {
      const res = await fetch(`/api/stats/${playerId}/${DEFAULT_GAME_ID}`);
      const data = await res.json();
      if (res.ok) setStats(data.lifetime);
      else setError("Failed to fetch stats");
    } catch {
      setError("Failed to fetch stats");
    }
  }

  async function fetchBan(playerId: string) {
    try {
      const res = await fetch(`/api/ban/${playerId}`);
      const data = await res.json();
      if (res.ok) setBan(data.banned);
    } catch {}
  }

  async function fetchMatches(playerId: string) {
    try {
      const res = await fetch(`/api/matches/${playerId}`);
      const data = await res.json();
      if (res.ok) {
        setMatches(data);
      } else {
        setMatches([]);
      }
    } catch {
      setMatches([]);
    }
  }

  async function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    const id = await fetchPlayerId(nickname);
    if (id) {
      await Promise.all([fetchStats(id), fetchBan(id), fetchMatches(id)]);
    }
  }

  return (
    <div className="max-w-3xl mx-auto p-6 text-gray-100">
      {/* Hakulomake */}
      <form
        onSubmit={handleSearch}
        className="mb-6 bg-[var(--color-bg-light)] border border-[var(--color-border)] 
                   rounded-xl shadow-md p-5 backdrop-blur-sm transition-all duration-300"
      >
        <label
          htmlFor="nickname"
          className="block mb-2 font-semibold text-[var(--color-accent)]"
        >
          Enter FACEIT nickname
        </label>
        <div className="flex gap-2">
          <input
            id="nickname"
            type="text"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            placeholder="e.g. s1mple, ropz, zywoo"
            className="flex-1 p-3 rounded-lg border border-[var(--color-border)] 
                       bg-[var(--color-bg-dark)] text-gray-100 placeholder-gray-400
                       focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
          />
          <button
            type="submit"
            disabled={loading}
            className="px-5 py-3 rounded-lg bg-[var(--color-accent)] 
                       text-white font-semibold hover:bg-[var(--color-accent-alt)] 
                       transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? "Loading..." : "Search"}
          </button>
        </div>
      </form>

      {/* Virheilmoitus */}
      {error && (
        <p className="text-red-400 text-center mb-4 font-medium">{error}</p>
      )}

      {/* Kortit */}
      <div
        className="flex flex-wrap gap-6 justify-center 
                   max-w-6xl mx-auto mt-10"
      >
        {stats && (
          <div className="flex-2 min-w-[280px]">
            <StatsCard nickname={nickname} stats={stats} />
          </div>
        )}
        {elo && country && (
          <div className="flex-2 min-w-[280px]">
            <EloCard elo={elo} country={country} csgoElo={csgoElo} />
          </div>
        )}
        {ban !== null && (
          <div className="flex-1 min-w-[280px]">
            <BanCard banned={ban} />
          </div>
        )}
        {playerId && (
          <div className="flex-1 min-w-[280px]">
            <PlayerDetails playerId={playerId} />
          </div>
        )}
      </div>

      {/* Otteluhistoria */}
      {matches.length > 0 && (
        <div className="max-w-5xl mx-auto mt-12">
          <MatchHistory matches={matches} />
        </div>
      )}
    </div>
  );
}
