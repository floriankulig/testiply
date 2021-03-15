import { SVGChip } from "components/SVGChip";
import { useField } from "formik";
import { AnimatePresence, motion } from "framer-motion";
import { useOnClickOutside } from "hooks";
import { darken, rgba } from "polished";
import { useEffect, useRef, useState } from "react";
import { MdClose } from "react-icons/md";
import { CSSTransition } from "react-transition-group";
import styled from "styled-components";
import { DescriptiveObj } from "ts";
import {
  StyledFormInput,
  StyledMetaInputInfo,
  StyledTextField,
} from "./FormInput";

const Dropdown = styled.ul`
  position: absolute;
  width: 100%;
  right: 0;
  top: 66px;
  font-weight: normal;
  font-size: 1rem;
  max-height: 250px;
  overflow-y: auto;
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
    color: ${({ theme }) => rgba(theme.navy, 0.7)};
    cursor: pointer;
    background: transparent;
    &:hover {
      background: ${({ theme }) => darken(0.05, theme.layoutContentBg)};
    }
    transition: 0.5s background;
  }
`;

const StyledChips = styled.ul`
  display: flex;
  flex-wrap: wrap;
  margin-top: 0.5em;
  li {
    margin-right: 0.5em;
  }
`;

export const FormikTypedDropdown = ({
  label,
  values,
  maxValues,
  ...restProps
}: any) => {
  const [field, meta, helpers] = useField(restProps);
  const showsError: boolean = meta.touched && meta.error ? true : false;
  const [search, setSearch] = useState<string>("");
  const [filteredValues, setFilteredValues] = useState<DescriptiveObj[]>([]);
  const [dropdownOpens, setDropdownOpens] = useState<boolean>(false);
  const dropdownShouldOpen: boolean =
    dropdownOpens && !!filteredValues.length && field.value.length < maxValues;
  const dropdownRef = useRef<HTMLDivElement>();
  useOnClickOutside(dropdownRef, () => setDropdownOpens(false));

  useEffect(() => {
    setFilteredValues(
      values.filter((value: DescriptiveObj) =>
        value.displayName.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, values]);

  const handleAdd = (value: DescriptiveObj): void => {
    helpers.setValue([...field.value, value]);
    setDropdownOpens(false);
  };
  const handleRemove = (value: DescriptiveObj): void => {
    helpers.setValue(
      field.value?.filter((val: DescriptiveObj) => val.id !== value.id)
    );
  };

  return (
    <StyledFormInput style={{ position: "relative" }}>
      <StyledMetaInputInfo>
        {label + ` ${field.value.length}/${maxValues}`}
        <CSSTransition
          in={showsError}
          classNames="error"
          timeout={250}
          unmountOnExit
        >
          <span>{meta.error}</span>
        </CSSTransition>
      </StyledMetaInputInfo>
      <AnimatePresence>
        {field.value.length < maxValues && (
          <motion.div
            initial={{ scale: 1 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            ref={dropdownRef}
          >
            <StyledTextField
              hasError={showsError}
              onClick={() => setDropdownOpens(true)}
              onKeyDown={() => setDropdownOpens(true)}
              aria-label="Set the dropdown open"
              tabIndex={0}
              role="button"
            >
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={restProps.placeholder}
              />
            </StyledTextField>
            <AnimatePresence>
              {dropdownShouldOpen && (
                <Dropdown
                  as={motion.ul}
                  initial={{ scaleY: 0, y: "-45%", opacity: 0 }}
                  animate={{ scaleY: 1, y: 0, opacity: 1 }}
                  exit={{ scaleY: 0, y: "-45%", opacity: 0 }}
                >
                  {filteredValues
                    ?.filter((value) => !field.value.includes(value))
                    ?.map((value) => (
                      <motion.li
                        key={value.id}
                        animate
                        onClick={() => handleAdd(value)}
                        onKeyDown={() => handleAdd(value)}
                      >
                        {value.displayName}
                      </motion.li>
                    ))}
                </Dropdown>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
      <StyledChips as={motion.ul} layout>
        {field.value?.map((value: DescriptiveObj) => (
          <AnimatePresence key={value.id}>
            <motion.li
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              layout
            >
              <SVGChip
                SVG={MdClose}
                svgClickHandler={() => handleRemove(value)}
              >
                {value.displayName}
              </SVGChip>
            </motion.li>
          </AnimatePresence>
        ))}
      </StyledChips>
    </StyledFormInput>
  );
};
