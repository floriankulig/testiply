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
}

export const useCategory = (initalApps?: App[]): ReturnType => {
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
  const [loading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    if (selectedCategory === null) {
      setApps([]);
      return;
    }
    setLoading(true);
    let query: string = `?category=${selectedCategory.id}`;
    query +=
      selectedPlatform === "all" ? "" : `&platform[]=${selectedPlatform}`;

    axios
      .get(`${api_url}/categoryApps${query}`)
      .then((res) => {
        if (JSON.stringify(res.data) !== JSON.stringify(apps)) {
          setApps(res.data);
        }
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, [selectedCategory, selectedPlatform]);

  return { selectedCategory, loading, apps };
};
