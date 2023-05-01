// authContext.ts
import { createContext, useState, useContext, useEffect, ReactNode } from "react";
import Cookies from "js-cookie";

interface AuthContextData {
    token: string | null;
    setAuthCookie: (newToken: string) => void;
    removeAuthCookie: () => void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [token, setToken] = useState<string | null>(null);

    useEffect(() => {
        const storedToken = Cookies.get("token");
        if (storedToken) {
            setToken(storedToken);
        }
    }, []);

    const setAuthCookie = (newToken: string) => {
        setToken(newToken);
        Cookies.set("token", newToken, { expires: 7 }); // Expires in 7 days
    };

    const removeAuthCookie = () => {
        setToken(null);
        Cookies.remove("token");
    };

    return (
        <AuthContext.Provider value={{ token, setAuthCookie, removeAuthCookie }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
