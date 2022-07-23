import axios from "axios";
import { useQueries } from "react-query";
import { Link } from "react-router-dom";
import KickaLogo from "../../components/KickaLogo";
import eloLogoIcon from "../../assets/elo.svg";
import tropyIcon from "../../assets/trophy.svg";
import GameTable from "./GamesTable";
import GameEntry from "./GameEntry";

const HomePage = () => {
    const query = useQueries([
        {
            queryKey: "user",
            queryFn: () => {
                const res = axios.get<UserData>("private/user");
                return res;
            },
        },
        {
            queryKey: "games",
            queryFn: async () => {
                const res = axios.get<GamesData>("private/games");
                return res;
            },
            refetchInterval: 20000,
        },
    ]);

    return (
        <div className="flex flex-col grow gap-5">
            <KickaLogo className="mb-12" />
            <h2>Welcome back, {query[0].data?.data.username}!</h2>
            <div className="flex flex-row justify-between">
                <div className="flex flex-row gap-3 items-center">
                    <img src={tropyIcon} className="h-8"></img>
                    <h2>{query[0].data?.data.position}.</h2>
                </div>
                <div className="flex flex-row gap-3 items-center">
                    <h2>{query[0].data?.data.elo_score}</h2>
                    <img src={eloLogoIcon} className="h-8"></img>
                </div>
            </div>
            {query[1].data?.data.games && (
                <GameTable gamesData={query[1].data.data} />
            )}
        </div>
    );
};

export default HomePage;
