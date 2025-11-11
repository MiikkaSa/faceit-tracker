"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

interface PlayerDetailsProps {
  playerId: string;
}

export default function PlayerDetails({ playerId }: PlayerDetailsProps) {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPlayer() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`/api/player/${playerId}`);
        const json = await res.json();
        if (!res.ok)
          throw new Error(json.error || "Failed to fetch player details");
        setData(json);
      } catch (err: any) {
        setError(err.message || "Failed to fetch player details");
      } finally {
        setLoading(false);
      }
    }

    fetchPlayer();
  }, [playerId]);

  if (loading)
    return (
      <div className="card max-w-md mx-auto text-center">
        <p className="text-[var(--color-text-muted)]">
          Ladataan player details...
        </p>
      </div>
    );

  if (error)
    return (
      <div className="card max-w-md mx-auto text-center border-red-500">
        <p className="text-red-400">{error}</p>
      </div>
    );

  if (!data) return null;

  return (
    <div
      className="card max-w-md mx-auto text-[var(--color-text-light)] 
             bg-[var(--color-bg-light)] border border-[var(--color-border)]
             rounded-2xl p-6 md:p-8 shadow-md 
             hover:shadow-xl hover:scale-[1.02]
             transition-all duration-300 ease-in-out
             focus-within:ring-2 focus-within:ring-[var(--color-accent)]
             backdrop-blur-sm"
    >
      <h2 className="text-2xl font-bold mb-5 flex items-center gap-2 text-[var(--color-accent)]">
        👤 Player Details
      </h2>

      <div className="flex items-center gap-4 mb-5">
        <div>
          <p className="text-xl font-semibold text-[var(--color-accent-alt)]">
            {data.nickname}
          </p>
          {data.verified !== undefined && (
            <p className="text-sm text-[var(--color-text-muted)] mt-1">
              Verified:{" "}
              <span className="text-[var(--color-accent)] font-medium">
                {data.verified === true || data.verified === "true"
                  ? "✅ Yes"
                  : "❌ No"}
              </span>
            </p>
          )}
        </div>
      </div>

      {/* Info grid */}
      <div className="space-y-3 text-sm">
        {data.steam_nickname && (
          <p>
            <span className="font-semibold text-[var(--color-text-muted)]">
              Steam:
            </span>{" "}
            <span className="text-[var(--color-accent)] font-medium">
              {data.steam_nickname}
            </span>
          </p>
        )}

        {data.activated_at && (
          <p>
            <span className="font-semibold text-[var(--color-text-muted)]">
              Joined:
            </span>{" "}
            <span className="text-[var(--color-accent-alt)] font-medium">
              {new Date(data.activated_at).toLocaleDateString()}
            </span>
          </p>
        )}

        {data.country && (
          <p>
            <span className="font-semibold text-[var(--color-text-muted)]">
              Country:
            </span>{" "}
            <span className="text-[var(--color-accent)] font-medium">
              {data.country.toUpperCase()}
            </span>
          </p>
        )}
      </div>
    </div>
  );
}
