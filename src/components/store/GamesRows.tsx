import { Loading } from "components/Loading";
import { MenuTransition } from "components/MenuTransition";
import { useRouter } from "next/router";
import React from "react";
import { FiClock, FiDownload, FiStar } from "react-icons/fi";
import { App, AppRowCategory, GameRowApps } from "ts";
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
  if (loading) {
    return (
      <div className="full-grid-width">
        <h2 className="loading">
          Loading
          <Loading size={60} />
        </h2>
      </div>
    );
  }
  if (!initialApps?.latest[0] || !initialApps) {
    return <NoAppsView hasApps={false}>No Games uploaded yet.</NoAppsView>;
  }
  const router = useRouter();
  const { latest, rating, downloads } = initialApps;

  return (
    <MenuTransition>
      <StyledAppStoreRow>
        <StyledAppRowHeader>
          <h2 className="tab-name">
            <FiClock />
            Latest
          </h2>
          <ViewAllButton
            clickHandler={() => router.push("/store/games?category=latest")}
          />
        </StyledAppRowHeader>
        <StyledAppRow>
          {latest?.map((app) => (
            <AppTile key={app._id} appInfo={app} />
          ))}
        </StyledAppRow>
      </StyledAppStoreRow>
      <StyledAppStoreRow>
        <StyledAppRowHeader>
          <h2 className="tab-name">
            <FiStar />
            Best rating
          </h2>
          <ViewAllButton
            clickHandler={() => router.push("/store/games?category=rating")}
          />
        </StyledAppRowHeader>
      </StyledAppStoreRow>
      <StyledAppStoreRow>
        <StyledAppRowHeader>
          <h2 className="tab-name">
            <FiDownload />
            Most Downloads
          </h2>
          <ViewAllButton
            clickHandler={() => router.push("/store/games?category=downloads")}
          />
        </StyledAppRowHeader>
      </StyledAppStoreRow>
    </MenuTransition>
  );
};
