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
  setSelectedCategory: React.Dispatch<React.SetStateAction<CategoryType>>;
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

  // Requesting Apps Logic
  const [apps, setApps] = useState<App[]>([]);
  useEffect(() => {
    if (selectedCategory === null) {
      setApps([]);
      return;
    }
    let query: string = `?category=${selectedCategory.id}`;
    query =
      selectedPlatform === "all"
        ? query + ""
        : query + `&platform[]=${selectedPlatform}`;

    axios
      .get(`${api_url}/categoryApps${query}`)
      .then((res) => {
        if (JSON.stringify(res.data) !== JSON.stringify(apps)) {
          setApps(res.data);
        }
      })
      .catch((err) => console.log(err));
  }, [selectedCategory, selectedPlatform]);

  return { selectedCategory, setSelectedCategory, apps };
};
