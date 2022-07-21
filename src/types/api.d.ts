interface RankingElementData {
    ranking: number;
    username: string;
    elo: number;
    games: number;
    wins: number;
}

interface RankingData {
    ranking: RankingElementData[];
    lastQuery: number;
}

interface AuthData {
    isRegistered: boolean;
    token: string;
}

interface UserData {
    id: string;
    username: string;
    elo_score: number;
    games_played: number;
    wins: number;
}
