import { rgba } from "polished";
import styled from "styled-components";

export const RatingSection = styled.section`
  margin-top: 5em;
  width: 100%;
  overflow-y: hidden;
  h1.section-header {
    font-size: clamp(1.5rem, 3vw, 2rem);
    color: ${({ theme }) => rgba(theme.navy, 0.8)};
  }
`;

export const RatingContent = styled.div`
  display: flex;
  width: 100%;
  overflow-y: hidden;
  margin-top: clamp(1em, 2vw, 2em);
`;

const StarRatings = styled.div`
  unicode-bidi: bidi-override;
  color: #cecdcd;
  font-size: 64px;
  position: relative;
  margin: 0;
  padding: 0;
  width: min-content;
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
    }
  }
  .empty-ratings {
    padding: 0;
    display: block;
    z-index: 0;
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

  & > * {
    opacity: 0; //for animations
  }

  h2 {
    font-size: clamp(3rem, 5vw, 4.5rem);
    margin: 0 0 0.1em;
    animation: fadeUp 0.5s var(--easing) forwards;
  }
  ${StarRatings} {
    animation: fadeUp 0.5s var(--easing) forwards 0.05s;
  }
  span.rating__amount {
    color: ${({ theme }) => rgba(theme.navy, 0.7)};
    display: inline-flex;
    align-items: center;
    animation: fadeUp 0.5s var(--easing) forwards 0.1s;
    svg {
      margin-right: 5px;
    }
  }
`;

export const RatingBars = styled.ul`
  display: flex;
  flex-direction: column;
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
    animation: growRight 0.8s var(--easing) forwards;
    transform-origin: left;
    transform: scaleX(0);
  }

  @media (${({ theme }) => theme.bp.medium}) {
    --height: 10px;
  }
`;

interface RatingBarProps {
  progress: number;
  i: number;
}

export const RatingBar: React.FC<RatingBarProps> = ({ progress, i }) => {
  return (
    <li>
      <span>{5 - i}</span>
      <StyledRatingBar>
        <div
          className="progress"
          style={{
            width: `${progress * 100 + 10}%`,
            animationDelay: `${i * 200}ms`,
          }}
        />
      </StyledRatingBar>
    </li>
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
    <StarRatings style={{ fontSize: `${size}px` }}>
      <div className="fill-ratings" style={{ width: `${percentage * 20}%` }}>
        <span>★★★★★</span>
      </div>
      <div className="empty-ratings">
        <span>★★★★★</span>
      </div>
    </StarRatings>
  );
};
