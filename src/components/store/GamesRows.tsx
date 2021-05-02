import { AppGrid } from "components/layouts";
import { Loading } from "components/Loading";
import { MenuTransition } from "components/MenuTransition";
import { AnimatePresence } from "framer-motion";
import { useRouter } from "next/router";
import React from "react";
import { FiClock, FiDownload, FiStar } from "react-icons/fi";
import { CSSTransition } from "react-transition-group";
import {
  App,
  AppRowCategory,
  AppRowCategoryID,
  GameRowApps,
  gameRowCategories,
} from "ts";
import { AppTile } from ".";
import {
  StyledAppRowHeader,
  StyledAppStoreRow,
  ViewAllButton,
  StyledAppRow,
} from "./AppRow";
import { NoAppsView } from "./NoAppsView";

interface GamesRowsProps {
  apps: App[];
  initialApps: GameRowApps;
  selectedCategory: AppRowCategory;
  loading: boolean;
}

export const GamesRows: React.FC<GamesRowsProps> = ({
  apps,
  initialApps,
  selectedCategory,
  loading,
}) => {
  if (!initialApps?.latest[0] || !initialApps) {
    return <NoAppsView hasApps={false}>No Games uploaded yet.</NoAppsView>;
  }
  const router = useRouter();

  return (
    <MenuTransition>
      <CSSTransition
        in={!selectedCategory}
        classNames="menu-primary"
        timeout={400}
        unmountOnExit
        appear
      >
        <div>
          {!!initialApps &&
            Object.keys(initialApps)?.map((key: AppRowCategoryID) => {
              const row: AppRowCategory = gameRowCategories.find(
                (cat) => cat.id === key
              );
              const rowApps: App[] = initialApps[key];

              return (
                <StyledAppStoreRow key={row.id}>
                  <StyledAppRowHeader>
                    <h2 className="tab-name">
                      <row.icon />
                      {row.displayName}
                    </h2>
                    <ViewAllButton
                      clickHandler={() =>
                        router.push(`/store/games?category=${row.id}`)
                      }
                    />
                  </StyledAppRowHeader>
                  <StyledAppRow>
                    {rowApps?.map((app) => (
                      <AppTile
                        key={app._id}
                        customID={row.id}
                        simple
                        appInfo={app}
                      />
                    ))}
                  </StyledAppRow>
                </StyledAppStoreRow>
              );
            })}
          {loading && (
            <div className="full-grid-width">
              <h2 className="loading">
                Loading
                <Loading size={60} />
              </h2>
            </div>
          )}
        </div>
      </CSSTransition>
      <CSSTransition
        in={!!selectedCategory}
        classNames="menu-secondary"
        timeout={400}
        unmountOnExit
      >
        <AppGrid>
          <AnimatePresence>
            {apps.map((app) => (
              <AppTile key={app._id} appInfo={app} />
            ))}
          </AnimatePresence>
          <div className="full-grid-width">
            {loading && (
              <h2 className="loading">
                Loading
                <Loading size={60} />
              </h2>
            )}
          </div>
        </AppGrid>
      </CSSTransition>
    </MenuTransition>
  );
};
