import React, { useState } from "react";
import { createContext } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {

    const [admin, setAdmin] = useState(() => {
        const savedAdmin = localStorage.getItem("admin");
        return savedAdmin ? JSON.parse(savedAdmin) : null;
    })

    const [candidate, setCandidate] = useState(() => {
        const savedCandidate = localStorage.getItem("candidate");
        return savedCandidate ? JSON.parse(savedCandidate) : null;
    })

    const login = ({type, data, token}) => {
        if(type === "admin") {
            const adminInfo = {...data, ['token']:token}
            setAdmin(adminInfo);
            localStorage.setItem("admin", JSON.stringify(adminInfo));    
        } else {
            const candidateInfo = {...data, ['token']:token}
            setCandidate(candidateInfo);
            localStorage.setItem("candidate", JSON.stringify(candidateInfo));    
        }
    }

    const logout = (type) => {
        if(type === "admin") {
            setAdmin(null);
            localStorage.removeItem("admin");
        } else {
            setCandidate(null);
            localStorage.removeItem("candidate");
        }
    };

    return (
        <AuthContext.Provider value={{ admin, candidate,login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};


