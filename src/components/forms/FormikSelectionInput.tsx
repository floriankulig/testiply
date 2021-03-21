import { CSSTransition } from "react-transition-group";
import {
  StyledFormInput,
  StyledMetaInputInfo,
  SVGWrapper,
  StyledTextField,
} from ".";
import { useField } from "formik";
import { useOnClickOutside } from "hooks";
import { useRef, useState } from "react";
import { capitalized } from "helpers";
import { FaChevronDown } from "react-icons/fa";
import styled from "styled-components";
import { darken } from "polished";
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

export const FormikSelectionInput = ({
  label,
  optional = false,
  values,
  style,
  className,
  ...restProps
}: any) => {
  const [field, meta, helpers] = useField(restProps);
  const showsError: boolean = meta.touched && meta.error ? true : false;

  const [dropdownOpens, setDropdownOpens] = useState<boolean>(false);
  const dropdownShouldOpen =
    (dropdownOpens && !!values[1] && !optional) ||
    (dropdownOpens && !!values && optional);
  const ref = useRef<HTMLDivElement>();
  useOnClickOutside(ref, () => setDropdownOpens(false));

  const handleSelectionChange = (newSelection: string | null) => {
    if (newSelection) {
      helpers.setValue(newSelection);
    } else {
      helpers.setValue(newSelection);
    }

    setDropdownOpens(false);
  };

  return (
    <StyledFormInput
      style={{ position: "relative", ...style }}
      className={className}
    >
      <StyledMetaInputInfo>
        {label}
        {optional && " (optional)"}
        <CSSTransition
          in={showsError}
          classNames="error"
          timeout={250}
          unmountOnExit
        >
          <span>{meta.error}</span>
        </CSSTransition>
      </StyledMetaInputInfo>
      <div ref={ref}>
        <StyledTextField hasError={showsError}>
          <span>{field.value ? capitalized(field.value) : "No Selection"}</span>
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
                  .filter((value: string) => value !== field.value)
                  .map((value: string) => (
                    <li
                      key={value}
                      onClick={() => handleSelectionChange(value)}
                      onKeyDown={() => handleSelectionChange(value)}
                    >
                      {capitalized(value)}
                    </li>
                  ))}
              {optional && field.value && (
                <li
                  onClick={() => handleSelectionChange(null)}
                  onKeyDown={() => handleSelectionChange(null)}
                >
                  {capitalized("No Selection")}
                </li>
              )}
            </Dropdown>
          )}
        </AnimatePresence>
      </div>
    </StyledFormInput>
  );
};
