import { Button } from "components/Button";
import { motion } from "framer-motion";
import Link from "next/link";
import { rgba } from "polished";
import styled from "styled-components";

const Container = styled.div`
  background: linear-gradient(to bottom right, #9b7bf5, #8260e5);
  padding: 2em 1.25em;
  border-radius: 1em;
  text-align: center;
  overflow: hidden;
  p {
    color: ${rgba("white", 0.75)};
    margin-top: 0;
  }
  ${Button} {
    width: 95%;
  }
`;

export const PublishAppCTA: React.FC = () => {
  return (
    <Container>
      <motion.p layoutId="publishApp-heading">Publish your own app!</motion.p>
      <Link href="/app/publish">
        <Button bold big color="white" disableElevation>
          Publish App
        </Button>
      </Link>
    </Container>
  );
};
