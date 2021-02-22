import { Overlay } from "components/Overlay";
import { AnimatePresence, motion } from "framer-motion";
import { useCannotScroll, useOnClickOutside } from "hooks";
import { darken, rgba } from "polished";
import React, { useRef, useState } from "react";
import styled from "styled-components";
import { Feedback } from "ts";
import { StarPercentageRating } from "./Rating";

const StyledFeedbackTile = styled.li`
  --background: ${({ theme }) => darken(0.01, theme.layoutContentBg)};
  position: relative;
  padding: 2em 2.5em;
  display: flex;
  flex-direction: column;
  background: var(--background);
  max-height: 200px;
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
      font-size: 1.6rem;
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
    ${({ theme }) => rgba(darken(0.01, theme.layoutContentBg), 0.05)},
    ${({ theme }) => rgba(darken(0.01, theme.layoutContentBg), 1)} 50%,
    ${({ theme }) => rgba(darken(0.01, theme.layoutContentBg), 1)}
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
  width: clamp(100px, 90%, 500px);
  box-shadow: 15px 30px 40px ${({ theme }) => rgba(theme.navy, 0.15)};
  padding: 3em;
  /* position: absolute; */
  /* align-self: center; */
  z-index: 3;
  /* left: 50%; */
  /* transform: translateX(-50%); */
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
              <motion.span
                className="feedback__date"
                layoutId={`feedbackTile-metaDate-${_id}`}
              >
                {date}
              </motion.span>
              <StarPercentageRating percentage={rating} />
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
      {isOpen && <Overlay style={{ zIndex: 2 }}></Overlay>}
      <AnimatePresence>
        {isOpen && (
          <Overlay style={{ background: "none" }}>
            <StyledFeedbackDetail
              style={{ borderRadius: "2em" }}
              ref={detailRef}
              as={motion.div}
              layoutId={`feedbackTile-${_id}`}
            >
              <TopBar>
                <motion.h3
                  layoutId={`feedbackTile-heading-${_id}`}
                  className="feedback__heading"
                >
                  {heading}
                </motion.h3>
                <MetaData as={motion.div} layoutId={`feedbackTile-meta-${_id}`}>
                  <motion.span
                    className="feedback__date"
                    layoutId={`feedbackTile-metaDate-${_id}`}
                  >
                    {date}
                  </motion.span>
                  <StarPercentageRating percentage={rating} />
                </MetaData>
              </TopBar>
              <motion.div
                layoutId={`feedbackTile-text-${_id}`}
                className="feedback__text"
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
