import { Variants } from "framer-motion";

export const scaleInOutVariants: Variants = {
  open: { scale: 1, opacity: 1 },
  closed: { scale: 0, opacity: 0 },
  show: { scale: 1, opacity: 1 },
  hidden: { scale: 0, opacity: 0 },
};
export const fadeInOutVariants: Variants = {
  open: {
    opacity: 1,
  },
  closed: { opacity: 0 },
};

export const scaleInVariants: Variants = {
  open: {
    opacity: 1,
    y: 0,
  },
  closed: { opacity: 0, y: 10 },
};

export const fadeUpVariants: Variants = {
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.25 },
  },
  hidden: { opacity: 0, y: 25 },
  animateListings: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.25, delayChildren: 5 },
  },
  initialListings: { opacity: 0, y: 15 },
  exitListings: {
    opacity: 0,
    y: 15,
    transition: { duration: 0.2 },
  },
};
