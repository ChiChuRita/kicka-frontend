import axios from "axios";
import { createContext, useContext, useState, useEffect } from "react";

const authContext = createContext({
    isAuthenticated: false,
    token: "",
    login: (token: string) => {},
    logout: () => {},
});

export const useAuth = () => useContext(authContext);

interface AuthProviderProps {
    children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [token, setToken] = useState<string>("");

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            login(token);
        }
    }, []);

    useEffect(() => {
        const interceptor = axios.interceptors.response.use((res) => {
            //TODO implement interceptor
            return res;
        });
        return () => {
            axios.interceptors.response.eject(interceptor);
        };
    }, []);

    const login = (token: string) => {
        setIsAuthenticated(true);
        setToken(token);
        localStorage.setItem("token", token);
        axios.defaults.headers.common["Authorization"] = token;
    };

    const logout = () => {
        setIsAuthenticated(false);
        setToken("");
        axios.defaults.headers.common["Authorization"] = "";
        localStorage.removeItem("token");
    };

    const value = { isAuthenticated, token, login, logout };

    return (
        <authContext.Provider value={value}>{children}</authContext.Provider>
    );
};
