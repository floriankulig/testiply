import { useEffect } from "react";

export const useDebug = (value: any, text?: string): void => {
  useEffect(() => {
    console.log(
      text ? text + ": " + JSON.stringify(value) : JSON.stringify(value)
    );
  }, [value]);
};
