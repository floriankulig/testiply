import { useState, useEffect } from "react";
import { App, categories, Category, CategoryID } from "ts";

type DataType = Category | null;
interface ReturnType {
  selectedCategory: DataType;
  setSelectedCategory: React.Dispatch<React.SetStateAction<DataType>>;
}

export const useCategory = (initial?: DataType): ReturnType => {
  const [selectedCategory, setSelectedCategory] = useState<DataType>(initial);
  const [data, setData] = useState<Array<App | null>>([]);

  useEffect(() => {
    console.log(selectedCategory);
  }, [selectedCategory]);

  return { selectedCategory, setSelectedCategory };
};
