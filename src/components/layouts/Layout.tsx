import { Sidebar } from "./Sidebar"
import { Header } from "./Header"
import styled from "styled-components"
import { useEffect, useState } from "react"
import { useIsMobile } from "hooks"


interface StyledContentProps {
    sidebarOpen: boolean;
}

const StyledContent = styled.div<StyledContentProps>`
    min-height: 100vh;
    width: ${p => p.sidebarOpen ? "calc(100vw - var(--sidebar-width))" : "100vw"};
    margin-left: ${p => p.sidebarOpen ? "var(--sidebar-width)" : "0"};
    padding-top: var(--header-height);
    background-color: red;
`

interface LayoutProps {
    children: React.ReactNode
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
    const [sidebarOpen, setSidebarOpen] = useState<boolean>(true)
    const isMobile = useIsMobile(1200)

    useEffect(() => {
        if (!isMobile) setSidebarOpen(true)
        else setSidebarOpen(false)
    }, [isMobile]);

    return (
        <>
            <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
            <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
            <StyledContent sidebarOpen={sidebarOpen} className="inner-content">{children}</StyledContent>
        </>
    )
}