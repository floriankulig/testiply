import { getCurrentTabFromRoute } from "helpers";
import { useRouter } from "next/router";
import { createContext, useContext, useEffect, useState } from "react";

export type TabContextType = {
  selectedTab?: string;
  setSelectedTab?: React.Dispatch<React.SetStateAction<string>>;
};

export const SelectedTabContext = createContext<Partial<TabContextType>>({});

export const SelectedTabProvider = ({ children }) => {
  const { pathname } = useRouter();
  const [selectedTab, setSelectedTab] = useState<string>(
    getCurrentTabFromRoute(pathname)
  );

  useEffect(() => {
    setSelectedTab(getCurrentTabFromRoute(pathname));
  }, [pathname]);

  return (
    <SelectedTabContext.Provider value={{ selectedTab, setSelectedTab }}>
      {children}
    </SelectedTabContext.Provider>
  );
};

export const useSelectedTabValue = () => useContext(SelectedTabContext);
