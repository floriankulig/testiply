import { InfoPageHeader } from "components/InfoPageHeader";
import { Loading } from "components/Loading";
import { Overlay } from "components/Overlay";
import { motion } from "framer-motion";
import { getTextColor } from "helpers";
import Image from "next/image";
import React from "react";
import styled from "styled-components";
import { theme } from "styles";
import { HeroSection, IconWrapper, MetaInfo, StyledRow } from "./Hero";

const BodyOverlay = styled.div`
  width: 100vw;
  height: 100vh;
  background: var(--layout-nav-background);
  h4 {
    margin-top: 4em;
    text-align: center;
    font-size: 1.5rem;
    color: #b6b6b6;
  }
`;

interface MockAppDetailViewProps {
  appName: string;
  devName: string;
  Icon: JSX.Element;
  _id: string;
}

export const MockAppDetailView: React.FC<MockAppDetailViewProps> = ({
  appName,
  devName,
  Icon,
  _id,
}) => {
  return (
    <Overlay asPortal style={{ background: "none" }}>
      <BodyOverlay as={motion.div} layoutId={`appTile-${_id}`}>
        <InfoPageHeader
          className="container-small"
          style={{
            color: getTextColor(theme.layoutContentBg),
          }}
        />
        <HeroSection className="container-small">
          <StyledRow>
            <IconWrapper as={motion.div} layoutId={`appIcon-${_id}`}>
              {Icon}
            </IconWrapper>
            <MetaInfo>
              <motion.h1 layoutId={`appTitle-${_id}`}>{appName}</motion.h1>
              <motion.h3 layoutId={`appDevName-${_id}`} className="link">
                {devName}
              </motion.h3>
            </MetaInfo>
          </StyledRow>
        </HeroSection>
        <h4>
          Loading details <Loading color="#b6b6b6" />
        </h4>
      </BodyOverlay>
    </Overlay>
  );
};
