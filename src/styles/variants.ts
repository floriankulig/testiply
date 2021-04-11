import { Variants } from "framer-motion";

export const fadeInOutVariants: Variants = {
  open: {
    opacity: 1,
  },
  closed: { opacity: 0 },
};

export const fadeUpVariants: Variants = {
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.25 },
  },
  hidden: { opacity: 0, y: 25 },
};
