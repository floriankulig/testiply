import { InfoPageHeader } from "components/InfoPageHeader";
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
`;

interface MockAppDetailViewProps {
  appName: string;
  devName: string;
  iconURL: string;
  _id: string;
}

export const MockAppDetailView: React.FC<MockAppDetailViewProps> = ({
  appName,
  devName,
  iconURL,
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
              <Image
                width={200}
                height={200}
                className="icon"
                src={iconURL}
                alt={`${appName} app icon`}
              />
            </IconWrapper>
            <MetaInfo>
              <motion.h1 layoutId={`appTitle-${_id}`}>{appName}</motion.h1>
              <motion.h3 layoutId={`appDevName-${_id}`} className="link">
                {devName}
              </motion.h3>
            </MetaInfo>
          </StyledRow>
        </HeroSection>
      </BodyOverlay>
    </Overlay>
  );
};
