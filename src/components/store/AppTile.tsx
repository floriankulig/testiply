import React from "react";
import styled from "styled-components";
import { App } from "ts";

const StyledAppTile = styled.li``;

interface AppTileProps {
  style?: React.CSSProperties;
  className?: string;
  appInfo: App;
}

export const AppTile: React.FC<AppTileProps> = ({
  appInfo,
  className,
  style,
}) => {
  const { name, description, _id, icon, rating, downloads } = appInfo;
  return (
    <StyledAppTile style={{ ...style }} className={className}>
      {name}
    </StyledAppTile>
  );
};
