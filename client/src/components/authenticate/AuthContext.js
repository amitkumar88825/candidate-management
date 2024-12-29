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
            setAdmin({...data, ['authToken']:token});
            localStorage.setItem("admin", JSON.stringify(data));    
        } else {
            setCandidate({...data, ['authToken']:token});
            localStorage.setItem("candidate", JSON.stringify(data));    
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


