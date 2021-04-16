import { MenuTransition } from "components/MenuTransition";
import React from "react";
import { FiClock, FiDownload, FiStar } from "react-icons/fi";
import { App, AppRowCategory } from "ts";
import { StyledAppRowHeader, StyledAppStoreRow, ViewAllButton } from "./AppRow";

interface GamesRowsProps {
  apps: App[];
  selectedCategory: AppRowCategory;
}

export const GamesRows: React.FC<GamesRowsProps> = () => {
  return (
    <MenuTransition>
      <StyledAppStoreRow>
        <StyledAppRowHeader>
          <h2 className="tab-name">
            <FiClock />
            Latest
          </h2>
          <ViewAllButton clickHandler={() => {}} />
        </StyledAppRowHeader>
      </StyledAppStoreRow>
      <StyledAppStoreRow>
        <StyledAppRowHeader>
          <h2 className="tab-name">
            <FiStar />
            Best rating
          </h2>
          <ViewAllButton clickHandler={() => {}} />
        </StyledAppRowHeader>
      </StyledAppStoreRow>
      <StyledAppStoreRow>
        <StyledAppRowHeader>
          <h2 className="tab-name">
            <FiDownload />
            Most Downloads
          </h2>
          <ViewAllButton clickHandler={() => {}} />
        </StyledAppRowHeader>
      </StyledAppStoreRow>
    </MenuTransition>
  );
};
