import { useAuthValue } from "context";
import { AnimatePresence, motion, Variants } from "framer-motion";
import { useOnClickOutside } from "hooks";
import Link from "next/link";
import { useRouter } from "next/router";
import { rgba } from "polished";
import React, { useRef, useState } from "react";
import { AiOutlineAppstore } from "react-icons/ai";
import { BiLogOut, BiStore } from "react-icons/bi";
import { FaRegComment } from "react-icons/fa";
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
  z-index: 100;
  box-shadow: -5px 10px 20px ${(p) => rgba(p.theme.navy, 0.1)};
`;

const dropdownVariants: Variants = {
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
  color: var(--navy);
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

export const UserMenu: React.FC = () => {
  const { currentUser, logout } = useAuthValue();
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const ref = useRef<HTMLDivElement>(null);
  useOnClickOutside(ref, () => setMenuOpen(false));

  const { pathname } = useRouter();
  const isStoreView = pathname.split("/")[1] === "store" ? true : false;

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
            {!!currentUser && !currentUser.isDev && (
              <Link href="/dev/upgrade">
                <DropdownItem as={motion.li} variants={dropdownItemVariants}>
                  <FiArrowUp /> Upgrade Account
                </DropdownItem>
              </Link>
            )}
            {isStoreView ? (
              <>
                {!!currentUser?.isDev && (
                  <>
                    <Link href="/dev/apps">
                      <DropdownItem
                        as={motion.li}
                        variants={dropdownItemVariants}
                      >
                        <AiOutlineAppstore /> View Your Apps
                      </DropdownItem>
                    </Link>
                    <Link href="/dev/feedback">
                      <DropdownItem
                        as={motion.li}
                        variants={dropdownItemVariants}
                      >
                        <FaRegComment /> View Feedbacks
                      </DropdownItem>
                    </Link>
                  </>
                )}
              </>
            ) : (
              <>
                <Link href="/store">
                  <DropdownItem as={motion.li} variants={dropdownItemVariants}>
                    <BiStore /> Go to store
                  </DropdownItem>
                </Link>
              </>
            )}
            {!!currentUser && (
              <DropdownItem
                as={motion.li}
                variants={dropdownItemVariants}
                onClick={() => logout()}
                onKeyDown={() => logout()}
                role="button"
                tabIndex={-1}
              >
                <BiLogOut /> Log Out
              </DropdownItem>
            )}
          </Dropdown>
        )}
      </AnimatePresence>
    </div>
  );
};
