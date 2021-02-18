import { capitalized } from "helpers";
import { useOnClickOutside } from "hooks";
import { darken, rgba } from "polished";
import { useRef, useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import { CSSTransition } from "react-transition-group";
import styled from "styled-components";

interface DropdownOpenProps {
  open: boolean;
}

export const StyledClickableDropdown = styled.div<DropdownOpenProps>`
  background-color: ${(p) =>
    p.open ? darken(0.05, p.theme.primary) : "var(--primary)"};
  color: #ffffff;
  border-radius: var(--border-radius)
    ${(p) => p.open && "var(--border-radius) 0px 0px"};
  margin-top: auto;
  height: 50px;
  width: max-content;
  display: flex;
  align-items: center;
  box-shadow: 2px 5px 6px ${({ theme }) => rgba(theme.primary, 0.15)};
  transition: 0.3s var(--easing);
  transition-property: background, border-radius;

  &:hover {
    background-color: ${({ theme }) => darken(0.05, theme.primary)};
  }
`;

const ClickableSelection = styled.div`
  margin: 0 0.75em;
  padding: 0.75em;
  cursor: pointer;
  font-weight: bold;
  width: 80%;
  user-select: none;
`;

const DropdownOpenerWrapper = styled.div<DropdownOpenProps>`
  width: 20%;
  min-width: 55px;
  height: 70%;
  display: grid;
  padding: 0 auto;
  place-items: center;
  cursor: pointer;
  border-left: 1px solid white;
  svg {
    width: 25px;
    margin-left: -2px;
    height: auto;
    transition: transform 0.25s var(--easing);
    transform: rotate(${(p) => (p.open ? "180deg" : "0deg")});
  }
`;

const Dropdown = styled.ul`
  position: absolute;
  width: 100%;
  right: 0;
  top: 50px;
  font-weight: normal;
  font-size: 1rem;
  z-index: 9999;
  border-radius: 0 0 var(--border-radius) var(--border-radius);
  background: var(--primary);
  border-top: none;

  li {
    width: 100%;
    height: 3em;
    display: flex;
    padding: 0 1.5em;
    font-size: 1rem;
    align-items: center;
    cursor: pointer;
    background: transparent;
    &:hover {
      background-color: ${({ theme }) => darken(0.025, theme.primary)};
    }
    transition: 0.5s background;
    &:last-of-type {
      border-radius: 0 0 var(--border-radius) var(--border-radius);
    }
  }

  &.dropdown-enter {
    opacity: 0;
    transform: translateY(-50%) scaleY(0.1);
  }
  &.dropdown-enter-active {
    opacity: 1;
    transform: translateY(0) scaleY(1);
    transition: 0.25s all var(--easing);
  }
  &.dropdown-exit {
    opacity: 1;
    transform: translateY(0) scaleY(1);
  }
  &.dropdown-exit-active {
    opacity: 0;
    transform: translateY(-50%) scaleY(0.1);
    transition: 0.25s all var(--easing);
  }
`;

interface Value {
  id: string;
  displayName: string;
}

interface ClickableDropdownProps {
  label?: string;
  style?: React.CSSProperties;
  className?: string;
  selection: Value;
  setSelection: React.Dispatch<React.SetStateAction<Value>>;
  values: Array<Value>;
  ctaClickHandler: () => void;
}

export const ClickableDropdown: React.FC<ClickableDropdownProps> = ({
  label,
  style,
  className,
  selection,
  setSelection,
  values,
  ctaClickHandler,
}) => {
  const [dropdownOpens, setDropdownOpens] = useState<boolean>(false);
  const dropdownShouldOpen: boolean =
    (dropdownOpens && !!values[1]) || (dropdownOpens && !!values);
  const hasMultipleApps = values.length > 1;

  const ref = useRef<HTMLDivElement>();
  useOnClickOutside(ref, () => setDropdownOpens(false));

  const handleSelectionChange = (newSelection: Value) => {
    if (newSelection) {
      setSelection(newSelection);
    } else {
      setSelection(null);
    }

    setDropdownOpens(false);
  };

  return (
    <StyledClickableDropdown
      style={{ position: "relative", ...style }}
      className={className}
      ref={ref}
      open={dropdownShouldOpen}
    >
      <ClickableSelection
        onClick={() => ctaClickHandler()}
        onKeyDown={() => ctaClickHandler()}
        role="button"
        aria-label={`${label} ${selection.displayName}`}
        tabIndex={0}
        style={{ width: !hasMultipleApps && "100%" }}
      >
        {label}
        {selection.displayName}
      </ClickableSelection>
      {hasMultipleApps && (
        <DropdownOpenerWrapper
          onClick={() => setDropdownOpens(!dropdownOpens)}
          onKeyDown={() => setDropdownOpens(!dropdownOpens)}
          open={dropdownShouldOpen}
        >
          <FaChevronDown />
        </DropdownOpenerWrapper>
      )}
      <CSSTransition
        in={dropdownShouldOpen}
        classNames="dropdown"
        timeout={300}
        unmountOnExit
      >
        <Dropdown>
          {values &&
            values
              .filter((value) => value.id !== selection.id)
              .map((value) => (
                <li
                  key={value.id}
                  onClick={() => handleSelectionChange(value)}
                  onKeyDown={() => handleSelectionChange(value)}
                >
                  {value.displayName}
                </li>
              ))}
        </Dropdown>
      </CSSTransition>
    </StyledClickableDropdown>
  );
};
