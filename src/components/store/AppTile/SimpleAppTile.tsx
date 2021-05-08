import { MockAppDetailView } from "components/appDetail";
import { AnimatePresence, motion } from "framer-motion";
import { useIsMobile } from "hooks";
import Image from "next/image";
import Link from "next/link";
import { rgba } from "polished";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { AppTileProps } from "./AppTile";

const StyledAppTile = styled.li`
  display: flex;
`;

const IconWrapper = styled.div`
  height: 85px;
  width: 85px;
  min-height: 85px;
  min-width: 85px;
  box-shadow: 0px 0px 20px ${({ theme }) => rgba(theme.navy, 0.05)};
  border-radius: 20%;
  user-select: none;
  .icon {
    height: 100%;
    width: 100%;
    border-radius: 20%;
    object-fit: cover;
  }
`;

export const SimpleAppTile: React.FC<AppTileProps> = ({
  appInfo: { name, description, _id, devName, rating },
  className,
  style,
  customID = "",
  simple,
}) => {
  const [detailOpened, setDetailOpened] = useState<boolean>(false);
  const iconURL = `${process.env.NEXT_PUBLIC_API_URL}/static/${_id}/icon.png`;

  const layID = _id + customID;

  return (
    <>
      <StyledAppTile>
        <IconWrapper
          as={motion.div}
          layoutId={`appIcon-${layID}`}
          style={{ borderRadius: "25%" }}
        >
          <Image
            width={85}
            height={85}
            src={iconURL}
            className="icon"
            alt={`${name} app icon`}
          />
        </IconWrapper>
      </StyledAppTile>
      <AnimatePresence>
        {detailOpened && (
          <MockAppDetailView
            _id={layID}
            appName={name}
            devName={devName}
            iconURL={iconURL}
          />
        )}
      </AnimatePresence>
    </>
  );
};
