import axios from "axios";
import { useFiltersValue } from "context";
import { getCurrentCategoryFromRoute } from "helpers";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { App, Category } from "ts";
import { api_url } from "ts/constants";

type CategoryType = Category | null;
interface ReturnType {
  selectedCategory: CategoryType;
  loading: boolean;
  hasMoreApps: boolean;
  apps: App[];
  pageUp: () => void;
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

  // Requesting Apps Logic
  const [apps, setApps] = useState<App[]>([]);
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);
  const [hasMoreApps, setHasMoreApps] = useState<boolean>(true);
  useEffect(() => {
    setPage(1);
    setHasMoreApps(true);
    if (selectedCategory === null) {
      setApps([]);
      return;
    }
    setLoading(true);
    let query: string = `?category=${selectedCategory.id}`;
    query +=
      selectedPlatform.id === "all" ? "" : `&platform[]=${selectedPlatform.id}`;

    axios
      .get(`${api_url}/categoryApps${query}`)
      .then((res) => {
        if (JSON.stringify(res.data.apps) !== JSON.stringify(apps)) {
          setApps(res.data.apps);
        }
        setHasMoreApps(res.data.metaData.moreApps);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, [selectedCategory, selectedPlatform]);

  useEffect(() => {
    if (!selectedCategory || page <= 1) return;

    setLoading(true);
    let query: string = `?category=${selectedCategory.id}&page=${
      apps.slice(-1).pop()._id
    }`;
    query +=
      selectedPlatform.id === "all" ? "" : `&platform[]=${selectedPlatform.id}`;

    axios
      .get(`${api_url}/categoryApps${query}`)
      .then((res) => {
        // check if new loaded apps are already displayed
        const newPageApps = res.data.apps.filter(
          (newApp: App) => !apps.some((oldApp) => oldApp._id === newApp._id)
        );
        // merge old apps with newly loaded ones
        const newApps: App[] = [...apps, ...newPageApps];
        if (JSON.stringify(newApps) !== JSON.stringify(apps)) {
          setApps(newApps);
        }
        setHasMoreApps(res.data.metaData.moreApps);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, [page]);

  const pageUp = (): void => {
    //handle hasMoreAppsToken
    setPage(page + 1);
  };

  return { selectedCategory, loading, apps, pageUp, hasMoreApps };
};
