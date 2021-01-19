import { createContext, useContext, useState, useEffect } from "react";
import { User } from "ts"

const testUser: User = { firstName: "Max", lastName: "Mustermann", email: "muster@mail.com", _id: "tgg51cfgfdt8" }

type ContextType = {
    currentUser?: User | null;
    setCurrentUser?: React.Dispatch<React.SetStateAction<User>>;
}

const AuthContext = createContext<Partial<ContextType>>({});

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState<User | null>(testUser);

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