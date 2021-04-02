import { rgba } from "polished";
import styled from "styled-components";
import * as Motion from "framer-motion";
import { createPortal } from "react-dom";

const StyledOverlay = styled.div`
  display: grid;
  place-items: center;
  position: fixed;
  top: 50%;
  left: 50%;
  width: 100vw;
  height: 100vh;
  z-index: 99999;
  transform: translate(-50%, -50%);
  background: ${({ theme }) => rgba(theme.navy, 0.3)};
`;

interface OverlayProps {
  style?: React.CSSProperties;
  children?: React.ReactNode;
  as?: Motion.ForwardRefComponent<
    HTMLDivElement,
    Motion.HTMLMotionProps<"div">
  >;
  asPortal?: boolean;
  [x: string]: any;
}

export const Overlay: React.FC<OverlayProps> = ({
  style,
  children,
  as,
  asPortal,
  ...motionProps
}) => {
  const body = (
    <StyledOverlay {...motionProps} as={as} style={style}>
      {children}
    </StyledOverlay>
  );

  return asPortal
    ? createPortal(body, document.getElementById("overlay-entry"))
    : body;
};
