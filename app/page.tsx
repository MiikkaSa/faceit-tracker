// app/page.tsx
import StatsCard from '@/components/StatsCard'
import PlayerSearch from '../components/PlayerSearch'
import PlayerCard from '@/components/PlayerCard'
import MatchHistory from '@/components/MatchList'

export default function HomePage() {
  return (
    <main>
      <h1 className="text-center text-2xl font-bold my-4">FACEIT Player Stats</h1>
      <PlayerSearch />
    </main>
  )
}
