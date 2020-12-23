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
    padding: 0 10px;
    transition: 0.1s transform var(--easing);

    .logo{
        justify-content: center;
        height: calc(var(--header-height) - (var(--header-height)* 0.5 - 0.8rem));
        font-weight: bold;
        font-size: 1.5rem; 
        margin: 0 10px;
        padding:0 5px;
        margin-top: calc(var(--header-height)* 0.5 - 0.8rem);
        border-bottom: 2px solid #c8c8c8;
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
            <div className="logo">BetaStore</div>
            <Tabs setSidebarOpen={setOpen} />
        </StyledSidebar>
    )
}