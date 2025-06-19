'use client'
import { useEffect, useState } from 'react'

export default function MatchHistory({ playerId }: { playerId: string }) {
    const [matches, setMatches] = useState<any[]>([])

    useEffect(() => {
        fetch(`/api/matches/${playerId}`)
            .then(res => res.json())
            .then(data => setMatches(data.items || []))
    }, [playerId])

    if (!matches.length) return <p>Ei matseja</p>
    return (
        <div>
            <h3>Viimeisimmät pelit</h3>
            <ul>
                {matches.map(match => (
                    <li key={match.match_id}>
                        {match.game_mode} – {new Date(match.finished_at * 1000).toLocaleDateString()}
                    </li>
                ))}
            </ul>
        </div>
    )
}