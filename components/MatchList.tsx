"use client";
import React, { useState } from "react";

export default function MatchHistory({ matches }: { matches: any[] }) {
  const [expandedMatchId, setExpandedMatchId] = useState<string | null>(null);

  return (
    <div className="space-y-6">
      {matches.map((match) => {
        const stats = match.stats?.rounds?.[0];
        const teams = stats?.teams ?? [];
        const map = stats?.round_stats?.Map ?? "Unknown";

        // Pelaajan joukkueen indeksi
        const playerTeamIndex = teams.findIndex((t: any) =>
          t.players.some((p: any) => p.player_id === match.player_id)
        );

        // Tiimien pisteet
        const teamScores = teams.map(
          (t: any) => t.team_stats?.["Final Score"] ?? 0
        );

        return (
          <div
            key={match.match_id}
            className="border rounded-lg p-4 cursor-pointer transition-all duration-200"
            onClick={() =>
              setExpandedMatchId(
                expandedMatchId === match.match_id ? null : match.match_id
              )
            }
          >
            {/* Perustiedot */}
            <div className="flex justify-between items-center mb-2 text-black bg-white">
              <p className="text-sm">
                {new Date(match.finished_at * 1000).toLocaleDateString()}
              </p>
              <p className="font-semibold">Map: {map}</p>
            </div>

            {/* Score ja tiimit värillisinä */}
            <div className="flex gap-2 mb-2 bg-white">
              {teams.map((t: any, idx: number) => {
                const isWinner = teamScores[idx] > teamScores[1 - idx];
                const colorClass = isWinner ? "text-green-600" : "text-red-600";

                return (
                  <p key={t.team_id} className={`${colorClass} font-semibold`}>
                    {t.nickname || `Team ${idx + 1}`}({teamScores[idx]})
                  </p>
                );
              })}
            </div>

            {/* Laajennettu näkymä */}
            {expandedMatchId === match.match_id && (
              <div className="grid grid-cols-2 gap-6 mt-4 text-black bg-white">
                {teams.map((t: any, idx: number) => (
                  <div key={t.team_id} className="space-y-1">
                    <ul className="space-y-1">
                      {t.players.map((p: any) => (
                        <li
                          key={p.player_id}
                          className="flex items-center gap-2 bg-white p-1 rounded shadow-sm hover:shadow-md transition"
                        >
                          {/* <img
                            src={p.avatar}
                            alt={p.nickname}
                            className="w-6 h-6 rounded-full"
                          /> */}
                          <div className="flex-1 text-black">
                            <span className="font-medium">{p.nickname}</span>
                            {p.player_stats && (
                              <span className="text-xs ml-2">
                                K/D: {p.player_stats.Kills}/
                                {p.player_stats.Deaths}
                              </span>
                            )}
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
