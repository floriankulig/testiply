import { getTextColor } from "helpers"
import Link from "next/link"
import { rgba } from "polished"
import styled from "styled-components"

const Header = styled.header`
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: var(--header-height);
    color: ${p => getTextColor(p.theme.primary)};

    .logo {
        font-size:1.8rem;
        font-weight: bold;
        user-select: none;
    }

    .nav-links {
        @media (${({ theme }) => theme.bp.medium}) {
            width: 12em;
        }
        display: flex;
        justify-content: space-between;
        align-items: center;

        li{
            padding: .7em 1em;
            border-radius: var(--border-radius);
            transition: background 0.5s;
            &:hover{
                cursor: pointer;
                background: ${rgba(0, 0, 0, 0.35)}
            }
        }
    }
`


export const InfoPageHeader: React.FC = () => {
    return (
        <Header className="container">
            <div className="logo">BetaStore</div>
            <ul className="nav-links">
                <Link href="/login">
                    <li>Log In</li>
                </Link>
                <Link href="/register">
                    <li>Register</li>
                </Link>
            </ul>
        </Header>
    )
}
