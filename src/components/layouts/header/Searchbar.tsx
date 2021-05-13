import styled from "styled-components";
import { IoSearch } from "react-icons/io5";
import { MdClear } from "react-icons/md";
import { rgba } from "polished";
import { Button } from "components/Button";
import { useFiltersValue, useSelectedTabValue } from "context";
import { CSSTransition } from "react-transition-group";
import { useIsMobile, useOnClickOutside } from "hooks";
import { SVGWrapper } from "components/forms";
import { useRef, useState } from "react";
import { capitalized } from "helpers";
import { AnimatePresence } from "framer-motion";

interface SearchbarProps {
  hasInput: boolean;
  open: boolean;
}

const StyledSearchbar = styled.form<SearchbarProps>`
  height: 50px;
  width: ${(p) => p.open && "clamp(300px, 40%, 420px)"};
  padding: 5px ${(p) => (p.open ? "20px" : "12px")};
  position: ${(p) => (p.open ? "absolute" : "relative")};
  margin-left: ${(p) => p.open && "calc(30px + 1.5em)"};
  z-index: 99;
  @media (${({ theme }) => theme.bp.small}) {
    width: clamp(300px, 40%, 420px);
    padding: 5px 20px;
    position: relative;
    margin-left: 0;
  }
  max-width: 100%;
  margin-right: 0.5em;
  background: var(--layout-nav-background);
  border: 2px solid var(--layout-content-background);
  border-radius: 20px;
  display: flex;
  align-items: center;
  transition: 0.5s;
  transition-property: width, box-shadow;
  box-shadow: ${(p) =>
    p.hasInput ? `0px 2px 10px ${rgba(0, 0, 0, 0.05)}` : "none"};

  &:focus-within,
  &:hover {
    box-shadow: 0px 2px 10px ${rgba(0, 0, 0, 0.05)};
  }

  &:focus-within {
    @media (${({ theme }) => theme.bp.big}) {
      width: calc(clamp(300px, 40%, 420px) + 20px);
    }
  }

  ${SVGWrapper} {
    margin-right: 15px;
    padding: 0;
    width: 30px;
    height: 30px;
  }

  .search-cancel {
    display: inline-flex;
    cursor: pointer;
    margin-left: 5px;
    &:hover {
      transform: scale(1.25);
    }
    transition: transform 0.1s var(--easing);
    svg {
      align-self: center;
      transform: translateX(5px);
      margin: 0;
      width: 20px;
      height: 20px;
      color: #797979;
    }
  }
`;

const SearchbarInput = styled.input`
  width: 100%;
  height: 100%;
  font-family: "Roboto";
  font-weight: bold;
  border: none;
  background-color: transparent;

  &:focus-within {
    outline: none;
  }

  &::placeholder {
    color: #535353;
  }
`;

export const Searchbar: React.FC = () => {
  const { selectedTab } = useSelectedTabValue();
  const { searchQuery, setSearchQuery } = useFiltersValue();
  const isMobile = useIsMobile(720);
  const [open, setOpen] = useState<boolean>(false);
  const inputVisible = open || !isMobile;
  const ref = useRef<HTMLFormElement>(null);
  useOnClickOutside(ref, () => setOpen(false));

  const handleSubmit = (
    e:
      | React.MouseEvent<HTMLDivElement | HTMLButtonElement, MouseEvent>
      | React.KeyboardEvent<HTMLDivElement | HTMLButtonElement>
      | React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
  };

  const handleType = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchQuery(event.target.value);
  };

  return (
    <>
      <StyledSearchbar
        hasInput={!!searchQuery}
        onSubmit={(e) => handleSubmit(e)}
        open={open}
        ref={ref}
      >
        <SVGWrapper
          clickable
          style={{ marginRight: !inputVisible && 0 }}
          onClick={(e) => (inputVisible ? handleSubmit(e) : setOpen(!open))}
          onKeyDown={(e) => (inputVisible ? handleSubmit(e) : setOpen(!open))}
        >
          <IoSearch />
        </SVGWrapper>
        <AnimatePresence>
          {inputVisible && (
            <SearchbarInput
              placeholder={`Type to search in ${capitalized(selectedTab)}`}
              type="text"
              value={searchQuery}
              onChange={(e) => handleType(e)}
            />
          )}
        </AnimatePresence>
        {!!searchQuery && inputVisible && (
          <div
            className="search-cancel"
            onClick={() => setSearchQuery("")}
            onKeyDown={() => setSearchQuery("")}
            role="button"
            tabIndex={0}
            aria-label="Clear Search"
          >
            <MdClear />
          </div>
        )}
      </StyledSearchbar>
      {/* <CSSTransition
        in={!!searchQuery && !isMobile}
        timeout={300}
        classNames="button"
        unmountOnExit
      >
        <Button
          bold
          onClick={(e) => handleSubmit(e)}
          onKeyDown={(e) => handleSubmit(e)}
        >
          Search all categories
        </Button>
      </CSSTransition> */}
    </>
  );
};
