import React, { createContext, useContext, useState, useEffect } from "react";

interface AuthContext {
    isAuthenticated: boolean;
    user: User | null;
}

const authContext = createContext<AuthContext>({
    isAuthenticated: false,
    user: null,
});

export const useAuth = () => useContext(authContext);

interface AuthProviderProps {
    children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState<User | null>(null);

    //temporary testing code
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            setIsAuthenticated(true);
        }
    }, []);

    const value = {
        isAuthenticated,
        user,
    };

    //IMPORTANT! add loading state to this context
    return (
        <authContext.Provider value={value}>{children}</authContext.Provider>
    );
};
