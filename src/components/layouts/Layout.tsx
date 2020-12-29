import { Sidebar } from "./sidebar/Sidebar"
import { Header } from "./header/Header"
import styled from "styled-components"
import { useEffect, useLayoutEffect, useState } from "react"
import { useIsMobile } from "hooks"
import { theme } from "styles"


interface StyledContentProps {
    sidebarOpen: boolean;
    scrolled: boolean;
}

const StyledContent = styled.div<StyledContentProps>`
    min-height: 100vh;
    height: 150vh;
    width: 100vw;
    @media (${({ theme }) => theme.bp.big}){
        border-radius: ${p => p.scrolled ? "0" : "50px"} 0 0 0;
        width: calc(100vw - var(--sidebar-width));
        margin-left: var(--sidebar-width);
        filter: none;
    }
    padding-top: 2.5em;
    transform: translateY(var(--header-height));
    background: var(--layout-content-background);
    filter: ${p => p.sidebarOpen ? "blur(4px)" : "none"};
    transition: 0.3s border;
    transition-delay: .1s;
`

interface LayoutProps {
    children: React.ReactNode
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
    const [sidebarOpen, setSidebarOpen] = useState<boolean>(false)
    const [scrolled, setScrolled] = useState<boolean>(false);
    const isMobile = useIsMobile(1200)

    const handleScroll = () => {
        setScrolled(window.pageYOffset >= 80);
    };

    useEffect(() => {
        !sidebarOpen && !isMobile &&
            document.addEventListener("scroll", handleScroll);
        return () => document.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        setSidebarOpen(false)
    }, [isMobile]);

    useLayoutEffect(() => {
        document.body.style.backgroundColor = theme.layoutNavBg
    }, [])

    return (<>
        <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <StyledContent sidebarOpen={sidebarOpen} className="inner-content" scrolled={scrolled}>{children}</StyledContent>
    </>
    )
}