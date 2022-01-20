import { useFiltersValue } from "context";
import { AnimatePresence, motion, Variants } from "framer-motion";
import { useRouter } from "next/router";
import React, { Fragment, useEffect, useState } from "react";
import { App } from "ts";

import {
  ExpandButton,
  Links,
  OptionsButton,
  StatField,
  StatFieldGrid,
  StyledAppDevRow,
  StyledAppDevRowBody,
  StyledAppDevRowHeader,
  StyledHeaderButtons,
} from "./DevAppRow";

const headerVariants: Variants = {
  initial: { scaleX: 0 },
  animate: {
    scaleX: 1,
    transformOrigin: "left",
    transition: { duration: 0.2, when: "beforeChildren" },
  },
};

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
      {apps?.map((app: App, i: number) => (
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
          <StyledAppDevRowBody as={motion.div} layout animate>
            <StatFieldGrid
              as={motion.div}
              layout
              animate
              expanded={expandedApp === app._id}
            >
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
            </StatFieldGrid>
            <AnimatePresence>
              {expandedApp === app._id && <Links app={app} />}
            </AnimatePresence>
          </StyledAppDevRowBody>
        </StyledAppDevRow>
      ))}
    </Fragment>
  );
};
