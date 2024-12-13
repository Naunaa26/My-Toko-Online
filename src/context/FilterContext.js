import React, { createContext, useContext, useState } from "react";

const FilterContext = createContext();

export const useFilter = () => {
  return useContext(FilterContext);
};

export const FilterProvider = ({ children }) => {
  const [sortBy, setSortBy] = useState("lowToHigh");

  return (
    <FilterContext.Provider value={{ sortBy, setSortBy }}>
      {children}
    </FilterContext.Provider>
  );
};
