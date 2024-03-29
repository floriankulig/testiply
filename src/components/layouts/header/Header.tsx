import { useAuthValue } from "context";
import { useIsMobile } from "hooks";
import { rgba } from "polished";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { Burger } from "./Burger";
import { Searchbar } from "./Searchbar";
import { UserMenu } from "./UserMenu";

interface StyledHeaderProps {
  sidebarOpen: boolean;
  scrolled: boolean;
}

const StyledHeader = styled.header<StyledHeaderProps>`
  background-color: var(--layout-nav-background);
  width: 100vw;
  position: fixed;
  z-index: 1000;
  display: flex;
  align-items: center;
  @media (${({ theme }) => theme.bp.big}) {
    width: calc(100vw - var(--sidebar-width));
    margin-left: var(--sidebar-width);
    filter: none;
  }
  filter: ${(p) => (p.sidebarOpen ? "blur(4px)" : "none")};
  height: var(--header-height);
  box-shadow: ${(p) =>
    p.scrolled ? `0px 25px 60px ${rgba(100, 100, 100, 0.05)}` : "none"};
  transition: var(--sidebarDuration) all var(--easing);
`;

const StyledMenus = styled.div`
  margin-left: auto;
  display: flex;
  align-items: center;

  & > * {
    margin-left: 1.5em;
  }

  .menu-icon-wrapper {
    border-radius: 50%;
    width: 40px;
    height: 40px;
    border: 2px solid ${(p) => rgba(p.theme.navy, 0.4)};
    display: grid;
    place-items: center;
    position: relative;
    cursor: pointer;
    transition: border 0.3s;

    &:hover {
      border-color: var(--primary);
      svg {
        color: var(--primary);
      }
    }
    svg {
      width: 70%;
      height: 70%;
      transition: color 0.2s;
    }
  }
`;

const StyledDisplayName = styled.h3`
  font-size: 1.15rem;
  font-weight: normal;
  text-align: right;
  color: var(--navy);
  cursor: pointer;
`;

interface HeaderProps {
  sidebarOpen: boolean;
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Header: React.FC<HeaderProps> = ({
  sidebarOpen,
  setSidebarOpen,
}) => {
  const [scrolled, setScrolled] = useState<boolean>(false);
  const isMobile = useIsMobile(1200);
  const { currentUser } = useAuthValue();
  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  const handleScroll = () => {
    setScrolled(window.pageYOffset >= 80);
  };

  useEffect(() => {
    if (sidebarOpen && isMobile) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = null;
      document.addEventListener("scroll", handleScroll);
    }
    return () => document.removeEventListener("scroll", handleScroll);
  }, [sidebarOpen]);

  return (
    <StyledHeader
      className="inner-content"
      sidebarOpen={sidebarOpen}
      scrolled={scrolled}
    >
      {isMobile && <Burger setSidebarOpen={setSidebarOpen} />}
      <Searchbar />
      <StyledMenus
        onClick={() => setMenuOpen(true)}
        onKeyDown={() => setMenuOpen(true)}
        tabIndex={0}
        role="button"
        aria-label="Open user menu"
      >
        <StyledDisplayName>{currentUser?.name || ""}</StyledDisplayName>
        <UserMenu menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      </StyledMenus>
    </StyledHeader>
  );
};
