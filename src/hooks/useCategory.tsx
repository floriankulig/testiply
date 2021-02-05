import axios from "axios";
import { useFiltersValue } from "context";
import { useState, useEffect } from "react";
import { App, categories, Category, CategoryID } from "ts";
import { api_url } from "ts/constants";

type CategoryType = Category | null;
interface ReturnType {
  selectedCategory: CategoryType;
  setSelectedCategory: React.Dispatch<React.SetStateAction<CategoryType>>;
  apps: App[];
}

export const useCategory = (initial?: CategoryType): ReturnType => {
  const { selectedPlatform, searchQuery } = useFiltersValue();
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>(
    initial
  );
  const [apps, setApps] = useState<App[]>([]);

  useEffect(() => {
    if (selectedCategory === null) {
      setApps([]);
      return;
    }
    let newApps: App[];

    let query: string = `?category=${selectedCategory.id}`;
    query =
      selectedPlatform === "all"
        ? query + ""
        : query + `&platform[]=${selectedPlatform}`;

    axios
      .get(`${api_url}/categoryApps${query}`)
      .then((res) => (newApps = res.data))
      .catch((err) => console.log(err));

    if (JSON.stringify(newApps) !== JSON.stringify(apps)) {
      setApps(newApps);
    }
  }, [selectedCategory, selectedPlatform]);

  useEffect(() => {
    if (!apps || !selectedCategory) return;

    const filteredApps = apps?.filter((app) => app.name.includes(searchQuery));
    if (JSON.stringify(filteredApps) !== JSON.stringify(apps)) {
      setApps(filteredApps);
    }
    console.log(searchQuery);
    console.log(filteredApps);
  }, [searchQuery, apps]);

  return { selectedCategory, setSelectedCategory, apps };
};
