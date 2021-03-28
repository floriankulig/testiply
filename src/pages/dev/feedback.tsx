import axios from "axios";
import { Layout } from "components/layouts";
import { TabHeader } from "components/TabHeader";
import { useAuthValue } from "context";
import { NextPageContext } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { Feedback } from "ts";

interface DevFeedbackProps {
  feedbacks: Feedback[];
}

const DevFeedback = ({ feedbacks }: DevFeedbackProps) => {
  const router = useRouter();
  const { currentUser } = useAuthValue();
  useEffect(() => {
    if (typeof window !== "undefined") {
      if (!currentUser) {
        router.push("/login");
      } else if (!currentUser.isDev) {
        router.push("/dev/upgrade");
      }
    }
  }, [currentUser]);
  return (
    <>
      <Head>
        <link rel="shortcut icon" href="favicon.ico" type="image/x-icon" />
      </Head>
      <TabHeader>Your Latest Feedbacks</TabHeader>
    </>
  );
};
DevFeedback.Layout = Layout;

DevFeedback.getInitialProps = async ({
  req,
  res,
}: NextPageContext): Promise<any> => {
  const uid = req?.headers.cookie?.slice(4);
  console.log({ uid });

  const config = { headers: { api_key: process.env.NEXT_PUBLIC_API_KEY } };
  if (res && !uid) {
    res.writeHead(302, { Location: "/login" });
    res.end();
    return;
  }
  console.log("hasUser");
  let feedbacks: Feedback[] = [];
  try {
    const apiRes = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/dev/getFeedbacks`,
      { devId: uid },
      config
    );
    feedbacks = apiRes.data.feedbacks;
    console.log({ feedbacks });
  } catch (err) {
    console.log(err.response.data);
    if (res && err.response.data.err === "User is not a Developer.") {
      res.writeHead(302, { Location: "/dev/upgrade" });
      res.end();
      return;
    } else if (err.response.data.err === "No Feedbacks found.") {
      console.log("No feedbacks");
      feedbacks = undefined;
    }
  }
  return {
    feedbacks,
  };
};

export default DevFeedback;
