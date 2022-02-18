import Image from "next/image";
import { Overlay } from "components/Overlay";
import { AnimatePresence, motion, Variants } from "framer-motion";
import { useCannotScroll, useOnClickOutside } from "hooks";
import { rgba } from "polished";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { fadeInOutVariants, theme } from "styles";
import { Button } from "components/Button";
import { useAuthValue } from "context";
import axios from "axios";

const StyledModal = styled.div<{ maxWidth: number }>`
  background: #f1f3ff;
  width: clamp(100px, 90%, ${(p) => p.maxWidth}px);
  height: max-content;
  max-height: 90vh;
  border-radius: 2em;
  overflow-x: hidden;
  position: relative;
  padding: 3.5em 3em 2em;

  @media (${({ theme }) => theme.bp.medium}) {
    padding: 4em 3.5em;
  }

  h3 {
    font-size: 1.5rem;
    color: ${({ theme }) => rgba(theme.navy, 0.7)};
  }

  h1 {
    font-size: 3rem;
    font-weight: 900;

    &.secondary {
      font-weight: 500;
      font-size: 2.5rem;
      color: ${rgba("black", 0.65)};
    }
  }

  .greeting {
    font-size: 1.7rem;
    font-weight: 500;
    display: flex;
    align-items: top;
    justify-content: flex-start;
    flex-wrap: wrap;

    p {
      margin: 0;
      font-size: clamp(1.5rem, 3vw, 1.8rem);
      font-weight: 500;

      &:first-of-type {
        margin-right: 0.3em;
      }
      &:last-of-type {
        margin-bottom: 0.8em;
      }
    }
  }

  .stepTwo {
    scrollbar-color: #fff;
    scrollbar-width: thin;
  }

  p {
    margin: 0 0 0.6em;
    font-size: clamp(0.95rem, 2vw, 1.075rem);
    color: ${({ theme }) => rgba(theme.navy, 0.7)};
    color: var(--navy);

    span {
      &.wish {
        font-size: 0.7rem;
      }

      &.name {
        font-weight: 500;
        color: var(--primary);
      }
    }
  }
`;

const BottomBar = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column-reverse;
  margin: 1em 0 0.5em;
  ${Button}:first-of-type {
    margin-top: 1em;
  }
  @media (${({ theme }) => theme.bp.medium}) {
    justify-content: space-between;
    flex-direction: row;
    ${Button}:first-of-type {
      margin: 0 1em 0 0;
    }
  }
`;

const StyledCookie = styled.div`
  position: absolute;
  z-index: 0;
  top: 0;
  right: 0;

  .bg {
    position: relative;

    .cookie1,
    .marks {
      position: absolute;
      top: 40px;
      right: 45px;
    }

    .marks {
      height: 70px;
      width: 70px;
      display: flex;
      align-items: center;
      justify-content: center;
      .mark {
        background-color: #d37272;
        height: 80px;
        width: 8px;
        position: absolute;
        left: calc(50%-4px);
        border-radius: 4px;
      }
    }
  }
