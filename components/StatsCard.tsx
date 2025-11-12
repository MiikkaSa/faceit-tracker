"use client";

interface StatsCardProps {
  nickname: string;
  stats: {
    Matches: string;
    Wins: string;
    "Average K/D Ratio": string;
    "Average Headshots %": string;
    "Win Rate %": string;
  };
}

export default function StatsCard({ nickname, stats }: StatsCardProps) {
  const winRate = Number(stats["Win Rate %"]);
  const kdRatio = Number(stats["Average K/D Ratio"]);

  return (
    <div
      className="card max-w-md mx-auto text-[var(--color-text-light)] 
                 bg-[var(--color-bg-light)] border border-[var(--color-border)]
                 rounded-2xl p-6 md:p-8 shadow-md 
                 transition-all duration-300 
                 hover:shadow-xl hover:scale-[1.02] 
                 focus-within:ring-2 focus-within:ring-[var(--color-accent)]
                 backdrop-blur-sm"
      aria-label={`${nickname}'s performance statistics`}
    >
      {/* Otsikko */}
      <h2
        className="text-2xl font-bold mb-6 text-center flex items-center 
                   justify-center gap-2 text-[var(--color-accent)]"
      >
        📊 {nickname}&apos;s Stats
      </h2>

      {/* Tilastolista */}
      <ul className="space-y-3 text-base">
        {/* Matches */}
        <li className="flex justify-between items-center border-b border-[var(--color-border)] pb-2">
          <span className="font-semibold text-[var(--color-text-muted)]">
            Matches:
          </span>
          <span className="text-[var(--color-accent-alt)] font-medium">
            {stats.Matches}
          </span>
        </li>

        {/* Wins */}
        <li className="flex justify-between items-center border-b border-[var(--color-border)] pb-2">
          <span className="font-semibold text-[var(--color-text-muted)]">
            Wins:
          </span>
          <span className="text-green-400 font-medium">{stats.Wins}</span>
        </li>

        {/* Win Rate */}
        <li className="flex justify-between items-center border-b border-[var(--color-border)] pb-2">
          <span className="font-semibold text-[var(--color-text-muted)]">
            Win Rate:
          </span>
          <span
            className={`font-medium ${
              winRate >= 50 ? "text-green-400" : "text-red-400"
            }`}
          >
            {stats["Win Rate %"]}%
          </span>
        </li>

        {/* Average K/D */}
        <li className="flex justify-between items-center border-b border-[var(--color-border)] pb-2">
          <span className="font-semibold text-[var(--color-text-muted)]">
            Average K/D:
          </span>
          <span
            className={`font-medium ${
              kdRatio >= 1 ? "text-green-400" : "text-red-400"
            }`}
          >
            {stats["Average K/D Ratio"]}
          </span>
        </li>

        {/* Headshots */}
        <li className="flex justify-between items-center">
          <span className="font-semibold text-[var(--color-text-muted)]">
            Headshots:
          </span>
          <span className="text-[var(--color-accent-alt)] font-medium">
            {stats["Average Headshots %"]}%
          </span>
        </li>
      </ul>
    </div>
  );
}
