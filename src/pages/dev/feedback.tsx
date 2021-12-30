import axios from "axios";
import { FeedbackTile } from "components/appDetail";
import { DevAuthorisation } from "components/auth";
import { AppGrid, Layout } from "components/layouts";
import { NoAppsView } from "components/store";
import { TabHeader } from "components/TabHeader";
import { useFiltersValue } from "context";
import { AnimatePresence } from "framer-motion";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import Head from "next/head";
import { Feedback } from "ts";

interface DevFeedbackProps {
  feedbacks: Feedback[];
  hasUser: boolean;
  isDev: boolean;
}

const DevFeedback = ({ feedbacks, hasUser, isDev }: DevFeedbackProps) => {
  const { searchQuery } = useFiltersValue();

  const correspondsToSearch = ({
    heading,
    rating,
    text,
    appName,
  }: Feedback): boolean =>
    heading.toLowerCase().includes(searchQuery.toLowerCase()) ||
    appName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    rating.toString() === searchQuery.toLowerCase() ||
    text.toLowerCase().includes(searchQuery.toLowerCase())
      ? true
      : false;

  return (
    <DevAuthorisation serverSideLoggedIn={hasUser} serverSideDev={isDev}>
      <Head>
        <link rel="shortcut icon" href="favicon.ico" type="image/x-icon" />
      </Head>
      <TabHeader>Your Latest Feedbacks</TabHeader>
      <AppGrid>
        <AnimatePresence>
          {feedbacks?.map(
            (feedback) =>
              correspondsToSearch(feedback) && (
                <FeedbackTile key={feedback._id} feedback={feedback} />
              )
          )}
        </AnimatePresence>
        <div className="full-grid-width separator"></div>
        {!feedbacks && (
          <NoAppsView hasApps={false}>
            No feedbacks for your apps yet ...
          </NoAppsView>
        )}
      </AppGrid>
    </DevAuthorisation>
  );
};
DevFeedback.Layout = Layout;

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
  let feedbacks: Feedback[] = [];
  let isDev: boolean = true;
  try {
    const apiRes = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/dev/getFeedbacks`,
      { devId: uid },
      config
    );
    feedbacks = apiRes.data.feedbacks;
  } catch (err) {
    if (res && err.response.data.err === "User is not a Developer.") {
      isDev = false;
    } else if (err.response.data.err === "No Feedbacks found.") {
      feedbacks = undefined;
    }
  }
  return {
    props: {
      feedbacks,
      hasUser: !!uid,
      isDev,
    },
  };
};

export default DevFeedback;
