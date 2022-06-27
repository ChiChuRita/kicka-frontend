export {};

//because of non-ts framework the User type is not inferable which really sucks
//this is a temporary workaround

declare global {
    type User = {
        id: string;
        username: string;
        elo: number;
        wins: number;
        games: number;
        ranking: number;
    };
}
