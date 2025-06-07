export function epochToDate(epoch: number): string {
    const date = new Date(epoch);
    return date.toLocaleDateString('fi-FI');
}

export function epochToTime(epoch: number): string {
    const date = new Date(epoch);
    return date.toLocaleTimeString('fi-FI');
}