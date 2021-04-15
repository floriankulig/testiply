import React from "react";
import { FiClock, FiDownload, FiStar } from "react-icons/fi";
import { StyledAppRowHeader, StyledAppStoreRow, ViewAllButton } from "./AppRow";

export const GamesRows: React.FC = () => {
  return (
    <>
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
    </>
  );
};
