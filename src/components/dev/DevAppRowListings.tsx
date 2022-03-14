import { motion, Variants } from "framer-motion";
import { findPlatformIconFromLabel } from "helpers";
import { rgba } from "polished";
import styled from "styled-components";
import { App } from "ts";
import {
  platforms as possiblePlatforms,
  categories as possibleCategories,
} from "ts/constants";

// we hardcode the values here because there is no suitable grid/flexbox solution
const bp1 = "620px";
const bp2 = "960px";
const bp3 = "1310px";

const StyledListings = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 2em;
  height: 100%;

  @media (min-width: ${bp1}) {
    width: 80%;
    margin: 2em auto 0;
  }
  @media (min-width: ${bp2}) {
    margin: 0;
    margin-top: 2em;
  }
`;
const StyledListing = styled.div`
  &:not(:last-child) {
    margin-bottom: 1.25em;
  }
`;
const StyledListingHeader = styled.h4`
  /* text-transform: uppercase; */
  /* font-size: clamp(1.1rem, 2vw, 1.3rem); */
  font-size: clamp(1.4rem, 3vw, 1.5rem);
  font-weight: 500;
  color: var(--navy);
  margin: 0;
`;
const StyledListingList = styled.ul`
  display: flex;
  margin-top: 0.6em;
`;
const StyledListingListItem = styled.li`
  &:not(:last-child) {
    margin-right: 1em;
  }
  background: var(--layout-nav-background);
  border-radius: 3em;
  padding: 0.5em 1em 0.5em 0.7em;
  border: 1px solid ${(p) => rgba(p.theme.primary, 0.05)};
  box-shadow: ${rgba(0, 0, 0, 0.01)} 0px 0px 15px;
  display: flex;
  align-items: center;
  font-size: 0.95rem;
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
    transition: { delayChildren: 0.3, staggerChildren: 0.1 },
  },
  exitListings: {
    transition: {
      //   delayChildren: 0.1,
      staggerChildren: 0.1,
      staggerDirection: -1,
    },
  },
};
const listHeaderVariants: Variants = {
  initialListings: { y: -20, x: -2, opacity: 0 },
  animateListings: { y: 0, x: 0, opacity: 1, transition: { duration: 0.35 } },
  exitListings: { y: -20, x: -2, opacity: 0, transition: { duration: 0.25 } },
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
  return (
    <StyledListings as={motion.div} layout variants={containerVariants}>
      {categories.length >= 1 && (
        <StyledListing as={motion.div}>
          <StyledListingHeader as={motion.h4} variants={listHeaderVariants}>
            {categories.length > 1 ? "Categories" : "Category"}
          </StyledListingHeader>
          <StyledListingList as={motion.ul}>
            {categories?.map((category) => (
              <StyledListingListItem
                as={motion.li}
                key={`category-${category.id}-app-${app._id}`}
                layout
                variants={listItemVariants}
              >
                <category.icon />
                {category.displayName}
              </StyledListingListItem>
            ))}
          </StyledListingList>
        </StyledListing>
      )}
      {platforms.length >= 1 && (
        <StyledListing as={motion.div}>
          <StyledListingHeader as={motion.h4} variants={listHeaderVariants}>
            {platforms.length > 1 ? "Platforms" : "Platform"}
          </StyledListingHeader>
          <StyledListingList as={motion.ul}>
            {platforms?.map((platform) => {
              const Icon = findPlatformIconFromLabel(platform.displayName);
              console.log(Icon);
              return (
                <StyledListingListItem
                  as={motion.li}
                  layout
                  key={`platform-${platform.id}-app-${app._id}`}
                  variants={listItemVariants}
                >
                  <Icon />
                  {platform.displayName}
                </StyledListingListItem>
              );
            })}
          </StyledListingList>
        </StyledListing>
      )}
    </StyledListings>
  );
};
