import { Button } from "components/Button";
import { Overlay } from "components/Overlay";
import { motion } from "framer-motion";
import { useCannotScroll, useOnClickOutside } from "hooks";
import Link from "next/link";
import { useRef } from "react";
import { FaRegSadTear } from "react-icons/fa";
import { MdClose } from "react-icons/md";
import styled from "styled-components";

const Modal = styled.div`
  background: var(--layout-nav-background);
  padding: 3em;
  border-radius: 1.25em;
  width: clamp(100px, 90%, 450px);
`;
const TopBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2em;
  color: var(--navy);
  h2 {
    margin: 0;
    font-size: clamp(1.4rem, 4vw, 1.8rem);
    display: flex;
    align-items: center;
    svg {
      color: var(--primary);
      margin-right: 0.5em;
    }
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
  flex-direction: column-reverse;
  justify-content: space-between;
  align-items: center;
  margin-top: 2em;
  ${Button}:first-of-type {
    margin-top: 0.5em;
  }
  @media (min-width: 550px) {
    flex-direction: row;
    ${Button}:first-of-type {
      margin: 0;
    }
  }
`;

interface IsSampleAppModalProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
export const IsSampleAppModal: React.FC<IsSampleAppModalProps> = ({
  setOpen,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  useCannotScroll(true);
  useOnClickOutside(ref, () => setOpen(false));
  return (
    <Overlay>
      <Modal
        as={motion.div}
        initial={{ scale: 0.1, y: 100 }}
        animate={{ scale: 1, y: 0 }}
        ref={ref}
      >
        <TopBar>
          <h2>
            <FaRegSadTear />
            We're sorry!
          </h2>
          <motion.div
            className="close-svg-wrapper"
            onClick={() => setOpen(false)}
            onKeyDown={() => setOpen(false)}
            tabIndex={0}
            role="button"
            aria-label="Close this modal."
            whileHover={{ rotate: 180, scale: 1.05 }}
            whileTap={{ scale: 0.75 }}
          >
            <MdClose />
          </motion.div>
        </TopBar>
        <p>
          Unfortunately, you can't test this App. This app is a sample app
          provided by Testiply to showcase the platform's functionality. We
          appreciate your understanding.
        </p>
        <BottomBar>
          <Button
            transparent
            onClick={() => setOpen(false)}
            onKeyDown={() => setOpen(false)}
            tabIndex={0}
            aria-label="Close this modal."
          >
            Close
          </Button>
          <Link href="/store">
            <Button bold>Search for another app</Button>
          </Link>
        </BottomBar>
      </Modal>
    </Overlay>
  );
};
