export function formatKD(kd: string | number): string {
    const ratio = typeof kd === 'string' ? parseFloat(kd) : kd;
    return ratio.toFixed(2);
}

export function formatElo(elo: number): string {
    return elo.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}