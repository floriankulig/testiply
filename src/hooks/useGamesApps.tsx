import axios from "axios";
import { useFiltersValue } from "context";
import { getCurrentGameCategoryFromRoute } from "helpers";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { App, AppRowCategory, GameRowApps } from "ts";

interface ReturnType {
  selectedCategory: AppRowCategory;
  loading: boolean;
  apps: App[];
  initialApps: GameRowApps;
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
  const getInitialApps = async (): Promise<GameRowApps> => {
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/games?platform=${selectedPlatform.id}`
      );
      console.log(res.data);
      return res.data;
    } catch (err) {
      console.log(err.response.data.err);
    }
  };

  // Apps for 3 different Rows
  const [initialApps, setInitialApps] = useState<GameRowApps>();
  // Apps when user selected a tab/category
  const [apps, setApps] = useState<App[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Listeners for Re-requesting apps
  useEffect(() => {
    (async () => {
      const newApps = await getInitialApps();
      if (JSON.stringify(newApps) !== JSON.stringify(initialApps)) {
        setInitialApps(newApps);
      }
    })();
  }, [selectedCategory, selectedPlatform]);

  return { selectedCategory, loading, apps, initialApps };
};
