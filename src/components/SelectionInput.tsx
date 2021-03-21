import { useOnClickOutside } from "hooks";
import { darken } from "polished";
import { useEffect, useRef, useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import styled from "styled-components";
import {
  StyledFormInput,
  SVGWrapper,
  StyledTextField,
  StyledMetaInputInfo,
} from "components/forms";
import { AnimatePresence, motion } from "framer-motion";

const Dropdown = styled.ul`
  position: absolute;
  width: 100%;
  right: 0;
  top: 66px;
  font-weight: normal;
  font-size: 1rem;
  z-index: 99;
  border-radius: 0 0 var(--border-radius) var(--border-radius);
  background: var(--layout-content-background);
  border: 2px ${(p) => darken(0.1, p.theme.layoutContentBg)} solid;
  border-top: none;

  li {
    width: 100%;
    height: 3em;
    display: inline-flex;
    padding: 0.5em 1em;
    align-items: center;
    cursor: pointer;
    background: transparent;
    &:hover {
      background: ${({ theme }) => darken(0.05, theme.layoutContentBg)};
    }
    transition: 0.5s background;
  }
`;

interface Value {
  id: string;
  displayName: string;
}

interface SelectionInputProps {
  label?: string;
  style?: Object;
  className?: string;
  selection: Value;
  setSelection: React.Dispatch<React.SetStateAction<Value>>;
  optional?: boolean;
  values: Array<Value>;
}

export const SelectionInput: React.FC<SelectionInputProps> = ({
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

  const handleSelectionChange = (newSelection: Value) => {
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
        <StyledTextField>
          <span>{selection ? selection.displayName : "No Selection"}</span>
          <SVGWrapper
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
          </SVGWrapper>
        </StyledTextField>
        <AnimatePresence>
          {dropdownShouldOpen && (
            <Dropdown
              as={motion.ul}
              initial={{ scaleY: 0, y: "-45%", opacity: 0 }}
              animate={{ scaleY: 1, y: 0, opacity: 1 }}
              exit={{ scaleY: 0, y: "-45%", opacity: 0 }}
            >
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
              {optional && selection !== null && (
                <li
                  onClick={() => handleSelectionChange(null)}
                  onKeyDown={() => handleSelectionChange(null)}
                >
                  No Selection
                </li>
              )}
            </Dropdown>
          )}
        </AnimatePresence>
      </div>
    </StyledFormInput>
  );
};
