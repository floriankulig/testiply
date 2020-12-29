import { useOnClickOutside } from "hooks"
import { useRef } from "react";
import styled from "styled-components"
import { Tabs } from "./Tabs";

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
    transition: 0.1s transform var(--easing);

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

interface SidebarProps {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Sidebar: React.FC<SidebarProps> = ({ open, setOpen }) => {
    const ref = useRef<HTMLDivElement>();
    useOnClickOutside(ref, () => setOpen(false))

    return (
        <StyledSidebar ref={ref} open={open}>
            <div className="logo">BetaStore </div>
            <Tabs setSidebarOpen={setOpen} />
        </StyledSidebar>
    )
}