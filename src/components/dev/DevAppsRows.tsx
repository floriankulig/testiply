import React, { useEffect, useState } from "react";
import { App } from "ts";

import {
  ExpandButton,
  OptionsButton,
  StyledAppDevRow,
  StyledAppDevRowHeader,
} from "./DevAppRow";

interface DevAppsRowsProps {
  apps: App[];
}

export const DevAppsRows: React.FC<DevAppsRowsProps> = ({ apps }) => {
  const appId = "61cb55aa997627047a53a087";
  const [expandedApp, setExpandedApp] = useState<string>("");

  const handleExpand = (clickedAppId: string) => {
    if (expandedApp === clickedAppId) {
      setExpandedApp("");
    } else {
      setExpandedApp(clickedAppId);
    }
  };

  useEffect(() => {
    console.log(expandedApp);
  }, [expandedApp]);
  return (
    <StyledAppDevRow>
      <StyledAppDevRowHeader>
        <h2 className="app-name">App Name</h2>
        <ExpandButton
          action={() => handleExpand(appId)}
          isExpanded={expandedApp === appId}
        />
        <OptionsButton appId={appId} appName="Todoist" />
      </StyledAppDevRowHeader>
    </StyledAppDevRow>
  );
};
