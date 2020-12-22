import styled from "styled-components"

const StyledHeader = styled.div`
    background-color: blue;
    color: white;
    width: calc(100vw - var(--sidebar-width));
    margin-left: var(--sidebar-width); 
    height: var(--header-height);
    position: fixed;
`

export const Header: React.FC = () => {
    return (
        <StyledHeader className="inner-content">Header</StyledHeader>
    )
}