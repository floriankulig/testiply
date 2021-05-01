import { setAPIHeaders } from "api";
import axios, { AxiosResponse } from "axios";
import { useFiltersValue } from "context";
import { getCurrentGameCategoryFromRoute } from "helpers";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { App, AppRowCategory, AppRowCategoryID, GameRowApps } from "ts";
import { useDebug } from "./useDebug";

interface ReturnType {
  selectedCategory: AppRowCategory;
  loading: boolean;
  apps: App[];
  initialApps: GameRowApps;
}

interface CategoryApps {
  [x: string]: App[];
}

export const useGamesApps = (): ReturnType => {
  //Helper Hooks
  const { query } = useRouter();
  const { selectedPlatform } = useFiltersValue();

  // Getting current category from url => support for url sharing
  const [selectedCategory, setSelectedCategory] = useState<AppRowCategory>(
    getCurrentGameCategoryFromRoute(query)
  );
  useEffect(() => {
    setSelectedCategory(getCurrentGameCategoryFromRoute(query));
  }, [query]);

  //API requests
  const [loading, setLoading] = useState<boolean>(true);
  const getInitialApps = async (): Promise<GameRowApps> => {
    setLoading(true);
    try {
      const res: AxiosResponse<{ apps: GameRowApps }> = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/testGetGames?platform=${selectedPlatform.id}`
      );
      setLoading(false);
      return res.data.apps;
    } catch (err) {
      console.log(err.response.data.err);
      setLoading(false);
    }
  };
  const getCategoryApps = async (): Promise<App[]> => {
    setLoading(true);
    try {
      const res: AxiosResponse<{ apps: CategoryApps }> = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/testGetGames?platform=${selectedPlatform.id}&sort=${selectedCategory.id}`
      );
      setLoading(false);
      return res.data.apps[`${selectedCategory.id}`];
    } catch (err) {
      console.log(err.response.data.err);
      setLoading(false);
    }
  };

  // Apps for 3 different Rows
  const [initialApps, setInitialApps] = useState<GameRowApps>();
  // Apps when user selected a tab/category
  const [apps, setApps] = useState<App[]>([]);

  // Listeners for Re-requesting apps
  useEffect(() => {
    (async () => {
      setAPIHeaders();
      const newApps = await getInitialApps();
      if (JSON.stringify(newApps) !== JSON.stringify(initialApps)) {
        setInitialApps(newApps);
      }
    })();
  }, [selectedPlatform]);

  useEffect(() => {
    if (!selectedCategory) {
      setApps([]);
      return;
    }

    (async () => {
      const newApps = await getCategoryApps();
      if (JSON.stringify(newApps) !== JSON.stringify(apps)) {
        setApps(newApps);
      }
    })();
  }, [selectedPlatform, selectedCategory]);

  return { selectedCategory, loading, apps, initialApps };
};
