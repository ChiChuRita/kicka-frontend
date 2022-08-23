import axios from "axios";
import { useQueries } from "react-query";
import KickaLogo from "../../components/KickaLogo";
import trophyIcon from "../../assets/trophy.svg";
import GameTable from "./GamesTable";

const HomePage = () => {
    const query = useQueries([
        {
            queryKey: "user",
            queryFn: () => {
                const res = axios.get<UserData>("private/user");
                return res;
            },
            refetchInterval: 1000,
        },
        {
            queryKey: "games",
            queryFn: async () => {
                const res = axios.get<GamesData>("private/games");
                return res;
            },
            refetchInterval: 1000,
        },
    ]);

    return (
        <div className="flex flex-col grow gap-5">
            <KickaLogo />
            <div className="flex flex-row justify-between items-end py-4">
                <div className="flex flex-col">
                    <h2>Welcome back,</h2>
                    <h1>{query[0].data?.data.username}!</h1>
                </div>
                <div className="flex flex-row gap-2 items-center">
                    <img
                        src={trophyIcon}
                        alt="Trophy"
                        className="h-6 drop-shadow-gold"
                    />
                    <h1>{query[0].data?.data.position}.</h1>
                </div>
            </div>
            {query[0].data && query[1].data?.data && (
                <GameTable
                    gamesData={query[1].data.data}
                    username={query[0].data!.data.username}
                />
            )}
        </div>
    );
};

export default HomePage;
