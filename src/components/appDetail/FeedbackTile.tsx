import { Overlay } from "components/Overlay";
import { AnimatePresence, motion } from "framer-motion";
import { getFormattedDate } from "helpers";
import { useOnClickOutside } from "hooks";
import { rgba } from "polished";
import React, { useRef, useState } from "react";
import styled from "styled-components";
import { Feedback } from "ts";
import { fadeInOutVariants } from "ts/constants";
import { StarPercentageRating } from "./Rating";

const StyledFeedbackTile = styled.li`
  position: relative;
  padding: 2.5em 2em 3em;
  @media (${(p) => p.theme.bp.big}) {
    padding: 2.5em 2.5em 3em;
  }
  display: flex;
  flex-direction: column;
  background: #fefeff;
  & .content-wrapper {
    position: relative;
    height: 100%;
    width: 100%;
  }

  & .feedback {
    &__date {
      color: ${({ theme }) => rgba(theme.navy, 0.5)};
      margin-bottom: 0.25em;
      font-size: 0.8rem;
    }
    &__heading {
      margin: 0;
      font-size: 1.5rem;
    }
    &__text {
      overflow-y: hidden;
      color: ${({ theme }) => rgba(theme.navy, 0.7)};
      height: 72px;
      p {
        margin: 0;
      }
    }
  }
`;

const TopBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin: 0 0 1.5em;
`;

const MetaData = styled.div`
  display: flex;
  flex-direction: column;
  text-align: right;
`;

const ShowMoreButton = styled.button`
  position: absolute;
  bottom: 0;
  right: 0;
  color: var(--primary);
  background: linear-gradient(
    to right,
    ${rgba("#fefeff", 0.05)},
    ${rgba("#fefeff", 1)} 50%,
    ${rgba("#fefeff", 1)}
  );
  border: none;
  padding: 0.25em 0 0 0.25em;
  width: 90px;
  text-align: right;
  font-size: 1rem;
  span {
    cursor: pointer;
  }
`;

const StyledFeedbackDetail = styled.div`
  background: #fefeff;
  width: clamp(100px, 85%, 500px);
  padding: 3em 3em 3.5em;
  z-index: 3;

  & .feedback-detail {
    &__date {
      color: ${({ theme }) => rgba(theme.navy, 0.5)};
      font-size: 1rem;
    }
    &__heading {
      margin: 0;
      font-size: 2rem;
    }
    &__text {
      color: ${({ theme }) => rgba(theme.navy, 0.7)};
      height: auto;
      max-width: 60ch;
      p {
        margin: 0;
      }
    }
    &__rating {
      margin-bottom: 0.5em;
    }
  }
  ${TopBar} {
    align-items: center;
    margin: 1em 0 1.5em;
  }
`;

export const FeedbackTile: React.FC<{ feedback: Feedback }> = ({
  feedback: { text, date, heading, rating, _id },
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const detailRef = useRef<HTMLDivElement>(null);
  useOnClickOutside(detailRef, () => setIsOpen(false));

  return (
    <>
      <StyledFeedbackTile
        as={motion.li}
        style={{ borderRadius: "1em" }}
        layoutId={`feedbackTile-${_id}`}
      >
        <div className="content-wrapper">
          <TopBar>
            <motion.h3
              layoutId={`feedbackTile-heading-${_id}`}
              className="feedback__heading"
            >
              {heading}
            </motion.h3>
            <MetaData as={motion.div} layoutId={`feedbackTile-meta-${_id}`}>
              {!!date && (
                <motion.span
                  className="feedback__date"
                  layoutId={`feedbackTile-metaDate-${_id}`}
                >
                  {getFormattedDate(date)}
                </motion.span>
              )}
              <motion.div layoutId={`feedbackTile-rating-${_id}`}>
                <StarPercentageRating percentage={rating} />
              </motion.div>
            </MetaData>
          </TopBar>
          <motion.div
            layoutId={`feedbackTile-text-${_id}`}
            className="feedback__text"
          >
            <p>{text}</p>
          </motion.div>
          <ShowMoreButton>
            <span
              className="link"
              onClick={() => setIsOpen(!isOpen)}
              onKeyDown={() => setIsOpen(!isOpen)}
              aria-label="View more of this feedback"
              tabIndex={0}
              role="button"
            >
              more
            </span>
          </ShowMoreButton>
        </div>
      </StyledFeedbackTile>
      <AnimatePresence>
        {isOpen && (
          <Overlay
            as={motion.div}
            asPortal
            initial="closed"
            animate="open"
            exit="closed"
            variants={fadeInOutVariants}
          >
            <StyledFeedbackDetail
              style={{ borderRadius: "2em" }}
              ref={detailRef}
              as={motion.div}
              layoutId={`feedbackTile-${_id}`}
            >
              <motion.div
                className="feedback-detail__rating"
                layoutId={`feedbackTile-rating-${_id}`}
              >
                <StarPercentageRating percentage={rating} size={40} />
              </motion.div>
              <TopBar>
                <motion.h3
                  layoutId={`feedbackTile-heading-${_id}`}
                  className="feedback-detail__heading"
                >
                  {heading}
                </motion.h3>
                {!!date && (
                  <motion.span
                    className="feedback-detail__date"
                    layoutId={`feedbackTile-metaDate-${_id}`}
                  >
                    {getFormattedDate(date)}
                  </motion.span>
                )}
              </TopBar>
              <motion.div
                layoutId={`feedbackTile-text-${_id}`}
                className="feedback-detail__text"
              >
                <p>{text}</p>
              </motion.div>
            </StyledFeedbackDetail>
          </Overlay>
        )}
      </AnimatePresence>
    </>
  );
};
