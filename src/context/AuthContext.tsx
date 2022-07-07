import { createContext, useContext, useState } from "react";

const authContext = createContext({
    isAuthenticated: false,
    user: null,
    //login: () => {},
    //logout: () => {},
});

export const useAuth = () => useContext(authContext);

interface AuthProviderProps {
    children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState<any>(null);

    //useeffect which checks if there is any user on localstorage

    const value = { isAuthenticated, user };

    return (
        <authContext.Provider value={value}>{children}</authContext.Provider>
    );
};
