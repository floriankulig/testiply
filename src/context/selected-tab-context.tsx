import { getCurrentTabFromRoute } from "helpers";
import { useRouter } from "next/router";
import { createContext, useContext, useState, useEffect } from "react";

export type ContextType = {
  selectedTab?: string;
  setSelectedTab?: React.Dispatch<React.SetStateAction<string>>;
};

export const SelectedTabContext = createContext<Partial<ContextType>>({});

export const SelectedTabProvider = ({ children }) => {
  const [selectedTab, setSelectedTab] = useState<string>(
    getCurrentTabFromRoute()
  );
  const { pathname } = useRouter();

  useEffect(() => {
    setSelectedTab(getCurrentTabFromRoute);
  }, [pathname]);

  return (
    <SelectedTabContext.Provider value={{ selectedTab, setSelectedTab }}>
      {children}
    </SelectedTabContext.Provider>
  );
};

export const useSelectedTabValue = () => useContext(SelectedTabContext);
