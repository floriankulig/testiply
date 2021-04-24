import { useEffect } from "react";

export const useDebug = (value: any): void => {
  useEffect(() => {
    console.log({ value });
  }, [value]);
};
