import { createContext, useContext, useState, useEffect, useLayoutEffect } from "react";

export type ContextType = {
    selectedTab?: string;
    setSelectedTab?: React.Dispatch<React.SetStateAction<string>>;
}

export const SelectedTabContext = createContext<Partial<ContextType>>({});

export const SelectedTabProvider = ({ children }) => {
    const [selectedTab, setSelectedTab] = useState("today");

    useEffect(() => {
        const urlString = (window.location.href).toLowerCase()
        const urlTab = new URL(urlString).searchParams.get("tab")

        setSelectedTab(urlTab)
    }, []);

    return (
        <SelectedTabContext.Provider
            value={{ selectedTab, setSelectedTab }}
        >
            {children}
        </SelectedTabContext.Provider>
    );
};

export const useSelectedTabValue = () => useContext(SelectedTabContext);