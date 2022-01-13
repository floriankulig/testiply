import { useAuthValue } from "context";
import { motion } from "framer-motion";
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
      margin-right: ${(p) => (p.hasLogoBackground ? "0px" : "10px")};
      display: flex;
      align-items: center;
      z-index: 9;
      border-radius: var(--border-radius);
      transform: translateY(${(p) => (p.hasLogoBackground ? "-4px" : "0")});
      img {
        border-radius: var(--border-radius);
      }
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
  const { currentUser, logout } = useAuthValue();

  return (
    <Header
      className={className}
      style={style}
      hasLogoBackground={hasLogoBackground}
      as={motion.div}
      initial={{ y: "-100%" }}
      animate={{ y: 0 }}
      exit={{ y: "-100%" }}
    >
      <Link href="/">
        <div className="logo">
          <div className="svg-wrapper">
            <Image
              width={35}
              height={35}
              src={`/images/logo${hasLogoBackground ? "-no-bg" : ""}.svg`}
              priority
              alt="Abstract Letter T"
            />
          </div>
          {!isMobile && <span>Testiply</span>}
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
        {!!currentUser && (
          <li
            role="button"
            tabIndex={0}
            aria-label="Log out"
            onClick={() => logout()}
            onKeyDown={() => logout()}
          >
            <a>Log Out</a>
          </li>
        )}
        {!router.pathname.endsWith("/login") && !currentUser && (
          <Link href="/login">
            <li>
              <a>Log In</a>
            </li>
          </Link>
        )}
        {!router.pathname.endsWith("/register") && !currentUser && (
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
