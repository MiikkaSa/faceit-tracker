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
        <div className="p-4 rounded-xl shadow-md border max-w-md mx-auto bg-white">
            <h2 className="text-xl font-semibold mb-3 text-center">{nickname}'s Stats</h2>
            <ul className="space-y-1 text-sm text-gray-800">
                <li><strong>Matches:</strong> {stats.Matches}</li>
                <li><strong>Wins:</strong> {stats.Wins}</li>
                <li><strong>Win Rate:</strong> {stats['Win Rate %']}%</li>
                <li><strong>Average K/D:</strong> {stats['Average K/D Ratio']}</li>
                <li><strong>Headshots:</strong> {stats['Average Headshots %']}%</li>
            </ul>
        </div>
    )
}
