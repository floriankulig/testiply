import React from "react";
import { StyledAppRowHeader, StyledAppStoreRow, ViewAllButton } from "./AppRow";

export const GamesRows: React.FC = () => {
  return (
    <>
      <StyledAppStoreRow>
        <StyledAppRowHeader>
          <h2 className="tab-name">Latest</h2>
          <ViewAllButton clickHandler={() => {}} />
        </StyledAppRowHeader>
      </StyledAppStoreRow>
      <StyledAppStoreRow>
        <StyledAppRowHeader>
          <h2 className="tab-name">Best rating</h2>
          <ViewAllButton clickHandler={() => {}} />
        </StyledAppRowHeader>
      </StyledAppStoreRow>
      <StyledAppStoreRow>
        <StyledAppRowHeader>
          <h2 className="tab-name">Most Downloads</h2>
          <ViewAllButton clickHandler={() => {}} />
        </StyledAppRowHeader>
      </StyledAppStoreRow>
    </>
  );
};
