interface RankingElementData {
    ranking: number;
    username: string;
    elo: number;
    games: number;
    wins: number;
}

interface RankingData {
    ranking: RankingElementData[];
}
