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
`

interface SidebarProps {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Sidebar: React.FC<SidebarProps> = ({ open, setOpen }) => {
    return (
        <StyledSidebar open={open}>Sidebar</StyledSidebar>
    )
}