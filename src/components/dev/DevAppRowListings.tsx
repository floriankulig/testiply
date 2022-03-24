import { motion, Variants } from "framer-motion";
import { findPlatformIconFromLabel } from "helpers";
import { useHorizontalScroll } from "hooks";
import { rgba } from "polished";
import { useRef } from "react";
import styled from "styled-components";
import { App, Category, Platform } from "ts";
import {
  platforms as possiblePlatforms,
  categories as possibleCategories,
} from "ts/constants";
import { StyledAppDevRowSectionHeader } from "./DevAppRow";

// we hardcode the values here because there is no suitable grid/flexbox solution
const bp1 = "620px";
const bp2 = "960px";
const bp3 = "1310px";

const StyledListings = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;

  @media (min-width: ${bp1}) {
    width: 80%;
    margin: 0 auto 0;
  }
  @media (min-width: ${bp2}) {
    width: min-content;
    margin: 0;
  }
`;
const StyledListing = styled.div`
  &:not(:last-child) {
    margin-bottom: 1.25em;
  }
  @media (min-width: ${bp3}) {
    &:not(:last-child) {
      margin-bottom: 2em;
    }
  }
`;
const StyledListingList = styled.ul`
  display: flex;
  margin-top: 0.6em;
  white-space: nowrap;
  width: max-content;
  gap: 1em;
  overflow: visible;
`;
const StyledListingListItem = styled.li`
  background: var(--layout-nav-background);
  border-radius: 3em;
  padding: 0.5em 1em 0.5em 0.7em;
  border: 1px solid ${(p) => rgba(p.theme.primary, 0.05)};
  box-shadow: ${rgba(0, 0, 0, 0.01)} 0px 0px 15px;
  display: flex;
  align-items: center;
  font-size: 0.95rem;
  user-select: none;
  svg {
    margin-top: -2px;
    margin-right: 0.5em;
    color: #888888;
    font-size: 1rem;
  }
`;

const containerVariants: Variants = {
  initialListings: {},
  animateListings: {
    transition: { delayChildren: 0.7, staggerChildren: 0.075 },
  },
  exitListings: {
    transition: {
      delayChildren: 0.5,
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

interface DevAppRowListingsProps {
  app: App;
}

export const DevAppRowListings: React.FC<DevAppRowListingsProps> = ({
  app,
}) => {
  const categories = app.categories.map((catID) =>
    possibleCategories.find((cat) => cat.id === catID)
  );
  const platforms = app.platforms.map((platID) =>
    possiblePlatforms.find((plat) => plat.id === platID)
  );

  const chipsParentRef = useRef<HTMLHeadingElement>(null);

  return (
    <StyledListings
      as={motion.div}
      layout
      ref={chipsParentRef}
      variants={containerVariants}
    >
      {categories.length >= 1 && (
        <Listing
          array={categories}
          parentRef={chipsParentRef}
          type="categories"
          app={app}
        />
      )}
      {platforms.length >= 1 && (
        <Listing
          array={platforms}
          parentRef={chipsParentRef}
          type="platforms"
          app={app}
        />
      )}
    </StyledListings>
  );
};

interface ListingProps {
  array: Array<Platform> | Array<Category>;
  type: "platforms" | "categories";
  parentRef: React.MutableRefObject<HTMLHeadingElement>;
  app: App;
}

const Listing: React.FC<ListingProps> = ({ array, type, parentRef, app }) => {
  const chipListRef = useRef<HTMLUListElement>(null);
  const { scrollable, retriggerScrollCheck } = useHorizontalScroll(
    parentRef.current,
    chipListRef.current
  );
  return (
    <StyledListing as={motion.div}>
      <StyledAppDevRowSectionHeader
        as={motion.h4}
        variants={listHeaderVariants}
      >
        {type === "platforms"
          ? array.length > 1
            ? "Platforms"
            : "Platform"
          : array.length > 1
          ? "Categories"
          : "Category"}
      </StyledAppDevRowSectionHeader>
      <StyledListingList
        as={motion.ul}
        animate={!scrollable ? { x: 0 } : {}}
        onMouseEnter={() => retriggerScrollCheck()}
        drag={scrollable ? "x" : false}
        dragConstraints={parentRef}
        dragTransition={{
          bounceStiffness: 400,
          bounceDamping: 50,
        }}
        ref={chipListRef}
      >
        {array?.map((item) => {
          const Icon =
            type === "platforms"
              ? findPlatformIconFromLabel(item.displayName)
              : item.icon;
          return (
            <StyledListingListItem
              as={motion.li}
              layout
              key={`platform-${item.id}-app-${app._id}`}
              variants={listItemVariants}
            >
              <Icon />
              {item.displayName}
            </StyledListingListItem>
          );
        })}
      </StyledListingList>
    </StyledListing>
  );
};
