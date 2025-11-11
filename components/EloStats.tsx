"use client";
import { formatElo, getFaceitLevel } from "@/utils/formatUtils";
import Image from "next/image";

export default function EloCard({
  elo,
  csgoElo,
  country,
}: {
  elo: number | null;
  csgoElo: number | null;
  country: string | null;
}) {
  const level = elo ? getFaceitLevel(elo) : null;
  const csgoLevel = csgoElo ? getFaceitLevel(csgoElo) : null;

  return (
    <div
      className="card max-w-md mx-auto text-[var(--color-text-light)] 
             bg-[var(--color-bg-light)] border border-[var(--color-border)]
             rounded-2xl p-6 md:p-8 shadow-md 
             transition-all duration-300 
             hover:shadow-xl hover:scale-[1.02] 
             focus-within:ring-2 focus-within:ring-[var(--color-accent)]
             backdrop-blur-sm"
    >
      <h2 className="text-2xl font-bold mb-4 flex items-center gap-2 text-[var(--color-accent)]">
        🎮 Player Info
      </h2>

      <div className="space-y-4 text-base">
        {/* CS2 ELO */}
        <div>
          <p className="font-semibold text-[var(--color-text-muted)] mb-1">
            CS2 ELO:
          </p>
          <div className="flex items-center gap-3">
            <span className="text-[var(--color-accent)] font-medium text-lg">
              {elo ? formatElo(elo) : "N/A"}
            </span>
            {level && (
              <Image
                src={`/skill_level_${level}.png`}
                alt={`Faceit Level ${level}`}
                width={30}
                height={30}
                className="inline-block"
              />
            )}
          </div>
        </div>

        {/* CS:GO ELO */}
        {csgoElo && (
          <div>
            <p className="font-semibold text-[var(--color-text-muted)] mb-1">
              CS:GO ELO:
            </p>
            <div className="flex items-center gap-3">
              <span className="text-[var(--color-accent-alt)] font-medium text-lg">
                {csgoElo ? formatElo(csgoElo) : "N/A"}
              </span>
              {csgoLevel && (
                <Image
                  src={`/skill_level_${csgoLevel}.png`}
                  alt={`Faceit Level ${csgoLevel}`}
                  width={30}
                  height={30}
                  className="inline-block"
                />
              )}
            </div>
          </div>
        )}

        {/* Country */}
        <div>
          <p className="font-semibold text-[var(--color-text-muted)] mb-1">
            Country:
          </p>
          <span className="text-[var(--color-accent)] font-medium">
            {country ?? "N/A"}
          </span>
        </div>
      </div>
    </div>
  );
}
