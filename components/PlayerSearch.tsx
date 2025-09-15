'use client'

import { useState, useEffect } from 'react'
import { DEFAULT_GAME_ID } from '@/utils/constants'
import StatsCard from './StatsCard'
import BanCard from './BanInfo'
import EloCard from './EloStats'
import MatchHistory from './MatchList'

export default function PlayerSearch() {
  const [nickname, setNickname] = useState('')
  const [playerId, setPlayerId] = useState<string | null>(null)
  const [stats, setStats] = useState<any>(null)
  const [ban, setBan] = useState<boolean | null>(null)
  const [elo, setElo] = useState<number | null>(null)
  const [country, setCountry] = useState<string | null>(null)
  const [matches, setMatches] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function fetchPlayerId(nick: string) {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch(`/api/overview?nickname=${encodeURIComponent(nick)}&game=${DEFAULT_GAME_ID}`)
      const data = await res.json()
      if (res.ok && data.player_id) {
        setPlayerId(data.player_id)
        setElo(data.games?.cs2?.faceit_elo ?? null)
        setCountry(data.country ?? null)
        return data.player_id
      } else {
        setError('Player not found')
        setPlayerId(null)
        return null
      }
    } catch {
      setError('Failed to fetch player ID')
      setPlayerId(null)
      return null
    } finally {
      setLoading(false)
    }
  }

  async function fetchStats(playerId: string) {
    try {
      const res = await fetch(`/api/stats/${playerId}/${DEFAULT_GAME_ID}`)
      const data = await res.json()
      if (res.ok) setStats(data.lifetime)
      else setError('Failed to fetch stats')
    } catch {
      setError('Failed to fetch stats')
    }
  }

  async function fetchBan(playerId: string) {
    try {
      const res = await fetch(`/api/ban/${playerId}`)
      const data = await res.json()
      if (res.ok) setBan(data.banned)
    } catch {}
  }

  async function fetchMatches(playerId: string) {
    try {
      const res = await fetch(`/api/matches/${playerId}`)
      const data = await res.json()
      if (res.ok) setMatches(data.items || [])
    } catch {}
  }

  async function handleSearch(e: React.FormEvent) {
    e.preventDefault()
    const id = await fetchPlayerId(nickname)
    if (id) {
      await Promise.all([
        fetchStats(id),
        fetchBan(id),
        fetchMatches(id),
      ])
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      <form onSubmit={handleSearch} className="mb-4">
        <input
          type="text"
          value={nickname}
          onChange={e =>setNickname(e.target.value)}
          placeholder="Enter FACEIT nickname"
          className="border p-2 w-full rounded"
        />
        <button type="submit" disabled={loading} className="mt-2 bg-blue-600 text-white p-2 rounded w-full">
          {loading ? 'Loading...' : 'Search'}
        </button>
      </form>

      {error && <p className="text-red-600">{error}</p>}

      <div className="flex flex-wrap gap-6 justify-center max-w-5xl mx-auto mt-8">
  {stats && <div className="flex-1 min-w-[280px]">{<StatsCard nickname={nickname} stats={stats} />}</div>}
  {elo && country && <div className="flex-1 min-w-[280px]">{<EloCard elo={elo} country={country} />}</div>}
  {ban !== null && <div className="flex-1 min-w-[280px]">{<BanCard banned={ban} />}</div>}
</div>

{matches.length > 0 && (
  <div className="max-w-4xl mx-auto mt-8">
    <MatchHistory matches={matches} />
  </div>
)}

    </div>
  )
}