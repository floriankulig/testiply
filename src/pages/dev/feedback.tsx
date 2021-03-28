import { Layout } from "components/layouts";
import { TabHeader } from "components/TabHeader";
import Head from "next/head";

const DevFeedback = () => {
  return (
    <>
      <Head>
        <link rel="shortcut icon" href="favicon.ico" type="image/x-icon" />
      </Head>
      <TabHeader>Feedback</TabHeader>
    </>
  );
};
DevFeedback.Layout = Layout;

export default DevFeedback;
