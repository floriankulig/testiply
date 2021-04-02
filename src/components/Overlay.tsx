import { rgba } from "polished";
import styled from "styled-components";
import { createPortal } from "react-dom";

const StyledOverlay = styled.div`
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

interface OverlayProps {
  style?: React.CSSProperties;
  children?: React.ReactNode;
  asPortal?: boolean;
}

export const Overlay: React.FC<OverlayProps> = ({
  style,
  children,
  asPortal,
}) => {
  const body = <StyledOverlay style={style}>{children}</StyledOverlay>;

  return asPortal
    ? createPortal(body, document.getElementById("overlay-entry"))
    : body;
};
