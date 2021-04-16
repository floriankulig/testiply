import axios from "axios";
import { useFiltersValue } from "context";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { App, AppRowCategory } from "ts";

interface ReturnType {
  selectedCategory: AppRowCategory;
  loading: boolean;
  apps: App[];
}

export const useGamesApps = (): ReturnType => {
  //Helper Hooks
  const { query } = useRouter();
  const { selectedPlatform } = useFiltersValue();

  // Getting current category from url => support for url sharing
  const [selectedCategory, setSelectedCategory] = useState<AppRowCategory>(
    null
  );
  useEffect(() => {
    setSelectedCategory(null);
  }, [query]);

  // Requesting Apps Logic
  const [apps, setApps] = useState<App[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  //   useEffect(() => {
  //     if (selectedCategory === null) {
  //       setApps([]);
  //       return;
  //     }
  //     setLoading(true);
  //     const query: string = `?category=${selectedCategory.id}&platform=${selectedPlatform.id}`;
  //     axios
  //       .get(`${process.env.NEXT_PUBLIC_API_URL}/getCategoryApps${query}`)
  //       .then((res) => {
  //         if (JSON.stringify(res.data.apps) !== JSON.stringify(apps)) {
  //           setApps(res.data.apps);
  //         }
  //         setLoading(false);
  //       })
  //       .catch(
  //         (err) =>
  //           err.response.status === 404 &&
  //           err.response.data.err === "No Apps found." &&
  //           setApps([])
  //       );
  //   }, [selectedCategory, selectedPlatform]);

  return { selectedCategory, loading, apps };
};
