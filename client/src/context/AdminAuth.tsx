// authContext.ts
import { createContext, useState, useContext, useEffect, ReactNode } from "react";
import Cookies from "js-cookie";
import jwt_decode from 'jwt-decode';


interface AdminAuthContextData {
    token: string | null;
    username: string | null;
    title: string | null;
    setAdminAuthCookie: (newToken: string) => void;
    removeAdminAuthCookie: () => void;
}

const AdminAuthContext = createContext<AdminAuthContextData>({} as AdminAuthContextData);

interface AuthProviderProps {
    children: ReactNode;
}

export const AdminAuthProvider = ({ children }: AuthProviderProps) => {
    const [token, setToken] = useState<string | null>(null);
    const [username, setUsername] = useState<string | null>(null);
    const [title, setTitle] = useState<string | null>(null);

    useEffect(() => {
        const storedToken = Cookies.get("token");
        const storedUsername = Cookies.get("username");
        const storedTitle = Cookies.get("title");
        if (storedToken) {
            setToken(storedToken);
        }
        if (storedUsername) {
            setUsername(storedUsername);
        }
        if (storedTitle) {
            setTitle(storedTitle);
        }
    }, []);

    const setAdminAuthCookie = (newToken: string) => {
        setToken(newToken);
        if (newToken) {
            const decodedToken = jwt_decode(newToken) as { username: string, title: string };
            setUsername(decodedToken.username);
            Cookies.set("username", decodedToken.username);
            setTitle(decodedToken.title);
            Cookies.set("title", decodedToken.title);
        }
        Cookies.set("token", newToken, { expires: 7 }); // Expires in 7 days
    };

    const removeAdminAuthCookie = () => {
        setToken(null);
        Cookies.remove("token");
        setUsername(null);
        Cookies.remove("username");
        setTitle(null);
        Cookies.remove("title");
    };

    return (
        <AdminAuthContext.Provider value={{ token, username, title, setAdminAuthCookie, removeAdminAuthCookie }}>
            {children}
        </AdminAuthContext.Provider>
    );
};

export const useAdminAuth = () => useContext(AdminAuthContext);
