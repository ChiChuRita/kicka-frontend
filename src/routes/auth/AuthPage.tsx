import axios from "axios";
import { useQuery } from "react-query";
import { Navigate, useSearchParams } from "react-router-dom";

export const AuthPage = () => {
    const [searchParams, setSearchParams] = useSearchParams();

    const code = searchParams.get("code");
    const state = searchParams.get("state");
    const sessionState = searchParams.get("session_state");

    const { isLoading, data, isError } = useQuery("authCallback", () =>
        axios.get<AuthData>("/public/callback", {
            params: { code, state, sessionState },
        })
    );

    if (isError) return <Navigate to="/" />;

    if (isLoading) return <div>Loading...</div>;

    return <div>{JSON.stringify(data)}</div>;
};
