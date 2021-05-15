import { useEffect, useState } from "react";

export const useHorizontalScroll = (
  parentContainer: HTMLElement,
  scrollingContainer: HTMLElement
) => {
  const [scrollable, setScrollable] = useState<boolean>(true);

  useEffect(() => {
    if (!parentContainer || !scrollingContainer) return;

    const onResize = () => {
      setScrollable(
        scrollingContainer.offsetWidth > parentContainer.offsetWidth
      );
    };

    setScrollable(scrollingContainer.offsetWidth > parentContainer.offsetWidth);

    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [parentContainer, scrollingContainer]);
  return { scrollable };
};
