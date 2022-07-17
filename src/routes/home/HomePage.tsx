import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import KickaLogo from "../../components/KickaLogo";

const HomePage = () => {
    const [searchParams, setSearchParams] = useSearchParams();

    return (
        <div>
            <KickaLogo />
            {searchParams.get("login") ? "login" : "home"}
            <div>Testing some stuff...</div>
        </div>
    );
};

export default HomePage;
