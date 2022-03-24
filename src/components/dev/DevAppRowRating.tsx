import React from "react";
import { App } from "ts";
import { motion, Variants } from "framer-motion";
import {
  RatingBar,
  RatingBars,
  RatingContent,
  RatingSummary,
  StarPercentageRating,
} from "components/appDetail";
import { StyledAppDevRowSectionHeader } from "./DevAppRow";
import { IoPeople } from "react-icons/io5";
import styled from "styled-components";

// we hardcode the values here because there is no suitable grid/flexbox solution
const bp1 = "620px";
const bp2 = "960px";
const bp3 = "1310px";

const StyledAppDevRowRating = styled.div`
  margin-top: 2em;
  flex-grow: 1;
  @media (min-width: ${bp1}) {
    width: 80%;
    margin: 2em auto 0;
  }
  @media (min-width: ${bp2}) {
    margin: 0;
    margin-left: clamp(4em, 16vw, 9em);
  }
  @media (min-width: ${bp3}) {
    margin: 0;
    margin-left: clamp(4em, 16vw, 15.5em);
  }
`;

const containerVariants: Variants = {
  initialListings: {},
  animateListings: {
    transition: { delayChildren: 1, staggerChildren: 0.075 },
  },
  exitListings: {
    transition: {
      staggerChildren: 0.1,
      staggerDirection: -1,
    },
  },
};
const listHeaderVariants: Variants = {
  initialListings: { y: -20, x: -1, opacity: 0 },
  animateListings: { y: 0, x: 0, opacity: 1, transition: { duration: 0.35 } },
  exitListings: { y: -20, x: -1, opacity: 0, transition: { duration: 0.25 } },
};
const listItemVariants: Variants = {
  initialListings: { x: -10, opacity: 0 },
  animateListings: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.35 },
  },
  exitListings: { x: -10, opacity: 0, transition: { duration: 0.25 } },
};

interface DevAppRowRatingProps {
  app: App;
}

export const DevAppRowRating: React.FC<DevAppRowRatingProps> = ({ app }) => {
  const rating = app.rating;
  return (
    <StyledAppDevRowRating as={motion.div} variants={containerVariants}>
      <StyledAppDevRowSectionHeader
        as={motion.h4}
        variants={listHeaderVariants}
      >
        Rating
      </StyledAppDevRowSectionHeader>
      <RatingContent style={{ marginBottom: 0, overflow: "visible" }}>
        <RatingSummary>
          <motion.h2 variants={listHeaderVariants}>{rating.total}</motion.h2>
          <motion.div variants={listItemVariants}>
            <StarPercentageRating percentage={rating.total} />
          </motion.div>
          <motion.span className="rating__amount" variants={listHeaderVariants}>
            <IoPeople /> {rating.amount}
          </motion.span>
        </RatingSummary>
        <RatingBars
          as={motion.ul}
          exit={{ transition: { staggerDirection: -1 } }}
          style={{ width: "100%" }}
        >
          {[...Array(5)].map((_, i) => (
            <RatingBar key={i} progress={rating[`${i + 1}`]} i={i} />
          ))}
        </RatingBars>
      </RatingContent>
    </StyledAppDevRowRating>
  );
};
