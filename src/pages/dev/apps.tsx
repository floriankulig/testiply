import axios from "axios";
import { DevAuthorisation } from "components/auth";
import { DevAppsRows } from "components/dev";
import { AppGrid, Layout } from "components/layouts";
import { NoAppsView } from "components/store";
import { TabHeader } from "components/TabHeader";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import Head from "next/head";
import { App } from "ts";

interface DevAppsProps {
  apps: App[];
  hasUser: boolean;
  isDev: boolean;
}

const DevApps = ({ apps, hasUser, isDev }: DevAppsProps) => {
  return (
    <DevAuthorisation>
      <Head>
        <link rel="shortcut icon" href="favicon.ico" type="image/x-icon" />
      </Head>
      <TabHeader>Your Apps</TabHeader>
      {!apps ? (
        <AppGrid>
          <NoAppsView hasApps={false}>No apps yet</NoAppsView>
        </AppGrid>
      ) : (
        <DevAppsRows apps={apps} />
      )}
    </DevAuthorisation>
  );
};
DevApps.Layout = Layout;

export const getServerSideProps: GetServerSideProps = async ({
  req,
  res,
}: GetServerSidePropsContext) => {
  const uid = req?.headers.cookie?.toString().slice(4);
  const config = { headers: { api_key: process.env.NEXT_PUBLIC_API_KEY } };
  if (res && !uid) {
    res.writeHead(302, { Location: "/login" });
    res.end();
    return { props: {} };
  }
  let apps: App[] = [];
  let isDev: boolean = true;
  try {
    const apiRes = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/dev/getApps`,
      { devId: uid },
      config
    );
    apps = apiRes.data.apps;
  } catch (err) {
    if (res && err.response.data.err === "User is not a Developer.") {
      isDev = false;
    } else if (err.response.data.err === "No Apps found.") {
      apps = undefined;
    }
  }

  return {
    props: {
      apps,
      hasUser: !!uid,
      isDev,
    },
  };
};

export default DevApps;
