// app/page.tsx
import PlayerSearch from '../components/PlayerSearch'

export default function HomePage() {
  return (
    <main>
      <h1 className="text-center text-2xl font-bold my-4">FACEIT Player Stats</h1>
      <PlayerSearch />
    </main>
  )
}
