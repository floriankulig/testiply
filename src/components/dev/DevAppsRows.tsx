import { useFiltersValue } from "context";
import { AnimatePresence, motion, Variants } from "framer-motion";
import { useDebug } from "hooks";
import { useRouter } from "next/router";
import React, { Fragment, useState } from "react";
import { App } from "ts";

import {
  ExpandButton,
  OptionsButton,
  StatField,
  StatFieldGrid,
  StyledAppDevRow,
  StyledAppDevRowBody,
  StyledAppDevRowBodyTop,
  StyledAppDevRowHeader,
  StyledHeaderButtons,
} from "./DevAppRow";
import { Links } from "./DevAppRowLinks";

const headerVariants: Variants = {
  initial: { scaleX: 0 },
  animate: {
    scaleX: 1,
    transformOrigin: "left",
    transition: { duration: 0.2, when: "beforeChildren" },
  },
};

interface DevAppsRowsProps {
  initialApps: App[];
}

export const DevAppsRows: React.FC<DevAppsRowsProps> = ({ initialApps }) => {
  const [expandedApp, setExpandedApp] = useState<string>("");
  const [apps, setApps] = useState<App[]>(initialApps);

  // mimics inner components' edit modes
  // gives access to edit state in most performant way
  const [editModeOn, setEditModeOn] = useState<boolean>(false);

  const handleExpand = (clickedAppId: string) => {
    setEditModeOn(false);
    if (expandedApp === clickedAppId) {
      setExpandedApp("");
    } else {
      setExpandedApp(clickedAppId);
    }
  };

  const router = useRouter();
  const { setSearchQuery } = useFiltersValue();

  const handleFeedbackClick = (appName: string) => {
    setSearchQuery(appName);
    router.push("/dev/feedback");
  };

  return (
    <Fragment>
      {apps?.map((app: App, i: number) => {
        let totalRating: string = app.rating.total?.toString();
        totalRating =
          totalRating.length <= 1 ? totalRating + ".0" : totalRating;
        const statFields = (
          <Fragment>
            <StatField
              value={app.downloads?.toString() || "0"}
              type="downloads"
            />
            <StatField value={totalRating || "0.0"} type="total_rating" />
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
          </Fragment>
        );
        return (
          <StyledAppDevRow
            key={app._id}
            as={motion.div}
            transition={{ staggerChildren: 0.075, delayChildren: i / 2 + 0.5 }}
            initial="initial"
            animate="animate"
            layout
          >
            <StyledAppDevRowHeader as={motion.div} animate layout>
              <motion.h2 className="app-name" variants={headerVariants}>
                {app.name}
              </motion.h2>
              <StyledHeaderButtons>
                <ExpandButton
                  action={() => handleExpand(app._id)}
                  isExpanded={expandedApp === app._id}
                />
                <OptionsButton app={app} />
              </StyledHeaderButtons>
            </StyledAppDevRowHeader>
            <StyledAppDevRowBody as={motion.div} layout>
              <StyledAppDevRowBodyTop>
                <AnimatePresence exitBeforeEnter>
                  {expandedApp === app._id ? (
                    <>
                      <StatFieldGrid as={motion.div} layout expanded={true}>
                        {statFields}
                      </StatFieldGrid>
                      <Links
                        app={app}
                        apps={apps}
                        setApps={setApps}
                        setOuterEditModeOn={setEditModeOn}
                      />
                    </>
                  ) : (
                    <StatFieldGrid as={motion.div} layout expanded={false}>
                      {statFields}
                    </StatFieldGrid>
                  )}
                </AnimatePresence>
              </StyledAppDevRowBodyTop>
            </StyledAppDevRowBody>
          </StyledAppDevRow>
        );
      })}
    </Fragment>
  );
};
