import { useIsMobile } from "hooks"
import styled from "styled-components"

interface StyledHeaderProps {
    sidebarOpen: boolean;
}

const StyledHeader = styled.div<StyledHeaderProps>`
    background-color: blue;
    color: white;
    width: ${p => p.sidebarOpen ? "calc(100vw - var(--sidebar-width))" : "100vw"};
    margin-left: ${p => p.sidebarOpen ? "var(--sidebar-width)" : "0"};
    height: var(--header-height);
    position: fixed;
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