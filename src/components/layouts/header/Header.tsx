import { useIsMobile } from "hooks"
import { lighten, rgba } from "polished";
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
    box-shadow: ${p => p.scrolled ? `0px 25px 60px ${rgba(100, 100, 100, 0.05)}` : "none"};
    transition: var(--sidebarDuration) all var(--easing);

    .burger{
        min-width: 25px;
        height: 25px;
        cursor: pointer;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        margin-right:var(--mobile-inner-padding);
        @media (${({ theme }) => theme.bp.medium}) {
            margin-right:var(--inner-padding);
        }
        opacity: .75;
        z-index: 10000;

        &:hover {
            opacity: 1;
            transition: 0.25s all var(--easing);

            .burger-line{
                transition: 0.25s all var(--easing);
                background-color: var(--primary);
            }
        }

        &-line{
            background-color: var(--navy);
            width: 100%;
            height: 4px;
            border-radius: 2px;
        }
    }
`

interface HeaderProps {
    sidebarOpen: boolean;
    setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Header: React.FC<HeaderProps> = ({ sidebarOpen, setSidebarOpen }) => {
    const [scrolled, setScrolled] = useState<boolean>(false);
    const isMobile = useIsMobile(1200)

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
        <StyledHeader className="inner-content" sidebarOpen={sidebarOpen} scrolled={scrolled}>
            {isMobile &&
                <div
                    className="burger"
                    onClick={() => setSidebarOpen(true)}
                    onKeyDown={() => setSidebarOpen(true)}
                    role="button"
                    tabIndex={0}
                >
                    <div className="burger-line"></div>
                    <div className="burger-line"></div>
                    <div className="burger-line"></div>
                </div>}
            <Searchbar />
        </StyledHeader>
    )
}