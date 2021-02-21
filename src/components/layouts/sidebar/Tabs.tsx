import { useSelectedTabValue } from "context";
import { AnimatePresence, AnimateSharedLayout, motion } from "framer-motion";
import Head from "next/head";
import Link from "next/link";
import { rgba } from "polished";
import { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import { UserType } from "ts";
import {
  devTabIcons,
  devTabNames,
  testerTabIcons,
  testerTabNames,
} from "ts/constants";

interface TabRowProps {
  selected: boolean;
  icon: boolean;
}

const TabsContainer = styled.ul`
  margin-bottom: 3em;
`;

export const TabRow = styled.li<TabRowProps>`
  width: 100%;
  padding: 15px ${(p) => (p.icon ? "65px" : "30px")};
  margin-bottom: 0.25em;
  font-size: 1.2rem;
  cursor: pointer;
  position: relative;
  font-weight: bold;
  text-transform: capitalize;
  display: inline-flex;
  align-items: center;
  ${(p) =>
    p.selected
      ? css`
          color: var(--primary);
          font-weight: bold;
        `
      : css`
          color: #000000;
          font-weight: normal;
        `};
  transition: 0.25s all linear;

  span {
    margin-right: 0.5em;
    position: absolute;
    left: 30px;
    svg {
      width: 1.3rem;
      height: 1.3rem;
    }
  }
  div {
    background: ${(p) => rgba(p.theme.primary, 0.1)};
    position: absolute;
    left: 0;
    background: linear-gradient(
      to right,
      ${(p) => rgba(p.theme.primary, 0.2)},
      var(--layout-content-background)
    );
    border-left: 3px solid ${(p) => rgba(p.theme.primary, 0.8)};
    width: 100%;
    height: 100%;
    z-index: -1;
  }
`;

interface TabsProps {
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
  tabTypes: UserType;
}

export const Tabs: React.FC<TabsProps> = ({ setSidebarOpen, tabTypes }) => {
  // tabs and icons indices correspond to eachother
  // make constants file and put every tab in object with icon; differ between dev and tester tabs
  const tabs = tabTypes === "tester" ? testerTabNames : devTabNames;
  const icons = tabTypes === "tester" ? testerTabIcons : devTabIcons;

  const { selectedTab, setSelectedTab } = useSelectedTabValue();
  const [active, setActive] = useState<string>(selectedTab);

  const handleTabSwitch = (newActive: string) => {
    setActive(newActive);
    setSelectedTab(newActive);
    setSidebarOpen(false);
  };

  useEffect(() => {
    !tabs.includes(selectedTab)
      ? handleTabSwitch("today")
      : handleTabSwitch(selectedTab);
  }, [selectedTab]);

  return (
    <AnimateSharedLayout>
      <TabsContainer>
        <Head>
          <title>{active[0].toUpperCase() + active.slice(1)} | Testiply</title>
        </Head>
        {tabs &&
          tabs.map((tabName, i) => (
            <Link
              href={
                tabName === "today"
                  ? "/store"
                  : tabTypes === "tester"
                  ? `/store/${tabName}`
                  : `/dev/${tabName}`
              }
              key={i}
            >
              <TabRow
                selected={active === tabName}
                onClick={() => handleTabSwitch(tabName)}
                onKeyDown={() => handleTabSwitch(tabName)}
                icon={!!icons[i]}
                role="button"
                as={motion.li}
                animate
                aria-label={`Switch tab to ${tabName}`}
              >
                {active === tabName ? (
                  <span>{icons[i][1]}</span>
                ) : (
                  <span>{icons[i][0]}</span>
                )}
                {tabName}
                {active === tabName && <motion.div layoutId="background" />}
              </TabRow>
            </Link>
          ))}
      </TabsContainer>
    </AnimateSharedLayout>
  );
};
