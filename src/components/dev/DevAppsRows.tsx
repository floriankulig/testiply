import React, { Fragment, useEffect, useState } from "react";
import { App } from "ts";

import {
  ExpandButton,
  OptionsButton,
  StyledAppDevRow,
  StyledAppDevRowHeader,
  StyledHeaderButtons,
} from "./DevAppRow";

interface DevAppsRowsProps {
  apps: App[];
}

export const DevAppsRows: React.FC<DevAppsRowsProps> = ({ apps }) => {
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
    <Fragment>
      {apps?.map((app: App) => (
        <StyledAppDevRow key={app._id}>
          <StyledAppDevRowHeader>
            <h2 className="app-name">{app.name}</h2>
            <StyledHeaderButtons>
              <ExpandButton
                action={() => handleExpand(app._id)}
                isExpanded={expandedApp === app._id}
              />
              <OptionsButton app={app} />
            </StyledHeaderButtons>
          </StyledAppDevRowHeader>
        </StyledAppDevRow>
      ))}
    </Fragment>
  );
};
