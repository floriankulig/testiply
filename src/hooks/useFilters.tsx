import { useState, useEffect } from "react";
import { FilterContext } from "context/filters-context";
import { Platform } from "ts";

export const useFilters = (): FilterContext => {
  const [selectedPlatform, setSelectedPlatform] = useState<Platform>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  return {
    selectedPlatform,
    setSelectedPlatform,
    searchQuery,
    setSearchQuery,
  };
};
