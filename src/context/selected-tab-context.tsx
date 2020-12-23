import { createContext, useContext, useState } from "react";

export type ContextType = {
    selectedTab: string;
    setSelectedTab: React.Dispatch<React.SetStateAction<string>>;
}

export const SelectedTabContext = createContext<Partial<ContextType>>({});

export const SelectedTabProvider = ({ children }) => {
    const [selectedTab, setSelectedTab] = useState("today");

    return (
        <SelectedTabContext.Provider
            value={{ selectedTab: selectedTab, setSelectedTab: setSelectedTab }}
        >
            {children}
        </SelectedTabContext.Provider>
    );
};

export const useSelectedTabValue = () => useContext(SelectedTabContext);