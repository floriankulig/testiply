import { AppGrid } from "components/layouts";
import React, { Fragment, useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import { FiDownload } from "react-icons/fi";
import { App } from "ts";

import {
  ExpandButton,
  OptionsButton,
  StatField,
  StyledAppDevRow,
  StyledAppDevRowHeader,
  StyledHeaderButtons,
} from "./DevAppRow";

interface DevApp extends App {
  feedbackAmount: number;
}

interface DevAppsRowsProps {
  apps: DevApp[];
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
      {apps?.map((app: DevApp) => (
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
          <StatField
            value={app.downloads?.toString() || "0"}
            type="downloads"
          />
          <StatField
            value={app.rating.total?.toString() || "0"}
            type="total_rating"
          />
          <StatField
            value={app.rating.amount?.toString() || "0"}
            type="rating_amount"
          />
          <StatField
            value={app.feedbackAmount?.toString() || "0"}
            type="feedbacks"
          />
        </StyledAppDevRow>
      ))}
    </Fragment>
  );
};
