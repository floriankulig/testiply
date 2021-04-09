import axios from "axios";
import { useFiltersValue } from "context";
import { useState, useEffect } from "react";
import { App } from "ts";

interface ReturnType {
  loading: boolean;
  filteredApps: App[];
}

export const useApps = (initialApps: App[]): ReturnType => {
  //Helper Hooks
  const { selectedPlatform, searchQuery } = useFiltersValue();

  // Requesting Apps Logic
  const [apps, setApps] = useState<App[]>(initialApps);
  const [filteredApps, setFilteredApps] = useState<App[]>(apps);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    const query = `?platform=${selectedPlatform.id}`;
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/getAllApps${query}`)
      .then((res) => {
        console.log(res.data);
        if (JSON.stringify(res.data.apps) !== JSON.stringify(apps)) {
          setApps(res.data.apps);
        }
      })
      .catch(
        (err) =>
          err.response.status === 404 &&
          err.response.data.err === "No Apps found." &&
          setApps([])
      );
    setLoading(false);
  }, [selectedPlatform]);

  useEffect(() => {
    const newApps = searchQuery
      ? apps?.filter((app) =>
          app.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
      : apps;

    if (JSON.stringify(newApps) !== JSON.stringify(filteredApps))
      setFilteredApps(newApps);
  }, [searchQuery, apps]);

  return { loading, filteredApps };
};
