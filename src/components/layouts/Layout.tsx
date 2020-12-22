import { Sidebar } from "./Sidebar"
import { Header } from "./Header"
import styled from "styled-components"

const StyledContent = styled.div`
    width: calc(100vw - var(--sidebar-width));
    margin-left: var(--sidebar-width); 
    min-height: 100vh;
    padding-top: var(--header-height);
    background-color: red;
`


interface LayoutProps {
    children: React.ReactNode
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <>
            <Sidebar />
            <Header />
            <StyledContent className="inner-content">{children}</StyledContent>
        </>
    )
}