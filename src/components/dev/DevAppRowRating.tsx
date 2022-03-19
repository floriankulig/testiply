import React from "react";
import { App } from "ts";
import { motion } from "framer-motion";
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

interface DevAppRowRatingProps {
  app: App;
}

export const DevAppRowRating: React.FC<DevAppRowRatingProps> = ({ app }) => {
  const rating = app.rating;
  return (
    <StyledAppDevRowRating>
      <StyledAppDevRowSectionHeader as={motion.h4}>
        Rating
      </StyledAppDevRowSectionHeader>
      <RatingContent style={{ marginBottom: 0 }}>
        <RatingSummary>
          <motion.h2>{rating.total}</motion.h2>
          <StarPercentageRating percentage={rating.total} />
          <motion.span className="rating__amount">
            <IoPeople /> {rating.amount}
          </motion.span>
        </RatingSummary>
        <RatingBars style={{ width: "100%" }}>
          {[...Array(5)].map((_, i) => (
            <RatingBar key={i} progress={rating[`${i + 1}`]} i={i} />
          ))}
        </RatingBars>
      </RatingContent>
    </StyledAppDevRowRating>
  );
};
