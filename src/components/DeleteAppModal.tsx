import axios from "axios";
import { AnimatePresence, motion, Variants } from "framer-motion";
import { useRouter } from "next/router";
import { rgba } from "polished";
import React, { useState } from "react";
import { GoTrashcan } from "react-icons/go";
import { MdClose, MdError } from "react-icons/md";
import { CSSTransition } from "react-transition-group";
import styled from "styled-components";
import { fadeInOutVariants, scaleInVariants, theme } from "styles";
import { scaleInOutVariants } from "styles/variants";
import { Button } from "./Button";
import { ErrorMessage } from "./ErrorMessage";
import { Loading } from "./Loading";
import { Overlay } from "./Overlay";

const Modal = styled.div`
  background: var(--layout-nav-background);
  padding: 3.5em 2.5em 2.25em;
  border-radius: 1.25em;
  width: clamp(100px, 90%, 450px);
  position: relative;
  z-index: 2;

  p.modal-text {
    margin: 2em 0;
    color: ${({ theme }) => rgba(theme.navy, 0.95)};
  }

  @media (min-width: 550px) {
    padding: 3.5em 2.5em;
  }
`;

const TopBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  h2 {
    font-weight: bold;
    font-size: 1.8rem;
    margin: 0;
  }
  .close-svg-wrapper {
    width: clamp(26px, 3vw, 32px);
    height: clamp(26px, 3vw, 32px);
    cursor: pointer;
    svg {
      width: 100%;
      height: 100%;
    }
  }
`;

const BottomBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;

  ${Button} {
    svg {
      margin-right: 0.75em;
      transform: scale(1.7) translateY(0.05em);
    }
  }
`;

const StyledModalBackground = styled.div`
  position: absolute;
  z-index: -1;
  background: ${rgba("red", 0.075)};
  width: clamp(70px, 60vw, 260px);
  height: clamp(70px, 60vw, 280px);
  top: 50%;
  left: 50%;
  display: grid;
  place-items: center;

  div {
    width: 50%;
    height: 50%;
    color: ${rgba("red", 0.125)};
    transform: rotate(3deg);
    svg {
      width: 100%;
      height: 100%;
    }
  }
`;

const modalVariants: Variants = {
  closed: {
    scale: 0.6,
    opacity: 0,
    transition: {
      duration: 0.2,
    },
  },
  open: {
    scale: 1,
    opacity: 1,
    transition: {
      delayChildren: 0.15,
      staggerChildren: 0.1,
    },
  },
};

const backgroundVariants: Variants = {
  closed: {
    scale: 0.5,
    opacity: 0,
    x: "-50%",
    y: "-50%",
    borderRadius: "30% 70% 70% 30% / 30% 30% 70% 70%",
  },
  open: {
    scale: 1,
    opacity: 1,
  },
};

interface DeleteAppModalProps {
  appId: string;
  appName: string;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const DeleteAppModal: React.FC<DeleteAppModalProps> = ({
  appId,
  appName,
  setOpen,
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [hasError, setHasError] = useState<boolean>(false);

  const router = useRouter();

  const handleDelete = (): void => {
    setLoading(true);
    setHasError(false);
    axios
      .post(`${process.env.NEXT_PUBLIC_API_URL}/removeApp`, {
        appId,
      })
      .then(() => {
        setLoading(false);
        router.push("/dev/apps");
      })
      .catch(() => {
        setHasError(true);
        setLoading(false);
      });
  };

  return (
    <Overlay
      asPortal
      as={motion.div}
      variants={fadeInOutVariants}
      initial="closed"
      animate="open"
      exit="closed"
    >
      <Modal as={motion.div} animate variants={modalVariants} layout>
        <TopBar as={motion.div} animate layout>
          <motion.h2 variants={scaleInVariants}>Delete "{appName}"?</motion.h2>
          <motion.div
            className="close-svg-wrapper"
            onClick={() => setOpen(false)}
            onKeyDown={() => setOpen(false)}
            tabIndex={0}
            role="button"
            aria-label="Close this modal."
            whileHover={{ rotate: 180, scale: 1.05 }}
            whileTap={{ scale: 0.75 }}
            variants={scaleInVariants}
          >
            <MdClose />
          </motion.div>
        </TopBar>
        <motion.p layout className="modal-text" variants={scaleInVariants}>
          Are you sure you want to delete this app? This action is unreversible
          and will make the app no longer downloadable.
        </motion.p>
        <BottomBar as={motion.div} variants={scaleInVariants} layout>
          <Button
            as={motion.button}
            variants={scaleInVariants}
            onTap={() => setOpen(false)}
            whileTap={{ scale: 0.95 }}
            tabIndex={0}
            aria-label="Close this modal."
            bold
            disableElevation
            color={theme.layoutContentBg}
          >
            Cancel
          </Button>
          <Button
            bold
            color="red"
            as={motion.button}
            variants={scaleInVariants}
            onTap={() => handleDelete()}
            whileTap={{ scale: 0.95 }}
            tabIndex={0}
            disableElevation
            aria-label={`Delete your app called ${appName}.`}
          >
            {loading ? (
              <Loading size={40} />
            ) : (
              <>
                <GoTrashcan /> Delete
              </>
            )}
          </Button>
        </BottomBar>
        <CSSTransition
          in={!!hasError}
          classNames="pop-in"
          timeout={250}
          unmountOnExit
        >
          <ErrorMessage>
            <MdError />
            Error while deleting. Please try again.
          </ErrorMessage>
        </CSSTransition>
        <StyledModalBackground
          as={motion.div}
          variants={backgroundVariants}
          animate={{
            borderRadius: "60% 40% 61% 39% / 47% 28% 72% 53%",
            transition: {
              delay: 0.5,
              type: "spring",
              damping: 5,
            },
          }}
        >
          <motion.div
            variants={scaleInVariants}
            animate={{ rotate: 3 }}
            transition={{ delay: 0.8 }}
          >
            <GoTrashcan />
          </motion.div>
        </StyledModalBackground>
      </Modal>
    </Overlay>
  );
};
