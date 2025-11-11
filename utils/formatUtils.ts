export function formatElo(elo: number): string {
    const formattedElo = elo.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
    return `${formattedElo}`;
  }
  
  export function getFaceitLevel(elo: number): number {
    if (elo >= 2001) return 10;
    if (elo >= 1851) return 9;
    if (elo >= 1701) return 8;
    if (elo >= 1551) return 7;
    if (elo >= 1401) return 6;
    if (elo >= 1251) return 5;
    if (elo >= 1101) return 4;
    if (elo >= 951) return 3;
    if (elo >= 801) return 2;
    return 1;
  }
  
