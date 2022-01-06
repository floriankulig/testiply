import { useFiltersValue } from "context";
import { useRouter } from "next/router";
import React, { Fragment, useEffect, useState } from "react";
import { App } from "ts";

import {
  ExpandButton,
  OptionsButton,
  StatField,
  StyledAppDevRow,
  StyledAppDevRowHeader,
  StyledHeaderButtons,
} from "./DevAppRow";

interface DevAppsRowsProps {
  apps: App[];
}

export const DevAppsRows: React.FC<DevAppsRowsProps> = ({ apps }) => {
  const [expandedApp, setExpandedApp] = useState<string>("");

  const router = useRouter();
  const { setSearchQuery } = useFiltersValue();

  const handleExpand = (clickedAppId: string) => {
    if (expandedApp === clickedAppId) {
      setExpandedApp("");
    } else {
      setExpandedApp(clickedAppId);
    }
  };

  const handleFeedbackClick = (appName: string) => {
    setSearchQuery(appName);
    router.push("/dev/feedback");
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
          <StatField
            value={app.downloads?.toString() || "0"}
            type="downloads"
          />
          <StatField
            value={app.rating.total?.toString() || "0.0"}
            type="total_rating"
          />
          <StatField
            value={app.rating.amount?.toString() || "0"}
            type="rating_amount"
          />
          <StatField
            value={app.rating.amount?.toString() || "0"}
            type="feedbacks"
            clickHandler={() => handleFeedbackClick(app.name)}
            aria-label={`View Feedbacks for ${app.name}`}
          />
        </StyledAppDevRow>
      ))}
    </Fragment>
  );
};
