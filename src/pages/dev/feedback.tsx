import axios from "axios";
import { FeedbackTile } from "components/appDetail";
import { AppGrid, Layout } from "components/layouts";
import { TabHeader } from "components/TabHeader";
import { useAuthValue, useFiltersValue } from "context";
import { AnimatePresence } from "framer-motion";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Feedback } from "ts";

interface DevFeedbackProps {
  feedbacks: Feedback[];
  hasUser: boolean;
  isDev: boolean;
}

const DevFeedback = ({ feedbacks, hasUser, isDev }: DevFeedbackProps) => {
  const router = useRouter();
  const { currentUser } = useAuthValue();
  const { searchQuery } = useFiltersValue();

  useEffect(() => {
    console.log({ hasUser });
    if (typeof window !== "undefined") {
      if (!!currentUser) {
        if (!currentUser.isDev) {
          router.push("/dev/upgrade");
        }
      } else {
        if (!hasUser) {
          router.push("/login");
        } else if (!isDev) {
          router.push("/dev/upgrade");
        }
      }
    }
  }, [currentUser]);

  const correspondsToSearch = ({ heading, rating, text }: Feedback): boolean =>
    heading.toLowerCase().includes(searchQuery.toLowerCase()) ||
    rating.toString() === searchQuery.toLowerCase() ||
    text.toLowerCase().includes(searchQuery.toLowerCase())
      ? true
      : false;

  return (
    <>
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
      </AppGrid>
    </>
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
    return;
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
