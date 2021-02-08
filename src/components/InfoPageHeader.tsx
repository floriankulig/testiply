import { getTextColor } from "helpers";
import { useIsMobile } from "hooks";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { rgba } from "polished";
import { CSSTransition } from "react-transition-group";
import styled, { css } from "styled-components";

interface HeaderProps {
  hasLogoBackground: boolean;
}
const Header = styled.header<HeaderProps>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: var(--header-height);
  color: ${(p) => getTextColor(p.theme.primary)};
  .logo {
    font-size: 1.8rem;
    font-weight: bold;
    user-select: none;
    cursor: pointer;
    display: flex;
    align-items: center;

    .svg-wrapper {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 35px;
      height: 35px;
      ${(p) =>
        p.hasLogoBackground &&
        css`
          margin-right: 5px;
          background: white;
        `};
      padding: 0 0 1px 1px;
      border-radius: var(--border-radius);
      z-index: 9;
    }
  }
  .nav-links {
    display: flex;
    justify-content: space-between;
    align-items: center;
    li {
      @media (${({ theme }) => theme.bp.medium}) {
        margin-left: 1.5em;
      }
      :first-of-type {
        margin: 0;
      }
      a {
        padding: 0.7em 1em;
        border-radius: var(--border-radius);
        transition: background 0.5s;
        font-size: clamp(0.8rem, 4vw, 1rem);
        &:hover {
          cursor: pointer;
          background: ${({ theme }) => rgba(theme.navy, 0.1)};
        }
      }
    }
  }
`;

interface InfoPageHeaderProps {
  style?: Object;
  className?: string;
  hasLogoBackground?: boolean;
}

export const InfoPageHeader: React.FC<InfoPageHeaderProps> = ({
  style,
  className,
  hasLogoBackground = false,
}) => {
  const router = useRouter();
  const isMobile = useIsMobile();

  return (
    <Header
      className={className}
      style={style}
      hasLogoBackground={hasLogoBackground}
    >
      <Link href="/">
        <div className="logo">
          <div className="svg-wrapper">
            <Image width={30} height={35} src="/images/logo.svg" priority />
          </div>
          <CSSTransition
            in={!isMobile}
            timeout={300}
            classNames="fade-right"
            unmountOnExit
          >
            <span>eta App Store</span>
          </CSSTransition>
        </div>
      </Link>
      <ul className="nav-links">
        {!router.pathname.endsWith("/") && (
          <Link href="/store">
            <li>
              <a>Store</a>
            </li>
          </Link>
        )}
        {!router.pathname.endsWith("/login") && (
          <Link href="/login">
            <li>
              <a>Log In</a>
            </li>
          </Link>
        )}
        {!router.pathname.endsWith("/register") && (
          <Link href="/register">
            <li>
              <a>Register</a>
            </li>
          </Link>
        )}
      </ul>
    </Header>
  );
};
