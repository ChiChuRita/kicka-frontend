import axios from "axios";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import KickaLogo from "../../components/KickaLogo";

const HomePage = () => {
    const { data, isLoading } = useQuery("user", () => {
        return axios.get<UserData>("private/user");
    });

    return (
        <div className="flex flex-col grow gap-5">
            <KickaLogo />
            <h2>Welcome back! {data?.data.username}</h2>
            <Link to="play">
                <button className="button bg-primary-action">Play</button>
            </Link>
        </div>
    );
};

export default HomePage;
