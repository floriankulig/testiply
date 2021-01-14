import { createContext, useContext, useState, useEffect } from "react";

export type ContextType = {
    selectedPlatform?: string;
    setSelectedPlatform?: React.Dispatch<React.SetStateAction<string>>;
}

export const SelectedPlatformContext = createContext<Partial<ContextType>>({});

export const SelectedPlatformProvider = ({ children }) => {
    const [selectedPlatform, setSelectedPlatform] = useState("all");

    useEffect(() => {
        console.log(selectedPlatform)
    }, [selectedPlatform]);

    return (
        <SelectedPlatformContext.Provider
            value={{ selectedPlatform, setSelectedPlatform }}
        >
            {children}
        </SelectedPlatformContext.Provider>
    );
};

export const useSelectedPlatformValue = () => useContext(SelectedPlatformContext);