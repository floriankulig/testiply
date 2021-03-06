import { capitalized } from "helpers";
import { useOnClickOutside } from "hooks";
import { darken, lighten } from "polished";
import { useEffect, useRef, useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import { CSSTransition } from "react-transition-group";
import styled from "styled-components";
import {
  StyledFormInput,
  BorderedSVGWrapper,
  StyledTextField,
  StyledMetaInputInfo,
} from "components/forms";

const Dropdown = styled.ul`
  position: absolute;
  width: 100%;
  right: 0;
  top: 66px;
  font-weight: normal;
  font-size: 1rem;
  z-index: 99;
  color: #ffffff;
  border-radius: 0 0 var(--border-radius) var(--border-radius);
  background: var(--primary);
  border: 2px ${(p) => darken(0.1, p.theme.layoutContentBg)} solid;
  border-top: none;

  li {
    width: 100%;
    height: 3em;
    display: inline-flex;
    padding: 0.5em 1em;
    align-items: center;
    cursor: pointer;
    &:hover {
      background: ${({ theme }) => lighten(0.05, theme.primary)};
      border-radius: 0 0 var(--border-radius) var(--border-radius);
    }
    transition: 0.5s background;
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

interface SelectionInputProps {
  label?: string;
  style?: Object;
  className?: string;
  selection: any;
  setSelection: React.Dispatch<React.SetStateAction<any>>;
  optional?: boolean;
  values: Array<string>;
}

export const CtaSelectionInput: React.FC<SelectionInputProps> = ({
  label,
  style,
  className,
  selection,
  optional,
  setSelection,
  values,
}) => {
  const [dropdownOpens, setDropdownOpens] = useState<boolean>(false);
  const dropdownShouldOpen: boolean =
    (dropdownOpens && !!values[1] && !optional) ||
    (dropdownOpens && !!values && optional);

  const ref = useRef<HTMLDivElement>();
  useOnClickOutside(ref, () => setDropdownOpens(false));

  const handleSelectionChange = (newSelection: string) => {
    if (newSelection) {
      setSelection(newSelection);
    } else {
      setSelection(null);
    }

    setDropdownOpens(false);
  };

  useEffect(() => {
    optional && setSelection(null);
  }, []);

  return (
    <StyledFormInput
      style={{ position: "relative", ...style }}
      className={className}
    >
      {label && (
        <StyledMetaInputInfo>
          {label}
          {optional && " (optional)"}
        </StyledMetaInputInfo>
      )}
      <div ref={ref}>
        <StyledTextField contained>
          <span>{selection ? capitalized(selection) : "No Selection"}</span>
          <BorderedSVGWrapper
            clickable
            onClick={() => setDropdownOpens(!dropdownOpens)}
            onKeyDown={() => setDropdownOpens(!dropdownOpens)}
            style={
              dropdownOpens && dropdownShouldOpen
                ? {
                    transform: "rotate(180deg)",
                    background: "transparent",
                  }
                : { background: "transparent" }
            }
          >
            <FaChevronDown />
          </BorderedSVGWrapper>
        </StyledTextField>
        <CSSTransition
          in={dropdownShouldOpen}
          classNames="dropdown"
          timeout={300}
          unmountOnExit
        >
          <Dropdown>
            {values &&
              values
                .filter((value) => value !== selection)
                .map((value) => (
                  <li
                    key={value}
                    onClick={() => handleSelectionChange(value)}
                    onKeyDown={() => handleSelectionChange(value)}
                  >
                    {capitalized(value)}
                  </li>
                ))}
            {optional && selection !== null && (
              <li
                onClick={() => handleSelectionChange(null)}
                onKeyDown={() => handleSelectionChange(null)}
              >
                {capitalized("No Selection")}
              </li>
            )}
          </Dropdown>
        </CSSTransition>
      </div>
    </StyledFormInput>
  );
};
