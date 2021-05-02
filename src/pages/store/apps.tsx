import axios from "axios";
import { AppGrid, Layout } from "components/layouts";
import { Loading } from "components/Loading";
import { AppTile, NoAppsView } from "components/store";
import { TabHeader } from "components/TabHeader";
import { useApps } from "hooks";
import { NextPageContext } from "next";
import Head from "next/head";
import { App } from "ts";

const Apps = ({ initialApps }: { initialApps: App[] }) => {
  const { filteredApps, loading } = useApps(initialApps);

  return (
    <>
      <Head>
        <link rel="shortcut icon" href="favicon.ico" type="image/x-icon" />
      </Head>
      <TabHeader>Apps</TabHeader>
      <AppGrid>
        {!filteredApps.length ? (
          <NoAppsView hasApps={!!filteredApps.length}>
            No Apps uploaded yet.
          </NoAppsView>
        ) : (
          <>
            {filteredApps.map((app, i) => (
              <AppTile key={app._id} appInfo={app} />
            ))}
            <div className="full-grid-width">
              {loading && (
                <h2 className="loading">
                  Loading
                  <Loading size={60} />
                </h2>
              )}
            </div>
          </>
        )}
      </AppGrid>
    </>
  );
};

Apps.Layout = Layout;

Apps.getInitialProps = async (ctx: NextPageContext) => {
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/getAllApps?platform=all`,
      { headers: { api_key: process.env.NEXT_PUBLIC_API_KEY } }
    );
    const newApps = res.data.apps.filter(
      (app: App) => !app.categories.includes("games")
    );
    return { initialApps: newApps };
  } catch (err) {
    return { initialApps: [] };
  }
};

export default Apps;
