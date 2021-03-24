import { useAuthValue } from "context";
import { AnimatePresence, motion, Variants } from "framer-motion";
import { useOnClickOutside } from "hooks";
import Link from "next/link";
import { rgba } from "polished";
import React, { useRef, useState } from "react";
import { BiLogOut } from "react-icons/bi";
import { FiArrowUp, FiUser, FiUserCheck, FiUserPlus } from "react-icons/fi";
import styled from "styled-components";

const Dropdown = styled.ul`
  position: absolute;
  top: 15px;
  right: 15px;
  padding: 0.5em 0;
  display: flex;
  flex-direction: column;
  min-width: max-content;
  background: ${(p) => rgba(p.theme.layoutNavBg, 0.95)};
  border: 2px solid ${(p) => rgba(p.theme.navy, 0.4)};
  border-radius: 0.75em;
  box-shadow: -5px 10px 20px ${(p) => rgba(p.theme.navy, 0.1)};
`;

const dropdownVariants: Variants = {
  closed: {
    scale: 0,
    opacity: 0,
  },
  open: {
    scale: 1,
    opacity: 1,
    transformOrigin: "top right",
    transition: {
      staggerChildren: 0.05,
      staggerDirection: 1,
    },
  },
};

const DropdownItem = styled.li`
  width: 100%;
  min-width: max-content;
  padding: 1em 1.5em;
  display: flex;
  align-items: center;
  font-size: 1.1rem;
  cursor: pointer;
  transition: color 0.3s;
  word-wrap: none;
  svg {
    margin-right: 1em;
    width: 25px;
    min-height: 25px;
  }

  &:hover {
    color: var(--primary);
  }
`;

const dropdownItemVariants: Variants = {
  closed: {
    y: -25,
    opacity: 0,
  },
  open: {
    y: 0,
    opacity: 1,
  },
};

export const UserMenu = () => {
  const { currentUser } = useAuthValue();
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const ref = useRef<HTMLDivElement>(null);
  useOnClickOutside(ref, () => setMenuOpen(false));

  return (
    <div ref={ref} style={{ position: "relative" }}>
      <div
        className="menu-icon-wrapper"
        onClick={() => setMenuOpen(true)}
        onKeyDown={() => setMenuOpen(true)}
        tabIndex={0}
        role="button"
        aria-label="Open user menu"
      >
        <FiUser />
      </div>
      <AnimatePresence>
        {menuOpen && (
          <Dropdown
            as={motion.ul}
            variants={dropdownVariants}
            initial="closed"
            animate="open"
            exit="closed"
          >
            {!currentUser && (
              <>
                <Link href="/login">
                  <DropdownItem as={motion.li} variants={dropdownItemVariants}>
                    <FiUserCheck /> Log In
                  </DropdownItem>
                </Link>
                <Link href="/register">
                  <DropdownItem as={motion.li} variants={dropdownItemVariants}>
                    <FiUserPlus /> Register
                  </DropdownItem>
                </Link>
              </>
            )}
            {currentUser && !currentUser.isDev && (
              <Link href="/dev/upgrade">
                <DropdownItem as={motion.li} variants={dropdownItemVariants}>
                  <FiArrowUp /> Upgrade Account
                </DropdownItem>
              </Link>
            )}
            {!!currentUser && (
              <DropdownItem as={motion.li} variants={dropdownItemVariants}>
                <BiLogOut /> Log Out
              </DropdownItem>
            )}
          </Dropdown>
        )}
      </AnimatePresence>
    </div>
  );
};
