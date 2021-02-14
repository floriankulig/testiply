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
  useEffect(() => {
    setPage(1);
    if (selectedCategory === null) {
      setApps([]);
      return;
    }
    setLoading(true);
    let query: string = `?category=${selectedCategory.id}&page=1`;
    query +=
      selectedPlatform === "all" ? "" : `&platform[]=${selectedPlatform}`;

    axios
      .get(`${api_url}/categoryApps${query}`)
      .then((res) => {
        if (JSON.stringify(res.data) !== JSON.stringify(apps)) {
          setApps(res.data);
        }
        console.log(res.data);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, [selectedCategory, selectedPlatform]);

  useEffect(() => {
    console.log(page);
    if (!selectedCategory || page <= 1) return;

    setLoading(true);
    let query: string = `?category=${selectedCategory.id}&page=${page}`;
    query +=
      selectedPlatform === "all" ? "" : `&platform[]=${selectedPlatform}`;

    axios
      .get(`${api_url}/categoryApps${query}`)
      .then((res) => {
        const newApps: App[] = [...apps, ...res.data];
        if (JSON.stringify(newApps) !== JSON.stringify(apps)) {
          setApps(newApps);
        }
        console.log(apps);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, [page]);

  const pageUp = (): void => {
    //handle hasMoreAppsToken
    setPage(page + 1);
  };

  return { selectedCategory, loading, apps, pageUp };
};
