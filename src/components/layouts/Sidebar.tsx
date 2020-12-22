import { useOnClickOutside } from "hooks"
import { useRef } from "react";
import styled from "styled-components"

interface StyledSidebarProps {
    open: boolean;
}

const StyledSidebar = styled.div<StyledSidebarProps>`
    background-color: green;
    color: white;
    width: var(--sidebar-width);
    transform: ${p => p.open ? "translateX(0)" : "translateX(-100%)"};
    @media (${({ theme }) => theme.bp.big}){
        transform: translateX(0);
    }
    height: 100vh;
    position: fixed;
    z-index: 99999;
    transition: 0.1s transform var(--easing);
`

interface SidebarProps {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Sidebar: React.FC<SidebarProps> = ({ open, setOpen }) => {
    const ref = useRef<HTMLDivElement>();
    useOnClickOutside(ref, () => setOpen(false))

    return (
        <StyledSidebar ref={ref} open={open}>Sidebar</StyledSidebar>
    )
}