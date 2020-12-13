import styled from "styled-components"

const Header = styled.header`
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 80px;
    color: white;

    .logo {
        font-size:1.8rem;
        font-weight: bold;
    }

    .nav-links {
        @media (min-width(1080px)) {
        width: 10em;
        }
        width: 8em;
        display: flex;
        justify-content: space-between;
        align-items: center;
  }
`


export const LandingPageHeader: React.FC = () => {
    return (
        <Header className="container">
            <div className="logo">BetaStore</div>
            <ul className="nav-links">
                <li>Log In</li>
                <li>Sign Up</li>
            </ul>
        </Header>
    )
}
