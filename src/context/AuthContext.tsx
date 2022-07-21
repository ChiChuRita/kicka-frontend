import { createContext, useContext, useState, useEffect } from "react";

const authContext = createContext({
    isAuthenticated: false,
    user: null,
    login: (token: string) => {},
    logout: () => {},
});

export const useAuth = () => useContext(authContext);

interface AuthProviderProps {
    children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            login(token);
        }
    }, []);

    const login = (token: string) => {
        setIsAuthenticated(true);
        setUser(token);
    };

    const logout = () => {
        setIsAuthenticated(false);
        setUser(null);
    };

    const value = { isAuthenticated, user, login, logout };

    return (
        <authContext.Provider value={value}>{children}</authContext.Provider>
    );
};
