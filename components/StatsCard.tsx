// app/components/StatsCard.tsx
type StatsCardProps = {
    nickname: string
    stats: {
        Matches: string
        Wins: string
        'Average K/D Ratio': string
        'Average Headshots %': string
        'Win Rate %': string
    }
}

export default function StatsCard({ nickname, stats }: StatsCardProps) {
    return (
        <div className="p-6 rounded-2xl shadow-lg border border-gray-200 max-w-md mx-auto bg-gradient-to-br from-white via-gray-50 to-gray-100 mt-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center flex items-center justify-center gap-2">
          📊 {nickname}'s Stats
        </h2>
        <ul className="space-y-2 text-base text-gray-700">
          <li>
            <span className="font-semibold text-gray-600">Matches:</span>{' '}
            <span className="text-indigo-600 font-medium">{stats.Matches}</span>
          </li>
          <li>
            <span className="font-semibold text-gray-600">Wins:</span>{' '}
            <span className="text-indigo-600 font-medium">{stats.Wins}</span>
          </li>
          <li>
            <span className="font-semibold text-gray-600">Win Rate:</span>{' '}
            <span className="text-indigo-600 font-medium">{stats['Win Rate %']}%</span>
          </li>
          <li>
            <span className="font-semibold text-gray-600">Average K/D:</span>{' '}
            <span className="text-indigo-600 font-medium">{stats['Average K/D Ratio']}</span>
          </li>
          <li>
            <span className="font-semibold text-gray-600">Headshots:</span>{' '}
            <span className="text-indigo-600 font-medium">{stats['Average Headshots %']}%</span>
          </li>
        </ul>
      </div>
      
    )
}
