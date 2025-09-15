'use client'
import Image from 'next/image'
import { formatElo, getFaceitLevel } from '@/utils/formatUtils'

export default function EloCard({ elo, country }: { elo: number; country: string }) {
  const level = elo ? getFaceitLevel(elo) : null

  return (
    <div className="p-6 rounded-2xl shadow-lg border border-gray-200 max-w-md mx-auto bg-gradient-to-br from-white via-gray-50 to-gray-100">
      <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
        🎮 Player Info
      </h2>
      <div className="space-y-2 text-gray-700 text-base">
        <p className="flex items-center gap-2">
          <span className="font-semibold text-gray-600">ELO:</span>
          <span className="text-indigo-600 font-medium">
            {elo ? formatElo(elo) : 'N/A'}
          </span>
          {level && (
            <Image
              src={`/skill_level_${level}.png`}
              alt={`Faceit Level ${level}`}
              width={28}
              height={28}
              className="inline-block"
            />
          )}
        </p>
        <p>
          <span className="font-semibold text-gray-600">Country:</span>{' '}
          <span className="text-indigo-600 font-medium">{country ?? 'N/A'}</span>
        </p>
      </div>
    </div>
  )
}
