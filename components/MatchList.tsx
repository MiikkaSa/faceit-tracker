"use client";
import React, { useState } from "react";
import Image from "next/image";

export default function MatchHistory({ matches }: { matches: any[] }) {
  const [expandedMatchId, setExpandedMatchId] = useState<string | null>(null);

  return (
    <div className="space-y-8">
      {matches.map((match) => {
        const stats = match.stats?.rounds?.[0];
        const teams = stats?.teams ?? [];
        const map = stats?.round_stats?.Map ?? "Unknown";

        const playerTeamIndex = teams.findIndex((t: any) =>
          t.players.some((p: any) => p.player_id === match.player_id)
        );

        const teamScores = teams.map((t: any) =>
          Number(t.team_stats?.["Final Score"] ?? 0)
        );

        const playerScore = teamScores[playerTeamIndex];
        const opponentScore = teamScores[1 - playerTeamIndex];
        const isWin = playerScore > opponentScore;

        return (
          <div
            key={match.match_id}
            role="button"
            tabIndex={0}
            aria-expanded={expandedMatchId === match.match_id}
            className={`card cursor-pointer transition-all duration-300 focus-visible:ring-4 
              ${
                isWin
                  ? "border-green-500 hover:border-green-400 focus-visible:ring-green-400"
                  : "border-red-500 hover:border-red-400 focus-visible:ring-red-400"
              }`}
            onClick={() =>
              setExpandedMatchId(
                expandedMatchId === match.match_id ? null : match.match_id
              )
            }
          >
            {/* Header */}
            <div className="flex justify-between items-center px-4 py-3 border-b border-[var(--color-border)]">
              <div className="text-sm text-[var(--color-text-muted)]">
                {new Date(match.finished_at * 1000).toLocaleDateString()}
              </div>
              <p className="text-lg font-semibold text-[var(--color-accent)]">
                {map !== "Unknown" ? `Map: ${map}` : "Unknown map"}
              </p>
            </div>

            {/* Scoreline */}
            <div className="flex justify-center items-center gap-4 py-3 text-center text-lg font-bold">
              {teams.length === 2 && (
                <>
                  <div className="flex-1 text-right text-[var(--color-text-light)] truncate">
                    <p>Team</p>
                    {teams[0].players?.[0]?.nickname ||
                      teams[0].nickname ||
                      "Team 1"}
                  </div>
                  <div className="text-2xl font-extrabold">
                    <span
                      className={
                        teamScores[0] > teamScores[1]
                          ? "text-green-400"
                          : teamScores[0] < teamScores[1]
                          ? "text-red-400"
                          : "text-gray-400"
                      }
                    >
                      {teamScores[0]}
                    </span>
                    <span className="mx-2 text-[var(--color-text-muted)]">
                      -
                    </span>
                    <span
                      className={
                        teamScores[1] > teamScores[0]
                          ? "text-green-400"
                          : teamScores[1] < teamScores[0]
                          ? "text-red-400"
                          : "text-gray-400"
                      }
                    >
                      {teamScores[1]}
                    </span>
                  </div>
                  <div className="flex-1 text-left text-[var(--color-text-light)] truncate">
                    <p>Team</p>
                    {teams[1].players?.[0]?.nickname ||
                      teams[1].nickname ||
                      "Team 2"}
                  </div>
                </>
              )}
            </div>

            {/* Expanded view */}
            {expandedMatchId === match.match_id && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 px-4 pb-5 mt-4">
                {teams.map((team: any, idx: number) => {
                  const sortedPlayers = [...team.players].sort((a, b) => {
                    const aKD =
                      a.player_stats && a.player_stats.Deaths > 0
                        ? a.player_stats.Kills / a.player_stats.Deaths
                        : 0;
                    const bKD =
                      b.player_stats && b.player_stats.Deaths > 0
                        ? b.player_stats.Kills / b.player_stats.Deaths
                        : 0;
                    return bKD - aKD;
                  });

                  return (
                    <div
                      key={team.team_id}
                      className="bg-[var(--color-bg-light)]/80 backdrop-blur-md rounded-xl p-3 border border-[var(--color-border)] shadow-sm hover:shadow-lg transition"
                    >
                      <h3
                        className={`text-center font-semibold mb-3 ${
                          idx === playerTeamIndex
                            ? "text-green-400"
                            : "text-red-400"
                        }`}
                      >
                        <p>Team</p>
                        {team.players?.[0]?.nickname ||
                          team.nickname ||
                          `Team ${idx + 1}`}
                      </h3>
                      <ul className="space-y-1 text-sm">
                        {sortedPlayers.map((p: any) => {
                          const kd =
                            p.player_stats && p.player_stats.Deaths > 0
                              ? (
                                  p.player_stats.Kills / p.player_stats.Deaths
                                ).toFixed(2)
                              : "0.00";
                          const kr =
                            p.player_stats?.["K/R Ratio"] ??
                            (p.player_stats?.Kills / 30).toFixed(2);

                          return (
                            <li
                              key={p.player_id}
                              className="group relative flex justify-between items-center bg-[var(--color-bg-dark)]/60 px-3 py-1.5 rounded-md border border-[var(--color-border)] hover:border-[var(--color-accent)] transition"
                            >
                              <div className="flex items-center gap-2">
                                <span className="font-medium text-[var(--color-text-light)]">
                                  {p.nickname}
                                </span>
                              </div>

                              {p.player_stats && (
                                <span className="text-[var(--color-text-muted)]">
                                  {p.player_stats.Kills}/{p.player_stats.Deaths}{" "}
                                  <span className="text-xs text-gray-400">
                                    (K/D {kd})
                                  </span>
                                </span>
                              )}

                              {/* Tooltip */}
                              {p.player_stats && (
                                <div className="absolute z-10 hidden group-hover:flex flex-col left-0 bottom-full mb-2 w-56 bg-[var(--color-bg-dark)] border border-[var(--color-border)] rounded-lg shadow-lg p-3 text-xs text-[var(--color-text-light)]">
                                  <p>
                                    <strong>Headshot %:</strong>{" "}
                                    {p.player_stats["Headshots %"] ?? "N/A"}
                                  </p>
                                  <p>
                                    <strong>ADR:</strong>{" "}
                                    {p.player_stats["ADR"] ?? "N/A"}
                                  </p>
                                  <p>
                                    <strong>MVPs:</strong>{" "}
                                    {p.player_stats["MVPs"] ?? "N/A"}
                                  </p>
                                  <p>
                                    <strong>K/R Ratio:</strong> {kr}
                                  </p>
                                </div>
                              )}
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
