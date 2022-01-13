import { AnimatePresence, motion, Variants } from "framer-motion";
import { darken, rgba } from "polished";
import styled from "styled-components";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaChevronDown, FaStar } from "react-icons/fa";
import { useRef, useState } from "react";
import Link from "next/link";
import { useOnClickOutside } from "hooks";
import { GoLinkExternal, GoTrashcan } from "react-icons/go";
import { DeleteAppModal } from "components/DeleteAppModal";
import { App } from "ts";
import { FiDownload } from "react-icons/fi";
import { BiCommentDetail } from "react-icons/bi";
import { AiOutlineNumber } from "react-icons/ai";

export const StyledAppDevRow = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 3em;
`;

export const StyledAppDevRowHeader = styled.div`
  display: flex;
  width: 100%;
  height: 40px;
  position: relative;
  /* overflow-x: clip; */
  margin-bottom: 0.75em;

  h2.app-name {
    display: flex;
    color: var(--navy);
    font-weight: 500;
    margin: 0;
    position: relative;
    white-space: nowrap;
    align-items: center;
    width: 100%;
    font-size: clamp(20px, 4vw, 28px);

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

export const StyledHeaderButtons = styled.div`
  display: flex;
  background: var(--layout-content-background);
  position: absolute;
  right: 0;

  @media (min-width: 400px) {
    position: relative;
  } ;
`;

const StyledButtonWrapper = styled.div`
  height: 40px;
  background-color: ${(p) => rgba(p.theme.primary, 0.05)};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 20px;
  transition: 0.3s;
  transition-property: background-color, border-radius;
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

const buttonVariants: Variants = {
  initial: { x: -80, opacity: 0 },
  animate: { x: 0, opacity: 1, transition: { type: "spring" } },
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
    <StyledButtonWrapper
      as={motion.div}
      animate
      variants={buttonVariants}
      onTap={() => action()}
    >
      <StyledIconWrapper
        smallIcon
        as={motion.div}
        tabIndex={0}
        role="button"
        animate={{
          rotate: isExpanded ? 180 : 0,
          transition: { duration: 0.5, type: "spring" },
        }}
        aria-label={`Expand App"`}
      >
        <FaChevronDown />
      </StyledIconWrapper>
    </StyledButtonWrapper>
  );
};

const disabledTabStyles: React.CSSProperties = {
  color: "lightgrey",
  cursor: "not-allowed",
  userSelect: "none",
};

interface OptionsButtonProps {
  app: App;
}

