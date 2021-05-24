import axios, { AxiosResponse } from "axios";
import { useFiltersValue } from "context";
import { getCurrentCategoryFromRoute } from "helpers";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { App, Category } from "ts";

type CategoryType = Category | null;
interface ReturnType {
  selectedCategory: CategoryType;
  loading: boolean;
  apps: App[];
}

export const useCategory = (): ReturnType => {
  //Helper Hooks
  const { query } = useRouter();
  const { selectedPlatform } = useFiltersValue();

  // Getting current category from url => support for url sharing
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>(
    getCurrentCategoryFromRoute(query)
  );
  useEffect(() => {
    setSelectedCategory(getCurrentCategoryFromRoute(query));
  }, [query]);

  const getMatchingApps = async (): Promise<App[]> => {
    const query: string = `?category=${selectedCategory.id}&platform=${selectedPlatform.id}`;
    try {
      const res: AxiosResponse<{ apps: App[] }> = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/getCategoryApps${query}`
      );
      return res.data.apps;
    } catch (err) {
      err.response.status === 404 &&
        err.response.data.err === "No Apps found." &&
        setApps([]);
    }
  };

  // Requesting Apps Logic
  const [apps, setApps] = useState<App[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    if (selectedCategory === null) {
      setApps([]);
      return;
    }

    (async () => {
      setLoading(true);
      const newApps = await getMatchingApps();
      if (JSON.stringify(newApps) !== JSON.stringify(apps)) {
        setApps(newApps);
      }
      setLoading(false);
    })();
  }, [selectedCategory, selectedPlatform]);

  return { selectedCategory, loading, apps };
};
