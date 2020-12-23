import { useIsMobile } from "hooks"
import styled from "styled-components"

interface StyledHeaderProps {
    sidebarOpen: boolean;
}

const StyledHeader = styled.div<StyledHeaderProps>`
    background-color: #f7f9ff;
    width: 100vw;
    position: fixed;
    z-index: 1000;
    @media (${({ theme }) => theme.bp.big}){
        width: calc(100vw - var(--sidebar-width));
        margin-left: var(--sidebar-width);
    }
    filter: ${p => p.sidebarOpen ? "blur(4px)" : "none"};
    height: var(--header-height);
`

interface HeaderProps {
    sidebarOpen: boolean;
    setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Header: React.FC<HeaderProps> = ({ sidebarOpen, setSidebarOpen }) => {
    const isMobile = useIsMobile(1200)

    const handleSidebarToggle = () => {
        if (!isMobile) {
            setSidebarOpen(true)
        } else {
            setSidebarOpen(!sidebarOpen)
        }
    }

    return (
        <StyledHeader onClick={() => handleSidebarToggle()} className="inner-content" sidebarOpen={sidebarOpen}>Header</StyledHeader>
    )
}