`;

const cookieVariants: Variants = {
  initial: { scale: 0 },
  animate: {
    scale: 1,
    transformOrigin: "top right",
    transition: { duration: 0.8, delay: 1.2, type: "spring", bounce: 0.4 },
  },
  exit: { scale: 0 },
};

const NoCookieUsage: React.FC = () => {
  return (
    <StyledCookie as={motion.div} variants={cookieVariants}>
      <motion.div className="bg">
        <svg
          width="258"
          height="179"
          viewBox="0 0 258 179"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M60 40C53.6 10.4 17.6667 1 0.5 0H258V135C258.667 138.5 258.7 147.7 253.5 156.5C247 167.5 244 159.5 221 172.5C198 185.5 172.5 178 151.5 156.5C130.5 135 117 152.5 91 129C65 105.5 68 77 60 40Z"
            fill="#D49F4E"
            fillOpacity="0.6"
          />
        </svg>
        <motion.div
          initial={{ scale: 0, rotate: 60 }}
          animate={{ scale: 1, rotate: 0, transition: { delay: 1.5 } }}
          className="cookie1"
        >
          <Image height={70} width={70} src="/images/cookie.png" alt="Cookie" />
        </motion.div>
        <motion.div className="marks">
          <motion.div
            initial={{ scaleY: 0 }}
            animate={{
              scaleY: 1,
              rotate: 45,
              transition: {
                delay: 2,
              },
            }}
            className="mark mark-1"
          />
          <motion.div
            initial={{ scaleY: 0 }}
            animate={{
              scaleY: 1,
              rotate: -45,
              transition: {
                delay: 2.2,
              },
            }}
            className="mark mark-2"
          />
        </motion.div>
      </motion.div>
    </StyledCookie>
  );
};

const stepVariants: Variants = {
  animate: {
    transition: { delayChildren: 0.4, staggerChildren: 0.15 },
  },
  exit: {
    transition: {
      delayChildren: 0,
      staggerChildren: 0.15,
      staggerDirection: -1,
    },
  },
};

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
      delay: 0.2,
      duration: 0.4,
      type: "spring",
    },
  },
};

const fadeUp: Variants = {
  initial: {
    y: 50,
    opacity: 0,
  },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      ease: [0.6, 0.01, -0.05, 0.95],
      duration: 0.5,
    },
  },
  exit: {
    x: -350,
    opacity: 0,
    transition: {
      ease: [0.6, 0.01, -0.05, 0.95],
      duration: 0.5,
    },
  },
};

interface IntroductionProps {
  close: () => void;
}

export const Introduction: React.FC<IntroductionProps> = ({ close }) => {
  const [introAnimationDone, setIntroAnimationDone] = useState<boolean>(false);
  const [animState, setAnimState] = useState<number>(0);
  const { renewUid } = useAuthValue();

  useCannotScroll(true);

  const handleClick = async (e: MouseEvent) => {
    e.preventDefault();

    const body = {
      mail: process.env.NEXT_PUBLIC_SAMPLE_USER_MAIL,
      password: process.env.NEXT_PUBLIC_SAMPLE_USER_PASSWORD,
    };
    await axios
      .post(`${process.env.NEXT_PUBLIC_API_URL}/login`, body)
      .then(async (res) => {
        await renewUid(res.data.userId, true);
      });

    close();
  };

  useEffect(() => {
    const timeout = setTimeout(() => setIntroAnimationDone(true), 3800);
    const timeout2 = setTimeout(() => setAnimState((prev) => prev + 1), 4400);
    return () => {
      clearTimeout(timeout);
      clearTimeout(timeout2);
    };
  }, []);

  return (
    <Overlay
      asPortal
      as={motion.div}
      variants={fadeInOutVariants}
      initial="closed"
      animate="open"
      exit="closed"
    >
      <StyledModal
        as={motion.div}
        maxWidth={animState >= 1 ? 600 : 500}
        layout
        variants={modalVariants}
      >
        <AnimatePresence exitBeforeEnter>
          {!introAnimationDone && (
            <motion.div
              initial="initial"
              animate="animate"
              exit="exit"
              key="introAnimation"
              variants={stepVariants}
            >
              <motion.h3 variants={fadeUp}>
                hey!
                <span className="hand">👋</span>
              </motion.h3>
              <motion.h1 variants={fadeUp}>Don't worry...</motion.h1>
              <motion.h1 variants={fadeUp} className="secondary">
                It's not about cookies.
              </motion.h1>
              <NoCookieUsage />
            </motion.div>
          )}
          {!!introAnimationDone && (
            <motion.div
              initial="initial"
              animate="animate"
              exit="exit"
              className="stepTwo"
              style={{ overflowY: animState >= 2 ? "auto" : "hidden" }}
              variants={stepVariants}
              transition={{ delayChildren: 0.6, staggerChildren: 0.15 }}
              key="secondIntroAnimation"
            >
              <div className="greeting">
                {/* <motion.p variants={fadeUp}>Hey Kevin,</motion.p>{" "} */}
                <motion.p variants={fadeUp}>
                  Hey Community
                  <motion.span className="hand" variants={fadeUp}>
                    {" "}
                    👋
                  </motion.span>
                </motion.p>
              </div>
              <motion.p variants={fadeUp}>
                Willkommen bei unserem kleinen Projekt - Testiply :)
              </motion.p>
              <motion.p variants={fadeUp}>
                Testiply ist keine gewerblich betriebene Website, sondern ein
                kleines Projekt in dem die Entwickler neue Dinge lernen. Wir
                bilden hier eine Beta-Testing-Website nach, die schon eine
                gewisse Reputation unter Beta-Testern bzw. Entwicklern hat.
                Daher auch die gewagten Aussagen auf der Landing-Page, die man
                ja sonst nur von einer etablierten Website erwartet.
              </motion.p>
              <motion.p variants={fadeUp}>
                Damit ihr nicht "ins kalte Wasser geschmissen werdet", haben wir
                euch einen Account erstellt, mit dem ihr sämtliche Funktionen
                der Website ausprobieren könnt. Dazu müsst ihr nur unten auf den
                Button clicken.
              </motion.p>
              <motion.p variants={fadeUp}>
                Wenn ihr eure eigene (Web-)App hochladen wollt, so erstellt euch
                bitte einen eigenen Account. Ansonsten haben auch alle anderen
                Gewalt über eure App.
              </motion.p>
              <motion.p variants={fadeUp} style={{ margin: "1.2em 0 0.1em" }}>
                Viel Spaß <span className="wish">wünschen</span>
              </motion.p>
              <motion.p variants={fadeUp}>
                <span className="name">Noel</span> und{" "}
                <span className="name">Flo</span>
              </motion.p>
              <BottomBar
                as={motion.div}
                variants={fadeUp}
                onAnimationEnd={() => setAnimState((prev) => prev + 1)}
              >
                <Button
                  as={motion.button}
                  onTap={() => close()}
                  whileTap={{ scale: 0.95 }}
                  midBold
                  color={theme.navy}
                  transparent
                  disableElevation
                  type="button"
                >
                  Ausgeloggt Bleiben
                </Button>
                <Button
                  as={motion.button}
                  onTap={handleClick}
                  whileTap={{ scale: 0.95 }}
                  midBold
                  disableElevation
                >
                  Mit Sample Account Einloggen
                </Button>
              </BottomBar>
            </motion.div>
          )}
        </AnimatePresence>
      </StyledModal>
    </Overlay>
  );
};
