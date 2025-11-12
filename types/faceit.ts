/* 🔹 Pelaajan tiedot */
export interface Player {
  player_id: string;
  nickname: string;
  avatar?: string;
  country?: string;
  player_stats?: Record<string, string | number>;
}

/* 🔹 Joukkue */
export interface Team {
  team_id: string;
  nickname?: string;
  team_stats?: Record<string, string>;
  players: Player[];
}

/* 🔹 Kierroskohtaiset tilastot */
export interface RoundStats {
  Map?: string;
  [key: string]: string | number | undefined;
}

/* 🔹 Kierros (Round) */
export interface Round {
  round_stats?: RoundStats;
  teams?: Team[];
}

/* 🔹 Ottelun tilastot */
export interface MatchStats {
  rounds?: Round[];
}

/* 🔹 FACEIT-ottelu */
export interface Match {
  match_id: string;
  player_id: string;
  finished_at: number;
  stats?: MatchStats;
}

/* 🔹 Pelaajan lifetime-statistiikka (GET /players/{id}/stats) */
export interface LifetimeStats {
  Matches: string;
  Wins: string;
  "Average K/D Ratio": string;
  "Average Headshots %": string;
  "Win Rate %": string;
}

/* 🔹 Pelaajan yleiset tiedot (GET /players/{id}) */
export interface PlayerDetails {
  player_id: string;
  nickname: string;
  steam_nickname?: string;
  activated_at?: string;
  verified?: boolean | string;
  avatar?: string;
  country?: string;
  games?: {
    cs2?: {
      region: string;
      skill_level: number;
      faceit_elo: number;
    };
    csgo?: {
      region: string;
      skill_level: number;
      faceit_elo: number;
    };
  };
}

export interface SteamVanityResponse {
  response: {
    success: number;
    steamid?: string;
    message?: string;
  };
}
