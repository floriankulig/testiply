import { AppGrid, Layout } from "components/layouts";
import { TabCurrentlyWorkedOn } from "components/store/TabCurrentlyWorkedOn";
import { TabHeader } from "components/TabHeader";
import Head from "next/head";

const DevDashboard = () => {
  return (
    <>
      <Head>
        <link rel="shortcut icon" href="favicon.ico" type="image/x-icon" />
      </Head>
      <TabHeader>Dashboard</TabHeader>
      <AppGrid>
        <TabCurrentlyWorkedOn />
      </AppGrid>
    </>
  );
};
DevDashboard.Layout = Layout;

export default DevDashboard;
