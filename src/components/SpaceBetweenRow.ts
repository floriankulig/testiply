import styled from "styled-components";

interface SpaceBetweenProps {
  col?: boolean;
}

export const SpaceBetween = styled.div<SpaceBetweenProps>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: ${(p) => (p.col ? "column" : "row")};
`;
