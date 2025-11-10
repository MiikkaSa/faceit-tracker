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

  if (loading) return <p>Ladataan player details...</p>;
  if (error) return <p className="text-red-600">{error}</p>;
  if (!data) return null;

  return (
    <div className="p-6 rounded-2xl shadow-lg border border-gray-200 max-w-md mx-auto bg-gradient-to-br from-white via-gray-50 to-gray-100">
      <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
        👤 Player Details
      </h2>
      <div className="space-y-2 text-gray-700 text-base">
        {/* {data.avatar && (
          <Image
            src={data.avatar}
            alt="Avatar"
            width={64}
            height={64}
            className="rounded-full"
          />
        )} */}
        <p>
          <span className="font-semibold text-gray-600">Nickname:</span>{" "}
          <span className="text-indigo-600 font-medium">{data.nickname}</span>
        </p>
        {data.steam_nickname && (
          <p>
            <span className="font-semibold text-gray-600">Steam:</span>{" "}
            <span className="text-indigo-600 font-medium">
              {data.steam_nickname}
            </span>
          </p>
        )}
        {data.activated_at && (
          <p>
            <span className="font-semibold text-gray-600">Joined:</span>{" "}
            <span className="text-indigo-600 font-medium">
              {new Date(data.activated_at).toLocaleDateString()}
            </span>
          </p>
        )}
        {data.verified !== undefined && (
          <p>
            <span className="font-semibold text-gray-600">Verified:</span>{" "}
            <span className="text-indigo-600 font-medium">
              {data.verified === "true" ? "✅" : "❌"}
            </span>
          </p>
        )}
      </div>
    </div>
  );
}
