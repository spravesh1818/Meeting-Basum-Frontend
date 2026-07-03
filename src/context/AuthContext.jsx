// src/context/AuthContext.tsx
import { createContext, useContext, useState } from "react";
import {
    getAccessToken, getRefreshToken, getUser,
    setAccessToken as persistAccessToken,
    setRefreshToken as persistRefreshToken,
    setUser as persistUser,
    removeAccessToken, removeRefreshToken, removeUser,
} from "../utils/localstorage";


export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [accessToken, setAccessTokenState] = useState(getAccessToken());
    const [refreshToken, setRefreshTokenState] = useState(getRefreshToken());
    const [user, setUserState] = useState(getUser());

    const setAccessToken = (token) => {
        persistAccessToken(token);
        setAccessTokenState(token);
    };

    const setRefreshToken = (token) => {
        persistRefreshToken(token);
        setRefreshTokenState(token);
    };

    const setUser = (userData) => {
        persistUser(userData);
        setUserState(userData);
    };

    const logout = () => {
        removeAccessToken();
        removeRefreshToken();
        removeUser();
        setAccessTokenState(null);
        setRefreshTokenState(null);
        setUserState(null);
    };

    return (
        <AuthContext.Provider
            value={{ accessToken, refreshToken, user, setAccessToken, setRefreshToken, setUser, logout }
            }
        >
            {children}
        </AuthContext.Provider>
    );
}


export function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error("useAuth must be used within AuthProvider");
    return ctx;
}
