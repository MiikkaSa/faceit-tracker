'use client'
import { useEffect, useState } from 'react'

export default function PlayerOverview({ nickname }: { nickname: string }) {
    const [data, setData] = useState<any>(null)

    useEffect(() => {
        fetch(`/api/overview?nickname=${nickname}&game=cs2`)
            .then(res => res.json())
            .then(setData)
    }, [nickname])

    if (!data) return <p>Ladataan...</p>
    return (
        <div>
            <h2>{data.nickname}</h2>
            <p>Country: {data.country}</p>
            <p>ELO: {data.games?.cs2?.faceit_elo}</p>
            <p>Level: {data.games?.cs2?.skill_level}</p>
        </div>

    )
}