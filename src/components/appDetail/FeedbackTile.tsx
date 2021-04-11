import { Button } from "components/Button";
import { Loading } from "components/Loading";
import { Overlay } from "components/Overlay";
import { AnimatePresence, motion, Variants } from "framer-motion";
import { getFormattedDate } from "helpers";
import { useOnClickOutside } from "hooks";
import Link from "next/link";
import { rgba } from "polished";
import React, { useRef, useState } from "react";
import styled from "styled-components";
import { Feedback } from "ts";
import { fadeInOutVariants } from "styles";
import { StarPercentageRating } from "./Rating";

export const feedbackVariants: Variants = {
  open: {
    opacity: 1,
    scale: 1,
  },
  closed: { opacity: 0, scale: 0 },
};

const StyledFeedbackTile = styled.li`
  position: relative;
  padding: 2.5em 2em 3em;
  @media (${(p) => p.theme.bp.big}) {
    padding: 2.5em 2.5em 3em;
  }
  display: flex;
  flex-direction: column;
  background: #fefeff;
  box-shadow: 2px 8px 20px ${({ theme }) => rgba(theme.primary, 0.07)};
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

const BottomBar = styled.div`
  display: flex;
  margin-top: 1.5em;
  justify-content: flex-end;
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
  feedback: { text, date, heading, rating, _id, appId, appName },
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isRedirecting, setIsRedirecting] = useState<boolean>(false);
  const detailRef = useRef<HTMLDivElement>(null);
  useOnClickOutside(detailRef, () => setIsOpen(false));

  return (
    <>
      <StyledFeedbackTile
        as={motion.li}
        style={{ borderRadius: "1.25em" }}
        layoutId={`feedbackTile-${_id}`}
        initial="closed"
        animate="open"
        exit="closed"
        variants={feedbackVariants}
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
            <motion.p>{text}</motion.p>
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
                <motion.p>{text}</motion.p>
              </motion.div>
              <BottomBar>
                <Link href={`/app/${appId}`}>
                  <Button
                    disableElevation
                    onClick={() => setIsRedirecting(true)}
                    onKeyDown={() => setIsRedirecting(true)}
                    aria-label={`See the detail page for ${appName}`}
                  >
                    {!isRedirecting ? `View ${appName}` : <Loading size={40} />}
                  </Button>
                </Link>
              </BottomBar>
            </StyledFeedbackDetail>
          </Overlay>
        )}
      </AnimatePresence>
    </>
  );
};
