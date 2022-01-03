import { AnimatePresence, motion, Variants } from "framer-motion";
import { rgba } from "polished";
import styled from "styled-components";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaChevronDown } from "react-icons/fa";
import { useRef, useState } from "react";
import Link from "next/link";
import { useOnClickOutside } from "hooks";
import { GoLinkExternal, GoTrashcan } from "react-icons/go";
import { DeleteAppModal } from "components/DeleteAppModal";

export const StyledAppDevRow = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 2.5em;
`;

export const StyledAppDevRowHeader = styled.div`
  display: flex;
  width: 100%;

  h2.app-name {
    display: flex;
    color: var(--navy);
    font-size: 1.8rem;
    font-weight: 500;
    margin: 0;
    position: relative;
    white-space: nowrap;
    align-items: center;
    width: 100%;
    &:after {
      content: "";
      display: block;
      border-bottom: 2px solid ${(p) => rgba(p.theme.primary, 0.2)};
      width: 100%;
      margin-left: 20px;
      margin-top: 2px;
    }
  }
`;

const StyledButtonWrapper = styled.div`
  height: 40px;
  background-color: ${(p) => rgba(p.theme.primary, 0.05)};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 20px;
  transition: all 0.3s;
  color: var(--primary);
  border-radius: 50%;

  &:hover {
    border-radius: 5px;
    background-color: ${(p) => rgba(p.theme.primary, 0.2)};
    cursor: pointer;
  }

  span.text {
    margin-right: 10px;
    font-size: 0.95rem;
    font-weight: 500;
  }
`;

const StyledIconWrapper = styled.div<{ smallIcon?: boolean }>`
  width: 40px;
  height: 40px;
  display: grid;
  place-items: center;
  transition: all 0.3s;
  svg {
    width: ${({ smallIcon }) => (smallIcon ? "20px" : "26px")};
    height: ${({ smallIcon }) => (smallIcon ? "20px" : "26px")};
  }
`;

const Dropdown = styled.ul`
  position: absolute;
  top: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  min-width: max-content;
  background: var(--layout-nav-background);
  border: 1px solid ${(p) => rgba(p.theme.primary, 0.4)};
  border-radius: 0.5em;
  z-index: 100;
  padding: 0.8em 0 0;
  cursor: default;
  box-shadow: -5px 10px 20px ${(p) => rgba(p.theme.navy, 0.1)};
`;

const optionsDropdownVariants: Variants = {
  closed: {
    scale: 0,
    opacity: 0,
    transition: {
      delay: 0.1,
      staggerChildren: 0.05,
      staggerDirection: -1,
    },
  },
  open: {
    scale: 1,
    opacity: 1,
    transformOrigin: "top right",
    transition: {
      delayChildren: 0.2,
      staggerChildren: 0.05,
      staggerDirection: 1,
    },
  },
};

const DropdownItem = styled.li<{ color?: string }>`
  color: ${({ color }) => color || "var(--navy)"};
  display: flex;
  align-items: center;
  padding: 0.8em 1em;
  transition: background-color 0.5s, color 0.3s;
  cursor: pointer;

  &:hover {
    background-color: ${(p) =>
      p.color ? rgba(p.color, 0.05) : rgba(p.theme.primary, 0.05)};

    ${(p) => !p.color && "color: var(--primary)"}
  }
  svg {
    width: 25px;
    height: 25px;
    margin-right: 10px;
  }
`;

const DropdownHeader = styled.h4`
  font-weight: 500;
  font-size: 1.15rem;
  margin: 0 0.5em 0.6em;
  padding: 0.3em;
  border-bottom: 1px solid ${(p) => rgba(p.theme.primary, 0.4)};
  color: var(--navy);
`;

const dropdownItemVariants: Variants = {
  closed: {
    y: -20,
    opacity: 0,
  },
  open: {
    y: 0,
    opacity: 1,
  },
};

interface ExpandButtonProps {
  action: React.Dispatch<React.SetStateAction<void>>;
  isExpanded: boolean;
}

export const ExpandButton: React.FC<ExpandButtonProps> = ({
  action,
  isExpanded,
}) => {
  return (
    <StyledButtonWrapper as={motion.div} onTap={() => action()}>
      <StyledIconWrapper
        smallIcon
        as={motion.div}
        tabIndex={0}
        role="button"
        animate={{
          rotate: isExpanded ? 180 : 0,
          transition: { duration: 0.15 },
        }}
        aria-label={`Expand App"`}
      >
        <FaChevronDown />
      </StyledIconWrapper>
    </StyledButtonWrapper>
  );
};

interface OptionsButtonProps {
  appId: string;
  appName: string;
}

export const OptionsButton: React.FC<OptionsButtonProps> = ({
  appId,
  appName,
}) => {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);
  const ref = useRef<HTMLDivElement>(null);

  const handleClickOutside = (): void => !deleteModalOpen && setMenuOpen(false);
  useOnClickOutside(ref, handleClickOutside);
  return (
    <>
      <AnimatePresence>
        {deleteModalOpen && (
          <DeleteAppModal
            appName={appName}
            appId={appId}
            setOpen={setDeleteModalOpen}
          />
        )}
      </AnimatePresence>
      <StyledButtonWrapper
        ref={ref}
        style={{ position: "relative" }}
        as={motion.div}
        onTap={() => setMenuOpen(true)}
        tabIndex={0}
        role="button"
        aria-label={`Open options for app "${appName}"`}
      >
        <StyledIconWrapper>
          <BsThreeDotsVertical />
        </StyledIconWrapper>
        <AnimatePresence>
          {menuOpen && (
            <Dropdown
              as={motion.ul}
              variants={optionsDropdownVariants}
              initial="closed"
              animate="open"
              exit="closed"
            >
              <DropdownHeader as={motion.h4} variants={dropdownItemVariants}>
                {appName}
              </DropdownHeader>
              <Link href={`/app/${appId}`}>
                <DropdownItem as={motion.li} variants={dropdownItemVariants}>
                  <GoLinkExternal /> View App
                </DropdownItem>
              </Link>
              <DropdownItem
                as={motion.li}
                variants={dropdownItemVariants}
                color={"red"}
                onTap={() => {
                  setDeleteModalOpen(true);
                }}
              >
                <GoTrashcan /> Delete
              </DropdownItem>
            </Dropdown>
          )}
        </AnimatePresence>
      </StyledButtonWrapper>
    </>
  );
};
