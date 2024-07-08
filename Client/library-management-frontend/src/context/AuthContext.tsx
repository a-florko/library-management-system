import React, { ReactNode, createContext, useState } from "react";
import { AuthService } from "../services/auth.service";

interface AuthContextProps {
    isAuthenticated: boolean;
    fullName: string;
    logIn: (credentials: { login: string, password: string }, rememberMe: boolean) => Promise<void>;
    logOut: () => void;
}

export const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(localStorage.getItem('isAuthenticated') === 'true');
    const [fullName, setFullName] = useState<string>(localStorage.getItem('fullName') || "");
    
    const logIn = async (credentials: {login: string, password: string}, rememberMe: boolean) => {
        const result = await AuthService.logIn(credentials);

        if (result !== null) {
            setFullName(result);
            setIsAuthenticated(true);

            if(rememberMe) {
                localStorage.setItem('fullName', result);
                localStorage.setItem('isAuthenticated', 'true');
            }
        } 
        else {
            throw new Error("Invalid login or password");
        }
    }

    const logOut = () => {
        setFullName("");
        setIsAuthenticated(false);
        localStorage.setItem('fullName', '');
        localStorage.setItem('isAuthenticated', 'false');
    }

    return (
        <AuthContext.Provider value={{ isAuthenticated, fullName, logIn, logOut }}>
            {children}
        </AuthContext.Provider>
    )
}