export const OptionsButton: React.FC<OptionsButtonProps> = ({ app }) => {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);
  const ref = useRef<HTMLDivElement>(null);

  const { name, _id, isSample, ...restApp } = app;

  const handleClickOutside = (): void => !deleteModalOpen && setMenuOpen(false);
  useOnClickOutside(ref, handleClickOutside);
  return (
    <>
      <AnimatePresence>
        {deleteModalOpen && (
          <DeleteAppModal
            appName={name}
            appId={_id}
            setOpen={setDeleteModalOpen}
          />
        )}
      </AnimatePresence>
      <StyledButtonWrapper
        ref={ref}
        style={{ position: "relative" }}
        as={motion.div}
        onTap={() => setMenuOpen(true)}
        variants={buttonVariants}
        tabIndex={0}
        role="button"
        aria-label={`Open options for app "${name}"`}
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
                {name}
              </DropdownHeader>
              <Link href={`/app/${_id}`}>
                <DropdownItem as={motion.li} variants={dropdownItemVariants}>
                  <GoLinkExternal /> View App
                </DropdownItem>
              </Link>
              <DropdownItem
                as={motion.li}
                variants={dropdownItemVariants}
                color={!isSample ? "red" : "lightgrey"}
                style={isSample && disabledTabStyles}
                onTap={() => {
                  if (isSample) return;
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

// we hardcode the values here because there is no suitable grid/flexbox solution
const bp1 = "600px";
const bp2 = "995px";

export const StatFieldGrid = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr;
  place-items: center;
  gap: 0.5em;
  @media (min-width: ${bp1}) {
    gap: 1em;
    grid-template-columns: repeat(2, 1fr);
  }
  @media (min-width: ${bp2}) {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
  }
`;

const StyledStatField = styled.div`
  background: var(--layout-nav-background);
  position: relative;
  height: 150px;
  width: 90%;
  min-width: 275px;
  @media (min-width: ${bp1}) {
    width: clamp(275px, 100%, 300px);
  }
  padding: 1em 2em;
  border: 1px solid ${(p) => rgba(p.theme.primary, 0.05)};
  box-shadow: ${rgba(0, 0, 0, 0.01)} 0px 0px 15px;
  display: flex;
  align-items: center;
`;

const StyledStatFieldIconWrapper = styled.div<{ color: string }>`
  height: 60px;
  width: 60px;
  border-radius: 50%;
  background: ${(p) => rgba(p.color, 0.1)};
  display: grid;
  place-items: center;
  & > div {
    color: ${(p) => p.color};
    height: max-content;
    width: 28px;
    position: relative;
    svg {
      position: relative;
      width: 100%;
      height: 100%;
    }
  }
`;

const StyledStatFieldText = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 2.5em;

  h5.heading {
    text-transform: uppercase;
    font-weight: 500;
    color: #afb5c4;
    margin: 0;
  }
  h4.value {
    font-weight: 900;
    color: var(--navy);
    margin: 0.2em 0 0;
    font-size: 2.5rem;
  }
`;

const StyledRatingAmountIcon = styled.div<{ color: string }>`
  position: relative;
  svg:first-of-type {
    position: relative;
    width: 100%;
    height: 100%;
  }

  svg:last-of-type {
    position: absolute;
    right: 0;
    bottom: 0;
    width: 60%;
    height: 60%;
    color: ${(p) => darken(0.25, p.color)};
  }
`;

const RatingAmountIcon: React.FC<{ color: string }> = (props) => {
  return (
    <StyledRatingAmountIcon {...props}>
      <FaStar />
      <AiOutlineNumber />
    </StyledRatingAmountIcon>
  );
};

const fieldVariants: Variants = {
  initial: { scale: 0, opacity: 0 },
  animate: {
    scale: 1,
    opacity: 1,
    transition: {
      duration: 0.5,
      type: "spring",
      staggerChildren: 0.15,
      delayChildren: 0.3,
    },
  },
};

const textVariants: Variants = {
  initial: { y: -15, opacity: 0 },
  animate: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.3 },
  },
};
const iconVariants: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.3 } },
};

interface StatFieldProps {
  value: string;
  type: "feedbacks" | "total_rating" | "downloads" | "rating_amount";
  clickHandler?: () => void;
}

export const StatField: React.FC<StatFieldProps> = ({
  value,
  type,
  clickHandler,
}) => {
  return (
    <StyledStatField
      as={motion.div}
      style={{
        cursor: clickHandler ? "pointer" : "default",
        borderRadius: 8,
      }}
      onTap={clickHandler}
      whileTap={{ scale: clickHandler ? 0.95 : 1 }}
      variants={fieldVariants}
    >
      <StyledStatFieldIconWrapper
        as={motion.div}
        variants={iconVariants}
        color={
          type === "total_rating"
            ? "#e6cf07"
            : type === "feedbacks"
            ? "#c115ff"
            : type === "downloads"
            ? "#0faa21"
            : "#0078FF"
        }
      >
        <div>
          {type === "total_rating" ? (
            <FaStar />
          ) : type === "feedbacks" ? (
            <BiCommentDetail />
          ) : type === "downloads" ? (
            <FiDownload />
          ) : (
            <RatingAmountIcon color="#0078FF" />
          )}
        </div>
      </StyledStatFieldIconWrapper>
      <StyledStatFieldText>
        <motion.h5 variants={textVariants} className="heading">
          {type.replace("_", " ")}
        </motion.h5>
        <motion.h4 variants={textVariants} className="value">
          {value}
        </motion.h4>
      </StyledStatFieldText>
    </StyledStatField>
  );
};
