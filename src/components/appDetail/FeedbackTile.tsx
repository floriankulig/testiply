import { darken, rgba } from "polished";
import React from "react";
import styled from "styled-components";
import { Feedback } from "ts";
import { StarPercentageRating } from "./Rating";

const StyledFeedbackTile = styled.li`
  --background: ${({ theme }) => darken(0.02, theme.layoutContentBg)};
  border-radius: 1em;
  position: relative;
  padding: 1.5em;
  display: flex;
  flex-direction: column;
  background: var(--background);
  max-height: 200px;
  /* overflow: hidden; */
  & .content-wrapper {
    position: relative;
    height: 100%;
    width: 100%;
  }

  & .feedback {
    &__text {
      overflow-y: hidden;
      color: green;
      height: 72px;
      p {
        margin-top: 0;
      }
    }
  }
`;

const ShowMoreButton = styled.button`
  position: absolute;
  bottom: 0;
  right: 0;
  color: var(--primary);
  background: linear-gradient(
    to right,
    ${({ theme }) => rgba(darken(0.02, theme.layoutContentBg), 0.05)},
    ${({ theme }) => rgba(darken(0.02, theme.layoutContentBg), 1)} 40%,
    ${({ theme }) => rgba(darken(0.02, theme.layoutContentBg), 1)}
  );
  border: none;
  padding: 0.25em;
  width: 80px;
  text-align: right;
  font-size: 1rem;
  /* width: max-content; */
  cursor: pointer;
`;

export const FeedbackTile: React.FC<{ feedback: Feedback }> = ({
  feedback: { text, date, heading, rating },
}) => {
  return (
    <StyledFeedbackTile>
      <div className="content-wrapper">
        <h3 className="feedback__heading">{heading}</h3>
        <StarPercentageRating percentage={rating} />
        <div className="feedback__text">
          <p>{text}</p>
        </div>
        <ShowMoreButton>more</ShowMoreButton>
      </div>
    </StyledFeedbackTile>
  );
};
