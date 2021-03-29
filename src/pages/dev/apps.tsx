import { AppGrid, Layout } from "components/layouts";
import { TabCurrentlyWorkedOn } from "components/store/TabCurrentlyWorkedOn";
import { TabHeader } from "components/TabHeader";
import Head from "next/head";

const DevApps = () => {
  return (
    <>
      <Head>
        <link rel="shortcut icon" href="favicon.ico" type="image/x-icon" />
      </Head>
      <TabHeader>Apps</TabHeader>
      <AppGrid>
        <TabCurrentlyWorkedOn />
      </AppGrid>
    </>
  );
};
DevApps.Layout = Layout;

export default DevApps;
