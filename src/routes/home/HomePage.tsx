import axios from "axios";
import { useEffect } from "react";
import { useQueries, useQuery } from "react-query";
import { useSearchParams } from "react-router-dom";
import KickaLogo from "../../components/KickaLogo";

const HomePage = () => {
    const [searchParams, setSearchParams] = useSearchParams();

    const { data, isLoading } = useQuery("user", () => {
        return axios.get<UserData>("private/user");
    });

    return (
        <div>
            <KickaLogo />
            <h2>Welcome back! {data?.data.username}</h2>
        </div>
    );
};

export default HomePage;
