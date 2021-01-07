import { createContext, useContext, useState, useEffect } from "react";
import { User } from "ts"

export type ContextType = {
    currentUser?: User | null;
    setCurrentUser?: React.Dispatch<React.SetStateAction<User>>;
}

export const AuthContext = createContext<Partial<ContextType>>({});

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState<User | null>(null);

    useEffect(() => {
        console.log(currentUser)
    }, [currentUser]);

    return (
        <AuthContext.Provider
            value={{ currentUser, setCurrentUser }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuthValue = () => useContext(AuthContext);