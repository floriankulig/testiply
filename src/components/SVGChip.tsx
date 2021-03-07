import { motion } from "framer-motion";
import React from "react";
import { IconType } from "react-icons/lib";
import styled from "styled-components";

const StyledSVGChip = styled.div`
  display: flex;
  align-items: center;
  margin-top: 0.5em;
  padding: 0.5em 1em;
  font-size: 0.9rem;
  background: var(--layout-content-background);
  border-radius: 2em;
`;
const StyledSVGWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-left: 0.5em;
  font-size: 1rem;
  cursor: pointer;
`;

interface SVGChipProps {
  children: React.ReactNode;
  SVG: IconType;
  svgClickHandler: Function;
}

export const SVGChip: React.FC<SVGChipProps> = ({
  children,
  SVG,
  svgClickHandler,
}) => {
  return (
    <StyledSVGChip>
      {children}
      <StyledSVGWrapper
        role="button"
        onClick={() => svgClickHandler()}
        onKeyDown={() => svgClickHandler()}
        tabIndex={0}
        aria-label="Remove Chip"
        as={motion.div}
        whileHover={{ scale: 1.1 }}
      >
        <SVG />
      </StyledSVGWrapper>
    </StyledSVGChip>
  );
};
