// app/components/StatsCard.tsx
type StatsCardProps = {
  nickname: string;
  stats: {
    Matches: string;
    Wins: string;
    "Average K/D Ratio": string;
    "Average Headshots %": string;
    "Win Rate %": string;
  };
};

export default function StatsCard({ nickname, stats }: StatsCardProps) {
  return (
    <div
      className="p-6 rounded-2xl border border-[var(--color-border)] 
                 bg-[var(--color-bg-light)] text-[var(--color-text-light)] 
                 shadow-md hover:shadow-lg transition-all duration-300 
                 max-w-md mx-auto backdrop-blur-sm"
    >
      {/* Otsikko */}
      <h2 className="text-2xl font-bold mb-6 text-center flex items-center justify-center gap-2 text-[var(--color-accent)]">
        📊 {nickname}'s Stats
      </h2>

      {/* Tilastolista */}
      <ul className="space-y-3 text-base">
        <li className="flex justify-between items-center border-b border-[var(--color-border)] pb-2">
          <span className="font-semibold text-[var(--color-text-muted)]">
            Matches:
          </span>
          <span className="text-[var(--color-accent-alt)] font-medium">
            {stats.Matches}
          </span>
        </li>

        <li className="flex justify-between items-center border-b border-[var(--color-border)] pb-2">
          <span className="font-semibold text-[var(--color-text-muted)]">
            Wins:
          </span>
          <span className="text-green-400 font-medium">{stats.Wins}</span>
        </li>

        <li className="flex justify-between items-center border-b border-[var(--color-border)] pb-2">
          <span className="font-semibold text-[var(--color-text-muted)]">
            Win Rate:
          </span>
          <span
            className={`font-medium ${
              Number(stats["Win Rate %"]) >= 50
                ? "text-green-400"
                : "text-red-400"
            }`}
          >
            {stats["Win Rate %"]}%
          </span>
        </li>

        <li className="flex justify-between items-center border-b border-[var(--color-border)] pb-2">
          <span className="font-semibold text-[var(--color-text-muted)]">
            Average K/D:
          </span>
          <span
            className={`font-medium ${
              Number(stats["Average K/D Ratio"]) >= 1
                ? "text-green-400"
                : "text-red-400"
            }`}
          >
            {stats["Average K/D Ratio"]}
          </span>
        </li>

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
