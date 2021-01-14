import { getTextColor } from "helpers"
import Link from "next/link"
import { useRouter } from "next/router"
import { rgba } from "polished"
import styled from "styled-components"

const Header = styled.header`
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: var(--header-height);
    color: ${p => getTextColor(p.theme.primary)};

    .logo {
        font-size:clamp(1.3rem, 5vw ,1.8rem);
        font-weight: bold;
        user-select: none;
        cursor: pointer;
    }

    .nav-links {
        display: flex;
        justify-content: space-between;
        align-items: center;

        li {
            @media (${({ theme }) => theme.bp.medium}) {
                margin-left: 1.5em;
            }
            a{
                padding: .7em 1em;
                border-radius: var(--border-radius);
                transition: background 0.5s;
                font-size:clamp(.8rem, 4vw ,1rem);
                &:hover{
                    cursor: pointer;
                    background: ${({ theme }) => rgba(theme.navy, 0.1)}
                }
            }
        }
    }
`

interface InfoPageHeaderProps {
    style?: Object,
    className?: string;
}

export const InfoPageHeader: React.FC<InfoPageHeaderProps> = ({ style, className }) => {
    const router = useRouter()

    console.log(router.pathname.split("/")[0])
    console.log(router.pathname)

    return (
        <Header className={className} style={style}>
            {!router.pathname.endsWith("/") ? (
                <Link href="/">
                    <div className="logo">BetaStore</div>
                </Link>
            ) : (
                    <div className="logo">BetaStore</div>
                )}
            <ul className="nav-links">
                {!router.pathname.endsWith("/") && <Link href="/store">
                    <li>
                        <a>Store</a>
                    </li>
                </Link>}
                {!router.pathname.endsWith("/login") && <Link href="/login">
                    <li>
                        <a>Log In</a>
                    </li>
                </Link>}
                {!router.pathname.endsWith("/register") && <Link href="/register">
                    <li>
                        <a>Register</a>
                    </li>
                </Link>}
                {router.pathname.includes("/dev") && <Link href="/register">
                    <li>
                        <a>Register</a>
                    </li>
                </Link>}
            </ul>
        </Header>
    )
}
