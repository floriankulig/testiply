import { MockAppDetailView } from "components/appDetail";
import { AnimatePresence, motion } from "framer-motion";
import { useIsMobile } from "hooks";
import Image from "next/image";
import Link from "next/link";
import { rgba } from "polished";
import React, { useEffect, useState } from "react";
import { FaChevronDown, FaStar } from "react-icons/fa";
import styled from "styled-components";
import { AppPreview } from "ts";

interface OpenProp {
  open?: boolean;
}

const APPSTACKWIDTH = 640;

const StyledAppTile = styled.li`
  position: relative;
  box-shadow: 2px 8px 20px ${({ theme }) => rgba(theme.navy, 0.1)};
  padding: 1em;
  display: flex;
  flex-direction: column;
  background: #fefeff;
  @media (${({ theme }) => theme.bp.medium}) {
    padding: 1.5em;
  }
  .edge-fader {
    position: absolute;
    top: 1em;
    right: 1em;
    height: calc(100% - 2em);
    width: 40px;
    background: linear-gradient(to right, ${rgba("#fefeff", 0.001)}, #fefeff);
    z-index: 1;
  }
`;

const StyledRow = styled.div<Partial<OpenProp>>`
  max-height: 85px;
  display: flex;
  &:first-of-type {
    cursor: pointer;
  }
  p {
    margin: 0;
  }
  margin-bottom: ${(p) => (p.open ? "1em" : "0")};
  .app {
    &__name {
      color: ${({ theme }) => rgba(theme.navy, 0.8)};
      font-weight: bold;
      font-size: 1.2rem;
      overflow: hidden;
    }
    &__rating {
      display: flex;
      align-items: center;
      svg {
        font-size: 0.7rem;
        margin-left: 5px;
      }
    }
    &__desc {
      max-width: 95%;
      height: auto;
      word-wrap: break;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
  }
`;

const IconWrapper = styled.div`
  height: 85px;
  width: 85px;
  min-height: 85px;
  min-width: 85px;
  box-shadow: 0px 0px 20px ${({ theme }) => rgba(theme.navy, 0.05)};
  border-radius: 20%;
  user-select: none;
  .icon {
    height: 100%;
    width: 100%;
    border-radius: 20%;
  }
`;

const StyledAppInfo = styled.div`
  margin-left: 1em;
  padding: 5px 0;
  display: flex;
  overflow: hidden;
  width: 90%;
  flex-direction: column;
  justify-content: space-between;
  color: ${({ theme }) => rgba(theme.navy, 0.5)};
`;

const SVGOpenerWrapper = styled.span<OpenProp>`
  position: absolute;
  right: 1em;
  top: calc(85px - 15px);
  border-radius: 20%;
  height: 30px;
  width: 30px;
  display: grid;
  place-items: center;
  cursor: pointer;
  color: ${({ theme }) => rgba(theme.navy, 0.6)};
  transition: 0.3s var(--easing);
  transition-property: background, color;
  z-index: 2;
  svg {
    height: 80%;
    width: 80%;
    transform: rotate(${(p) => (p.open ? "180deg" : "0deg")});
    transition: transform 0.3s var(--easing);
  }
  &:hover,
  &:focus {
    color: var(--primary);
    background: ${({ theme }) => rgba(theme.navy, 0.1)};
  }
`;

interface AppTileProps {
  style?: React.CSSProperties;
  className?: string;
  appInfo: AppPreview;
}

export const AppTile: React.FC<AppTileProps> = ({
  appInfo,
  className,
  style,
}) => {
  const { name, description, _id, devName, rating } = appInfo;
  const appsStack = useIsMobile(APPSTACKWIDTH - 1); //Apps stack with less than 640px
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const [detailOpened, setDetailOpened] = useState<boolean>(false);
  const iconURL = `${process.env.NEXT_PUBLIC_API_URL}/static/${_id}/icon.png`;

  useEffect(() => {
    // open apps if apps are not stacking in grid
    setIsOpen(!appsStack);
  }, [appsStack]);

  return (
    <>
      <StyledAppTile
        style={{ ...style, borderRadius: "1.5em" }}
        className={className}
        as={motion.li}
        layout
        layoutId={`appTile-${_id}`}
      >
        <Link href={`/app/${_id}`}>
          <StyledRow
            open={isOpen}
            aria-label={`View details for ${name}.`}
            onClick={() => setDetailOpened(true)}
            onKeyDown={() => setDetailOpened(true)}
            tabIndex={0}
            role="button"
          >
            <IconWrapper
              as={motion.div}
              layoutId={`appIcon-${_id}`}
              style={{ borderRadius: "25%" }}
            >
              <Image
                width={85}
                height={85}
                src={iconURL}
                className="icon"
                alt={`${name} app icon`}
              />
            </IconWrapper>
            <StyledAppInfo>
              <motion.p layoutId={`appTitle-${_id}`} className="app__name">
                {name}
              </motion.p>
              <motion.p layoutId={`appDevName-${_id}`} className="app__dev">
                {devName}
              </motion.p>
              <motion.div
                className="app__rating"
                layout
                style={{ color: rating.total > 0 && "orange" }}
              >
                {rating.total} <FaStar />
              </motion.div>
            </StyledAppInfo>
          </StyledRow>
        </Link>
        {appsStack && (
          <SVGOpenerWrapper
            onClick={() => setIsOpen((prev) => !prev)}
            onKeyDown={() => setIsOpen((prev) => !prev)}
            aria-label={`Open Description for ${name}.`}
            tabIndex={0}
            role="button"
            open={appsStack ? isOpen : true}
          >
            <FaChevronDown />
          </SVGOpenerWrapper>
        )}
        <div className="edge-fader" />
        {isOpen && (
          <StyledRow>
            <motion.p
              className="app__desc"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0, transition: { delay: 0.2 } }}
            >
              {description}
            </motion.p>
          </StyledRow>
        )}
      </StyledAppTile>
      <AnimatePresence>
        {detailOpened && (
          <MockAppDetailView
            _id={_id}
            appName={name}
            devName={devName}
            iconURL={iconURL}
          />
        )}
      </AnimatePresence>
    </>
  );
};
