import { useSelectedTabValue } from "context";
import { motion } from "framer-motion";
import Head from "next/head";
import Link from "next/link";
import { rgba } from "polished";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { theme } from "styles";
import { UserType } from "ts";
import {
  devTabIcons,
  devTabNames,
  testerTabIcons,
  testerTabNames,
} from "ts/constants";

interface TabRowProps {
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
  text-transform: capitalize;
  display: inline-flex;
  align-items: center;

  span {
    margin-right: 0.5em;
    position: absolute;
    left: 30px;
    svg {
      width: 1.3rem;
      height: 1.3rem;
    }
  }
  div.tab-background {
    position: absolute;
    left: 0;
    background: ${(p) => rgba(p.theme.primary, 0.2)};
    border-left: 3px solid ${(p) => rgba(p.theme.primary, 0.7)};
    width: 85%;
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
              onClick={() => handleTabSwitch(tabName)}
              onKeyDown={() => handleTabSwitch(tabName)}
              icon={!!icons[i]}
              role="button"
              as={motion.li}
              animate={{
                color: active === tabName ? theme.primary : theme.navy,
                fontWeight: active === tabName ? "bold" : "normal",
              }}
              aria-label={`Switch tab to ${tabName}`}
            >
              {active === tabName ? (
                <span>{icons[i][1]}</span>
              ) : (
                <span>{icons[i][0]}</span>
              )}
              {tabName}
              {active === tabName && (
                <motion.div
                  className="tab-background"
                  style={{
                    borderTopRightRadius: "25px",
                    borderBottomRightRadius: "25px",
                  }}
                  layoutId="background"
                />
              )}
            </TabRow>
          </Link>
        ))}
    </TabsContainer>
  );
};
