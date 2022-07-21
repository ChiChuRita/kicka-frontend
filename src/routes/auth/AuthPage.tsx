import { useNavigate, useSearchParams } from "react-router-dom";
import { useMutation, useQuery } from "react-query";

import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import { useEffect } from "react";

import RegisterForm from "./RegisterForm";

const AuthPage = () => {
    const { isAuthenticated, login } = useAuth();
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    const code = searchParams.get("code");
    const state = searchParams.get("state");
    const sessionState = searchParams.get("session_state");

    const { data, isError, error } = useQuery(
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

    useEffect(() => {
        if (isAuthenticated) navigate("/");
    }, [isAuthenticated]);

    if (isError) {
        console.error(error);
        navigate("/login");
    }

    if (data) {
        if (data.data.isRegistered) {
            login(data.data.token);
        } else if (data.data.isRegistered === false) {
            return <RegisterForm registerToken={data.data.token} />;
        }
    }

    return <div>Authenticating...</div>;
};

export default AuthPage;
