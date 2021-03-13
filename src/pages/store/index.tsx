import { Layout } from "components/layouts";
import { TabHeader } from "components/TabHeader";
import { NextPageContext } from "next";
import Head from "next/head";
import { useRouter } from "next/router";

const Today = () => {
  const router = useRouter();
  // Make sure we're in the browser
  if (typeof window !== "undefined") {
    router.push("/store/categories");
  }
  return (
    <>
      <Head>
        <link rel="shortcut icon" href="favicon.ico" type="image/x-icon" />
      </Head>
      <TabHeader>Today</TabHeader>
    </>
  );
};

Today.Layout = Layout;

Today.getInitialProps = (ctx: NextPageContext) => {
  if (ctx.res) {
    ctx.res.writeHead(302, { Location: "/store/categories" });
    ctx.res.end();
  }
  return {};
};

export default Today;
