import { motion, Variants } from "framer-motion";
import { rgba } from "polished";
import styled from "styled-components";
import { fadeUpVariants } from "ts/constants";

export const RatingSection = styled.section`
  margin-top: 5em;
  overflow-y: hidden;
  h1.section-header {
    font-size: clamp(1.4rem, 3vw, 2rem);
    color: ${({ theme }) => rgba(theme.navy, 0.8)};
  }
`;

export const RatingContent = styled.div`
  display: flex;
  width: 100%;
  overflow-y: hidden;
  margin: clamp(1em, 2vw, 1.5em) 0 6em;
`;

export const StarRatings = styled.div<{ clickable?: boolean }>`
  unicode-bidi: bidi-override;
  color: #cecdcd;
  font-size: 64px;
  position: relative;
  margin: 0;
  padding: 0;
  width: min-content;
  cursor: default;
  .fill-ratings {
    color: var(--primary);
    padding: 0;
    position: absolute;
    z-index: 1;
    display: block;
    top: 0;
    left: 0;
    overflow: hidden;
    max-width: 100%;
    span {
      display: inline-block;
      i {
        font-style: normal;
        cursor: ${(p) => (p.clickable ? "pointer" : "default")};
      }
    }
  }
  .empty-ratings {
    padding: 0;
    display: block;
    z-index: 0;
    span i {
      font-style: normal;
      cursor: ${(p) => (p.clickable ? "pointer" : "default")};
    }
  }
`;

export const RatingSummary = styled.div`
  margin-right: clamp(1em, 3vw, 2em);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 0.25em 0 0.25em;
  @media (${({ theme }) => theme.bp.medium}) {
    padding-top: 0;
  }

  h2 {
    font-size: clamp(3rem, 5vw, 4.5rem);
    margin: 0 0 0.1em;
  }
  span.rating__amount {
    color: ${({ theme }) => rgba(theme.navy, 0.7)};
    display: inline-flex;
    align-items: center;
    svg {
      margin-right: 5px;
    }
  }
`;

export const RatingBars = styled.ul`
  display: flex;
  flex-direction: column-reverse;
  justify-content: space-between;
  width: 100%;
  max-width: 300px;
  @media (${({ theme }) => theme.bp.medium}) {
    max-width: 350px;
  }

  li {
    display: flex;
    align-items: center;
    span {
      font-size: 1.1rem;
      color: ${({ theme }) => rgba(theme.navy, 0.7)};
    }
  }
`;

const StyledRatingBar = styled.div`
  --height: 8px;
  width: calc(100% - 30px);
  height: var(--height);
  margin-left: 1em;
  background-color: #cecdcd;
  border-radius: calc(var(--height) / 2);
  .progress {
    background-color: var(--primary);
    height: var(--height);
    border-radius: calc(var(--height) / 2);
  }

  @media (${({ theme }) => theme.bp.medium}) {
    --height: 10px;
  }
`;

interface RatingBarProps {
  progress: number;
  i: number;
}
const ratingbarVariants: Variants = {
  show: {
    scaleX: 1,
    transformOrigin: "left",
  },
  hidden: { scaleX: 0 },
};

export const RatingBar: React.FC<RatingBarProps> = ({ progress, i }) => {
  return (
    <motion.li variants={fadeUpVariants}>
      <span>{i + 1}</span>
      <StyledRatingBar>
        <motion.div
          variants={ratingbarVariants}
          transition={{ delay: 1.75 + i / 20, duration: 0.8 }}
          className="progress"
          style={{
            width: `${progress}%`,
          }}
        />
      </StyledRatingBar>
    </motion.li>
  );
};

interface StarpercentageRatingProps {
  percentage: number;
  size?: number;
}
export const StarPercentageRating: React.FC<StarpercentageRatingProps> = ({
  percentage,
  size = 20,
}) => {
  return (
    <StarRatings
      as={motion.div}
      variants={fadeUpVariants}
      style={{ fontSize: `${size}px` }}
    >
      <div className="fill-ratings" style={{ width: `${percentage * 20}%` }}>
        <span>★★★★★</span>
      </div>
      <div className="empty-ratings">
        <span>★★★★★</span>
      </div>
    </StarRatings>
  );
};
