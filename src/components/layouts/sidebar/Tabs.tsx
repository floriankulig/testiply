import { useSelectedTabValue } from "context";
import Head from "next/head";
import { rgba } from "polished";
import { useEffect, useState } from "react";
import { AiOutlineHome, AiFillHome, AiOutlineAppstore, AiFillAppstore } from "react-icons/ai"
import { IoGameControllerOutline, IoGameController, IoNewspaperOutline, IoNewspaper } from "react-icons/io5"
import { RiStackLine, RiStackFill } from "react-icons/ri"
import styled, { css } from "styled-components"

const SidebarTabs = styled.ul`
    margin: 2em 0;
`;

interface TabRowProps {
    selected: boolean;
    icon: boolean;
};
const TabRow = styled.li<TabRowProps>`
    width: 100%;
    padding: 15px ${p => p.icon && "50px"};
    margin-bottom: .25em;
    border-radius: var(--border-radius);
    font-size: 1.2rem;
    cursor: pointer;
    position: relative;
    font-weight: bold;
    text-transform: capitalize;
    display: inline-flex;
    align-items: center;
    ${p => p.selected ? css`
        color: var(--primary);
        font-weight: bold;
        background: ${(p) => rgba(p.theme.primary, 0.1)};
    ` : css`
        color: #000000;
        font-weight: normal;
    `};
    &:hover {
        background: ${(p) => rgba(p.theme.primary, 0.05)};
    }
    transition: 0.25s all linear;

    span {
        margin-right: .5em;
        position: absolute;
        left: 15px;
        svg{
            width: 1.3rem;
            height: 1.3rem;
        }
    }
`;

interface TabsProps {
    setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export const Tabs: React.FC<TabsProps> = ({ setSidebarOpen }) => {
    // tabs and icons indices correspond to eachother
    const tabs = ["today", "apps", "games", "categories", "news"];
    const icons = [[<AiOutlineHome />, <AiFillHome />], [<AiOutlineAppstore />, <AiFillAppstore />], [<IoGameControllerOutline />, <IoGameController />], [<RiStackLine />, <RiStackFill />], [<IoNewspaperOutline />, <IoNewspaper />]]

    const { selectedTab, setSelectedTab } = useSelectedTabValue();
    const [active, setActive] = useState<string>(selectedTab);

    const handleTabSwitch = (newActive: string) => {
        setActive(newActive)
        setSelectedTab(newActive);
        setSidebarOpen(false)
    }

    useEffect(() => {
        handleTabSwitch(selectedTab)
    }, [selectedTab]);

    return (
        <SidebarTabs>
            <Head>
                <title>{active[0].toUpperCase() + active.slice(1)} | Beta App Store</title>
            </Head>
            {tabs &&
                tabs.map((tabName, i) => (
                    <TabRow
                        selected={active === tabName}
                        onClick={() => handleTabSwitch(tabName)}
                        onKeyDown={() => handleTabSwitch(tabName)}
                        key={i}
                        icon={!!icons[i]}
                        role="button"
                        aria-label={`Switch tab to ${tabName}`}
                    >
                        {active === tabName ? (
                            <span>
                                {icons[i][1]}
                            </span>
                        ) : (
                                <span>
                                    {icons[i][0]}
                                </span>
                            )}
                        {tabName}
                    </TabRow>
                ))}
        </SidebarTabs>
    )
}