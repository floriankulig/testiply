import { MockAppDetailView } from "components/appDetail";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/router";
import { rgba } from "polished";
import { useState } from "react";
import { FaStar } from "react-icons/fa";
import styled from "styled-components";
import { AppTileProps } from "./AppTile";

const StyledAppTile = styled.li`
  display: flex;
  flex-direction: column;
  max-width: 110px;
`;

const StyledAppTileMeta = styled.div`
  width: 100%;
  padding-left: 0.25em;
  position: relative;
  h3 {
    font-size: 1.05rem;
    line-height: 1.2;
    margin: 0.3em 0 0.2em;
    color: ${({ theme }) => rgba(theme.navy, 0.95)};
    font-weight: normal;
    display: -webkit-box;
    word-wrap: break;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  span {
    font-size: 0.95rem;
    color: ${({ theme }) => rgba(theme.navy, 0.7)};
    svg {
      font-size: 0.7rem;
    }
  }

  p.invis-for-anim {
    position: absolute;
    top: 0.3em;
  }
`;

const IconWrapper = styled.div`
  height: 110px;
  width: 110px;
  min-height: 110px;
  min-width: 110px;
  box-shadow: 0px 2px 6px ${({ theme }) => rgba(theme.navy, 0.08)};
  border-radius: 20%;
  user-select: none;
  position: relative;
  .icon {
    pointer-events: none;
    height: 100%;
    width: 100%;
    border-radius: 20%;
    object-fit: cover;
  }

  .image-cursor-overlay {
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 1;
    cursor: pointer;
  }
`;

export const SimpleAppTile: React.FC<AppTileProps> = ({
  appInfo: { name, _id, devName, rating },
  className,
  style,
  customID = "",
}) => {
  const [detailOpened, setDetailOpened] = useState<boolean>(false);
  const router = useRouter();
  const iconURL = `${process.env.NEXT_PUBLIC_API_URL}/static/${_id}/icon.png`;

  const layID = _id + customID;

  const handleClick = () => {
    setDetailOpened(true);
    router.push(`/app/${_id}`);
  };

  return (
    <>
      <StyledAppTile
        className={className}
        style={style}
        as={motion.li}
        layout
        layoutId={`appTile-${layID}`}
      >
        <IconWrapper
          onTap={handleClick}
          as={motion.div}
          layoutId={`appIcon-${layID}`}
          style={{ borderRadius: "20%" }}
        >
          <div className="image-cursor-overlay"></div>
          <Image
            width={110}
            height={110}
            src={iconURL}
            className="icon"
            alt={`${name} app icon`}
          />
        </IconWrapper>
        <StyledAppTileMeta>
          <motion.h3 layoutId={`appTitle-${layID}`}>{name}</motion.h3>
          <span>
            {rating.total} <FaStar />
          </span>
          <motion.p
            className="invis-for-anim"
            layoutId={`appDevName-${layID}`}
            style={{ visibility: "hidden" }}
          >
            {devName}
          </motion.p>
        </StyledAppTileMeta>
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
