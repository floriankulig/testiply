import { AppGrid, Layout } from "components/layouts";
import { Loading } from "components/Loading";
import { AppTile, NoAppsView } from "components/store";
import { TabHeader } from "components/TabHeader";
import { useApps } from "hooks";
import Head from "next/head";

const Apps = () => {
  const { filteredApps, loading } = useApps();

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
              <AppTile
                key={app._id}
                style={{ animationDelay: `${i * 15}ms` }}
                appInfo={app}
              />
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

export default Apps;
