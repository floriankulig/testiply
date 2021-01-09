import { useOnClickOutside } from "hooks"
import { useRef } from "react";
import styled from "styled-components"
import { TabRow, Tabs } from "./Tabs";
import { BiLogOut } from "react-icons/bi"
import { useAuthValue } from "context";

interface StyledSidebarProps {
    open: boolean;
}

const StyledSidebar = styled.div<StyledSidebarProps>`
    background-color: var(--layout-nav-background);
    width: var(--sidebar-width);
    transform: ${p => p.open ? "translateX(0)" : "translateX(-100%)"};
    @media (${({ theme }) => theme.bp.big}){
        transform: translateX(0);
    } 
    height: 100vh;
    position: fixed;
    z-index: 99999;
    padding: 0 15px;
    transition: var(--sidebarDuration) transform var(--easing);

    .logo{
        display: inline-flex;
        align-items: center; 
        font-weight: bold;
        font-size: 1.5rem;
        width: max-content; 
        margin: 0 50px;
        height: var(--header-height);
    }
`

const SidebarContent = styled.div`
    min-height: calc(100vh - var(--header-height));
    padding: 3em 0 5em;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`;

interface SidebarProps {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Sidebar: React.FC<SidebarProps> = ({ open, setOpen }) => {
    const ref = useRef<HTMLDivElement>();
    const { currentUser } = useAuthValue();
    useOnClickOutside(ref, () => setOpen(false))

    return (
        <StyledSidebar ref={ref} open={open}>
            <div className="logo">BetaStore </div>
            <SidebarContent>
                <Tabs setSidebarOpen={setOpen} />
                {currentUser && (
                    <TabRow selected={false} icon>
                        <span>
                            <BiLogOut />
                        </span>
                        Logout
                    </TabRow>
                )}
            </SidebarContent>
        </StyledSidebar>
    )
}