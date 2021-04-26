import { Button } from "components/Button";
import { motion } from "framer-motion";
import Link from "next/link";
import { rgba } from "polished";
import styled from "styled-components";
import { fadeUpVariants, scaleInOutVariants } from "styles/variants";

const Container = styled.div`
  background: var(--layout-content-background);
  padding: 2em 1.25em;
  position: relative;
  border-radius: 1em;
  text-align: center;
  h3 {
    margin: 0.3em 0;
    color: ${({ theme }) => rgba(theme.navy, 0.8)};
  }
  p {
    color: ${({ theme }) => rgba(theme.navy, 0.75)};
    margin: 0.4em 0 0.8em;
    font-size: 0.95rem;
  }
  ${Button} {
    width: 95%;
  }
`;

const Icon = styled.div`
  position: absolute;
  top: -23px;
  left: calc(50% - 23px);
  width: 46px;
  height: 46px;
  display: grid;
  place-items: center;
  background: #e3eaff;
  box-shadow: 0 2px 5px ${({ theme }) => rgba(theme.navy, 0.1)};
  border-radius: var(--border-radius);
  font-size: 1.5rem;
  user-select: none;
  cursor: pointer;
`;

export const PublishAppCTA: React.FC = () => {
  return (
    <Container
      as={motion.div}
      layout
      initial="hidden"
      animate="show"
      exit="hidden"
      variants={scaleInOutVariants}
      transition={{ delayChildren: 0.4, staggerChildren: 0.15 }}
    >
      <Link href="/app/publish">
        <Icon as={motion.div} variants={scaleInOutVariants}>
          +
        </Icon>
      </Link>
      <motion.h3 variants={fadeUpVariants}>Publish App</motion.h3>
      <motion.p variants={fadeUpVariants}>Let others test your app</motion.p>
      <motion.div variants={scaleInOutVariants}>
        <Link href="/app/publish">
          <Button big bold disableElevation>
            Publish App
          </Button>
        </Link>
      </motion.div>
    </Container>
  );
};
