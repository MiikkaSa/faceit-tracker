"use client";

import Image from "next/image";
import { formatElo, getFaceitLevel } from "@/utils/formatUtils";

interface EloCardProps {
  elo: number | null;
  csgoElo: number | null;
  country: string | null;
}

export default function EloCard({ elo, csgoElo, country }: EloCardProps) {
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
      <h2
        className="text-2xl font-bold mb-4 flex items-center gap-2 
                   text-[var(--color-accent)]"
      >
        🎮 Player Info
      </h2>

      <div className="space-y-4 text-base">
        {/* CS2 ELO */}
        <section aria-label="CS2 statistics">
          <p className="font-semibold text-[var(--color-text-muted)] mb-1">
            CS2 ELO:
          </p>
          <div className="flex items-center gap-3">
            <span className="text-[var(--color-accent)] font-medium text-lg">
              {elo !== null ? formatElo(elo) : "N/A"}
            </span>
            {level && (
              <Image
                src={`/skill_level_${level}.png`}
                alt={`CS2 Faceit Level ${level}`}
                width={30}
                height={30}
                className="inline-block"
                priority
              />
            )}
          </div>
        </section>

        {/* CS:GO ELO */}
        {csgoElo !== null && (
          <section aria-label="CS:GO statistics">
            <p className="font-semibold text-[var(--color-text-muted)] mb-1">
              CS:GO ELO:
            </p>
            <div className="flex items-center gap-3">
              <span className="text-[var(--color-accent-alt)] font-medium text-lg">
                {formatElo(csgoElo)}
              </span>
              {csgoLevel && (
                <Image
                  src={`/skill_level_${csgoLevel}.png`}
                  alt={`CS:GO Faceit Level ${csgoLevel}`}
                  width={30}
                  height={30}
                  className="inline-block"
                  priority
                />
              )}
            </div>
          </section>
        )}

        {/* Country */}
        <section aria-label="Player country">
          <p className="font-semibold text-[var(--color-text-muted)] mb-1">
            Country:
          </p>
          <span className="text-[var(--color-accent)] font-medium">
            {country ?? "N/A"}
          </span>
        </section>
      </div>
    </div>
  );
}
