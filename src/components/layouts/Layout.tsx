import { Sidebar } from "./sidebar/Sidebar"
import { Header } from "./Header"
import styled from "styled-components"
import { useEffect, useState } from "react"
import { useIsMobile } from "hooks"
import { SelectedTabProvider } from "context"


interface StyledContentProps {
    sidebarOpen: boolean;
}

const StyledContent = styled.div<StyledContentProps>`
    min-height: 100vh;
    height: 150vh;
    width: 100vw;
    @media (${({ theme }) => theme.bp.big}){
        width: calc(100vw - var(--sidebar-width));
        margin-left: var(--sidebar-width);
        filter: none;
    }
    padding-top: calc(var(--header-height) + 2.5em);
    background: #f7f9ff;
    filter: ${p => p.sidebarOpen ? "blur(4px)" : "none"};
`

interface LayoutProps {
    children: React.ReactNode
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
    const [sidebarOpen, setSidebarOpen] = useState<boolean>(false)
    const isMobile = useIsMobile(1200)

    useEffect(() => {
        setSidebarOpen(false)
    }, [isMobile]);

    return (
        <SelectedTabProvider>
            <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
            <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
            <StyledContent sidebarOpen={sidebarOpen} className="inner-content">{children}</StyledContent>
        </SelectedTabProvider>
    )
}