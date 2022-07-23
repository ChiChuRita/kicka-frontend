interface RankingElementData {
    ranking: number;
    username: string;
    elo: number;
    games: number;
    wins: number;
    position: number;
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
    position: number;
}

interface GameData {
    id: number;
    entity_name1: string;
    entity_name2: srting;
    time_started: string;
    time_ended: string;
    score1: number;
    score2: number;
}
