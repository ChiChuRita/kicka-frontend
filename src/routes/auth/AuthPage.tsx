import { Navigate, useSearchParams } from "react-router-dom";
import { useMutation, useQuery } from "react-query";

import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import { useEffect } from "react";

import RegisterForm from "./RegisterForm";

const AuthPage = () => {
    const { isAuthenticated, login } = useAuth();
    const [searchParams] = useSearchParams();

    if (isAuthenticated) return <Navigate to="/" />;

    const code = searchParams.get("code");
    const state = searchParams.get("state");
    const sessionState = searchParams.get("session_state");

    const { isLoading, data, isError, error } = useQuery(
        "authCallback",
        () =>
            axios.get<AuthData>("/public/callback", {
                params: { code, state, sessionState },
                withCredentials: true,
            }),
        {
            refetchOnMount: false,
            refetchOnReconnect: false,
            refetchOnWindowFocus: false,
        }
    );

    if (isError) {
        console.error(error);
        return <Navigate to="/login" />;
    }

    if (data) {
        if (data.data.isRegistered) {
            login(data.data.token);
            return <Navigate to="/" />;
        } else if (data.data.isRegistered === false) {
            return <RegisterForm registerToken={data.data.token} />;
        }
    }

    return <div>Authenticating...</div>;
};

export default AuthPage;
