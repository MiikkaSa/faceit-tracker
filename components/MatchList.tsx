'use client'
import { useEffect, useState } from 'react'

export default function MatchList({ matches }: { matches: any[] }) {
    return (
<div className="p-6 rounded-2xl shadow-lg border border-gray-200 max-w-2xl mx-auto bg-gradient-to-br from-white via-gray-50 to-gray-100 mt-6">
  <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
    📅 Last 30 Matches
  </h2>
  <ul className="divide-y divide-gray-200 text-base text-gray-700">
    {matches?.length > 0 ? (
      matches.map((match) => (
        <li key={match.match_id} className="py-3 flex justify-between items-center">
          <span className="text-gray-600">
            {new Date(match.finished_at * 1000).toLocaleDateString()}
          </span>
          <span className="text-indigo-600 font-medium truncate">
            Match ID: {match.match_id}
          </span>
        </li>
      ))
    ) : (
      <li className="py-4 text-gray-500 italic">No recent matches found.</li>
    )}
  </ul>
</div>

    )
}