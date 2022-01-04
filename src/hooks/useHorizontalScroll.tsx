import { useEffect, useState } from "react";

export const useHorizontalScroll = (
  parentContainer: HTMLElement,
  scrollingContainer: HTMLElement
) => {
  const [scrollable, setScrollable] = useState<boolean>(true);

  useEffect(() => {
    if (!parentContainer || !scrollingContainer) return;

    setScrollable(scrollingContainer.offsetWidth > parentContainer.offsetWidth);

    const onResize = () => {
      setScrollable(
        scrollingContainer.offsetWidth > parentContainer.offsetWidth
      );
    };

    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [parentContainer, scrollingContainer]);

  const retriggerScrollCheck = () => {
    setScrollable(scrollingContainer.offsetWidth > parentContainer.offsetWidth);
  };
  return { scrollable, retriggerScrollCheck };
};
