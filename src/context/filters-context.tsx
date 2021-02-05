import { useFilters } from "hooks";
import { createContext, useContext, useState } from "react";

export type FilterContext = {
  selectedPlatform?: string;
  setSelectedPlatform?: React.Dispatch<React.SetStateAction<string>>;
  searchQuery?: string;
  setSearchQuery?: React.Dispatch<React.SetStateAction<string>>;
};

const FilterContext = createContext<Partial<FilterContext>>({});

export const FiltersProvider = ({ children }) => {
  const {
    selectedPlatform,
    setSelectedPlatform,
    searchQuery,
    setSearchQuery,
  } = useFilters();

  return (
    <FilterContext.Provider
      value={{
        selectedPlatform,
        setSelectedPlatform,
        searchQuery,
        setSearchQuery,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};

export const useFiltersValue = () => useContext(FilterContext);
