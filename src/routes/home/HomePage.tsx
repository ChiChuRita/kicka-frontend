import axios from "axios";
import { useQueries } from "react-query";
import { Link } from "react-router-dom";
import KickaLogo from "../../components/KickaLogo";

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
                const res = axios.get("private/games");
                return res;
            },
        },
    ]);

    return (
        <div className="flex flex-col grow gap-5">
            <KickaLogo />
            <h2>Welcome back! {query[0].data?.data.username}</h2>
            <Link to="play">
                <button className="button bg-primary-action">Play</button>
            </Link>
            <div>
                <h1>Games</h1>
                <pre>{JSON.stringify(query[1].data?.data)}</pre>
            </div>
        </div>
    );
};

export default HomePage;
