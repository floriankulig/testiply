import { MockAppDetailView } from "components/appDetail";
import { AnimatePresence, motion } from "framer-motion";
import { useIsMobile } from "hooks";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { AppTileProps } from "./AppTile";

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
