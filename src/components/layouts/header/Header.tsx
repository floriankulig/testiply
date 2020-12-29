import { useIsMobile } from "hooks"
import { rgba } from "polished";
import { useEffect, useState } from "react";
import styled from "styled-components"
import { Searchbar } from "./Searchbar";

interface StyledHeaderProps {
    sidebarOpen: boolean;
    scrolled: boolean;
}

const StyledHeader = styled.header<StyledHeaderProps>`
    background-color: var(--layout-nav-background);
    width: 100vw;
    position: fixed;
    z-index: 1000;
    display: flex;
    align-items: center;
    @media (${({ theme }) => theme.bp.big}){
        width: calc(100vw - var(--sidebar-width));
        margin-left: var(--sidebar-width);
        filter: none;
    }
    filter: ${p => p.sidebarOpen ? "blur(4px)" : "none"};
    height: var(--header-height);
    box-shadow: ${p => p.scrolled ? `0 10px 20px -10px ${rgba(2, 12, 27, 0.25)}` : "none"};
    transition: 0.4s box-shadow var(--easing);
`

interface HeaderProps {
    sidebarOpen: boolean;
    setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Header: React.FC<HeaderProps> = ({ sidebarOpen, setSidebarOpen }) => {
    const [scrolled, setScrolled] = useState<boolean>(false);
    const isMobile = useIsMobile(1200)

    const handleSidebarToggle = () => {
        if (!isMobile) {    // can be removed when rendering menu toggle button depending on screenwidth
            setSidebarOpen(true)
        } else {
            setSidebarOpen(!sidebarOpen)
        }
    }

    const handleScroll = () => {
        setScrolled(window.pageYOffset >= 80);
    };

    useEffect(() => {
        if (sidebarOpen && isMobile) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = null;
            document.addEventListener("scroll", handleScroll);
        }
        return () => document.removeEventListener("scroll", handleScroll);
    }, [sidebarOpen]);

    return (
        <StyledHeader onClick={() => handleSidebarToggle()} className="inner-content" sidebarOpen={sidebarOpen} scrolled={scrolled}>
            <Searchbar />
        </StyledHeader>
    )
}