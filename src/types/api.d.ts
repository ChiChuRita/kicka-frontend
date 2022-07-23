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
    hasNext: boolean;
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

interface GamesData {
    continues: boolean;
    games: GameData[] | null;
}

interface GameData {
    id: number;
    user_name1: string;
    user_name2: srting;
    time_started: string;
    time_ended: string;
    score1: number;
    score2: number;
    elo_user1: number;
    elo_user2: number;
    elo_change1: number;
    elo_change2: number;
    is_draft: number;
    user1ack: number;
    user2ack: number;
}
