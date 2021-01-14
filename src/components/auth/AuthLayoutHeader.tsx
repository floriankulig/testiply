import { getTextColor } from "helpers";
import { useIsMobile } from "hooks";
import Link from "next/link";
import { rgba } from "polished";
import styled from "styled-components";
import { FormType } from "ts";

interface StyledAuthLayoutHeaderProps {
    reversed: boolean
}

const StyledAuthLayoutHeader = styled.header<StyledAuthLayoutHeaderProps>`
    background-color: transparent;
    width: 100%;
    padding: 2em 5% 0;
    display: flex;
    justify-content: space-between;
    height: var(--header-height);
    color: ${p => getTextColor(p.theme.layoutContentBg)};
    z-index: 99;
    @media (${({ theme }) => theme.bp.big}) {
        position: absolute;
        right: ${p => p.reversed && "0"};
        text-align: center;
        width: var(--auth-sidebar-width);
        color: ${p => getTextColor(p.theme.primary)};

        & .logo:hover{
            color: #ffffff
        }
    }


    .logo {
        font-size:1.8rem;
        font-weight: bold;
        user-select: none;
        cursor: pointer;
        transform: translateY(14px);
        transition: all 0.3s;
        &:hover{
            transform: translateY(12px);
            color: var(--primary)
        }
        @media (${({ theme }) => theme.bp.big}) {
            &:hover{
                color: var(--layout-content-background)
            }
        }
    }

    .nav-links {
        display: flex;
        justify-content: space-between;
        align-items: center;
        order: ${p => p.reversed && "-1"};
        @media (${({ theme }) => theme.bp.small}) {
            width: 12em;
        }
        @media (${({ theme }) => theme.bp.big}) {
            width: min-content;
            justify-content: flex-end;
        }

        li{
            padding: .7em 1em;
            border-radius: var(--border-radius);
            transition: background 0.5s;
            &:hover{
                cursor: pointer;
                background: ${p => rgba(p.theme.navy, 0.1)}
            }
        }
    }
`;


interface AuthLayoutHeaderProps {
    formType: FormType
    style?: Object;
    className?: string;
}

export const AuthLayoutHeader: React.FC<AuthLayoutHeaderProps> = ({ style, className, formType }) => {
    const shouldShowHeaderFormToggle = useIsMobile(1200);

    return (
        <StyledAuthLayoutHeader className={className} reversed={formType === "login"} style={style}>
            <Link href="/">
                <div className="logo">BetaStore</div>
            </Link>
            <ul className="nav-links">
                <Link href="/store">
                    <li>Store</li>
                </Link>
                {shouldShowHeaderFormToggle ?
                    formType === "register" ? (
                        <Link href="/login">
                            <li>Login</li>
                        </Link>
                    ) : (
                            <Link href="/register">
                                <li>Register</li>
                            </Link>
                        )
                    : null}
            </ul>
        </StyledAuthLayoutHeader>
    )
}