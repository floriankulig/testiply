import styled from "styled-components"

const StyledSidebar = styled.div`
    background-color: green;
    color: white;
    width: var(--sidebar-width);
    height: 100vh;
    position: fixed;
`

export const Sidebar: React.FC = () => {
    return (
        <StyledSidebar>Sidebar</StyledSidebar>
    )
}