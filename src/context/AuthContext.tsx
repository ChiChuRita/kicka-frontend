import axios from "axios";
import { createContext, useContext, useState, useEffect } from "react";
import { useQueryClient } from "react-query";

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
    const [isLoading, setIsLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [token, setToken] = useState<string>("");

    const queryClient = useQueryClient();

    useEffect(() => {
        setIsLoading(true);
        const token = localStorage.getItem("token");
        if (token) {
            login(token);
        }
        setIsLoading(false);
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
        queryClient.clear();
    };

    const value = { isAuthenticated, token, login, logout };

    return isLoading ? (
        <span>authenticating</span>
    ) : (
        <authContext.Provider value={value}>{children}</authContext.Provider>
    );
};
