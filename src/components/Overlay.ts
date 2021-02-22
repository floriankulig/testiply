import { rgba } from "polished";
import styled from "styled-components";

export const Overlay = styled.div`
  display: grid;
  place-items: center;
  position: fixed;
  top: 50%;
  left: 50%;
  width: 100vw;
  height: 100vh;
  z-index: 99;
  transform: translate(-50%, -50%);
  background: ${({ theme }) => rgba(theme.navy, 0.3)};
`;
