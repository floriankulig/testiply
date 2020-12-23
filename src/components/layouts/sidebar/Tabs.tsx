import { useSelectedTabValue } from "context";
import { rgba } from "polished";
import { useState } from "react";
import styled, { css } from "styled-components"

const SidebarTabs = styled.ul`
    margin: 2em 0;

`;

interface TabRowProps {
    selected: boolean;
};
const TabRow = styled.li<TabRowProps>`
    width: 100%;
    padding: 15px 15px;
    margin-bottom: .25em;
    border-radius: var(--border-radius);
    font-size: 1.2rem;
    cursor: pointer;
    font-weight: bold;
    text-transform: capitalize;
    ${p => p.selected ? css`
        color: var(--primary);
        font-weight: bold;
        background: ${(p) => rgba(p.theme.primary, 0.1)};
    ` : css`
        color: #000000;
        font-weight: normal;
    `};
    &:hover {
        background: ${(p) => rgba(p.theme.primary, 0.1)};
    }
    transition: 0.25s all var(--easing);
`;

interface TabsProps {
    setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export const Tabs: React.FC<TabsProps> = ({ setSidebarOpen }) => {
    const { setSelectedTab } = useSelectedTabValue();
    const tabs = ["today", "apps", "games", "categories", "news"];
    const [active, setActive] = useState<string>(tabs[0]);

    const handleTabSwitch = (newActive: string) => {
        setActive(newActive)
        setSelectedTab(newActive);
        setSidebarOpen(false)
    }

    return (
        <SidebarTabs>
            {tabs &&
                tabs.map((tab, i) => (
                    <TabRow
                        selected={active === tab}
                        onClick={() => handleTabSwitch(tab)}
                        onKeyDown={() => handleTabSwitch(tab)}
                        key={i}
                        role="button"
                        aria-label={`Switch tab to ${tab}`}
                    >
                        {tab}
                    </TabRow>
                ))}
        </SidebarTabs>
    )
}