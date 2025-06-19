'use client'

import { useState } from 'react'
import { DEFAULT_GAME_ID } from '@/utils/constants'
import StatsCard from './StatsCard'

export default function PlayerSearch() {
    const [nickname, setNickname] = useState('')
    const [playerId, setPlayerId] = useState<string | null>(null)
    const [stats, setStats] = useState<any>(null)
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
        setLoading(true)
        setError(null)
        try {
            const res = await fetch(`/api/stats/${playerId}/${DEFAULT_GAME_ID}`)
            const data = await res.json()
            if (res.ok) {
                setStats(data.lifetime)
            } else {
                setError('Failed to fetch stats')
                setStats(null)
            }
        } catch {
            setError('Failed to fetch stats')
            setStats(null)
        } finally {
            setLoading(false)
        }
    }

    async function handleSearch(e: React.FormEvent) {
        e.preventDefault()
        const id = await fetchPlayerId(nickname)
        if (id) {
            await fetchStats(id)
        }
    }

    return (
        <div className="max-w-md mx-auto p-4">
            <form onSubmit={handleSearch} className="mb-4">
                <input
                    type="text"
                    value={nickname}
                    onChange={e => setNickname(e.target.value)}
                    placeholder="Enter FACEIT nickname"
                    className="border p-2 w-full rounded"
                />
                <button type="submit" disabled={loading} className="mt-2 bg-blue-600 text-white p-2 rounded w-full">
                    {loading ? 'Loading...' : 'Search'}
                </button>
            </form>

            {error && <p className="text-red-600">{error}</p>}

            {stats && <StatsCard nickname={nickname} stats={stats} />}
        </div>
    )
}
