import React, { createContext, useContext, useState } from "react";

//because of non-ts framework the User type is not inferrable which really sucks
//this is a temporary workaround
interface User {
    id: string;
    username: string;
}

interface AuthContext {
    isAuthenticated: boolean;
    user: User | null;
}

const authContext = createContext<AuthContext | null>(null);

export const useAuthContext = () => useContext(authContext)!;

type AuthProviderProps = {
    children: React.ReactNode;
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState<User | null>(null);

    const value: AuthContext = {
        isAuthenticated,
        user,
    };

    return (
        <authContext.Provider value={value}>{children}</authContext.Provider>
    );
};
