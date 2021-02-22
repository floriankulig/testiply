import { useEffect } from "react";

export const useCannotScroll = (cantScroll: boolean): void => {
  useEffect(() => {
    if (cantScroll) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = null;
    }
  }, [cantScroll]);
};
