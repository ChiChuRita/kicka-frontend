import axios from "axios";
axios.defaults.baseURL =
    process.env.REACT_APP_API_URL || "http://localhost:8080/api";
console.log("API URL: ", process.env.REACT_APP_API_URL);

//tempoaray
interface User {
    id: string;
    username: string;
    elo_score: number;
    games_played: number;
    wins: number;
}

interface Team {
    teamname: string;
    username1: string;
    username2: string;
    elo_score: number;
    games_played: number;
    wins: number;
}

interface Game {
    id: number;
    entity_name1: string;
    entity_name2: string;
    time_started: string;
    time_ended: string;
    score1: number;
    score2: number;
    is_draft: boolean;
}

interface SingleRankingData {
    User: User[];
}

export const fetchSingleRankingData = async () => {
    return axios.get<SingleRankingData>("private/ranking/single");
};

interface TeamRankingData {
    User: User[];
}

export const fetchTeamRankingData = async () => {
    return axios.get<TeamRankingData>("private/ranking/single");
};

interface CallbackData {
    token: string;
    isRegistered: boolean;
}

export const fetchCallback = async (code: string, state: string) => {
    const { data } = await axios.post<CallbackData>("/public/callback", null, {
        params: { code, state },
    });
    return data;
};
