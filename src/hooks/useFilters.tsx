import { useState, useEffect } from "react";
import { FilterContext } from "context/filters-context";
import { Platform } from "ts";
import { useRouter } from "next/router";

export const useFilters = (): FilterContext => {
  const [selectedPlatform, setSelectedPlatform] = useState<Platform>({
    displayName: "All",
    id: "all",
  });
  const [searchQuery, setSearchQuery] = useState<string>("");
  const { pathname } = useRouter();
  const isDevRoute = pathname.split("/")[1] === "dev";

  useEffect(() => {
    setSearchQuery("");
  }, [isDevRoute]);

  return {
    selectedPlatform,
    setSelectedPlatform,
    searchQuery,
    setSearchQuery,
  };
};
