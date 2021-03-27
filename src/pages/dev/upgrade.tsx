import Head from "next/head";
import { NextPage, NextPageContext } from "next";
import { InfoPageHeader } from "components/InfoPageHeader";
import { getTextColor } from "helpers";
import { theme } from "styles";
import { Footer } from "components/home";
import { motion } from "framer-motion";
import styled from "styled-components";
import { DevAuthForm } from "components/auth";
import { useRouter } from "next/router";
import { useAuthValue } from "context";

interface DevUpgradeProps {
  hasUser: boolean;
}

const FormWrapper = styled.div`
  margin: 8em auto;
  width: clamp(1px, 90%, 700px);
`;

const DevUpgrade: NextPage<DevUpgradeProps> = ({ hasUser }) => {
  const router = useRouter();
  const { currentUser } = useAuthValue();
  // Make sure we're in the browser
  if (typeof window !== "undefined" && !currentUser) {
    router.push("/login");
  }
  return (
    <>
      <Head>
        <link
          rel="shortcut icon"
          href="favicons/favicon.ico"
          type="image/x-icon"
        />
        <title>Upgrade to a publisher account | Testiply</title>
      </Head>
      <InfoPageHeader
        className="container-small"
        style={{
          color: getTextColor(theme.layoutContentBg),
        }}
      />
      <FormWrapper as={motion.div} animate>
        <DevAuthForm hasUserRegistered={!!currentUser} />
      </FormWrapper>
      <Footer />
    </>
  );
};

DevUpgrade.getInitialProps = ({ res, req }: NextPageContext) => {
  const hasUser = !!req?.headers.cookie?.slice(3);
  if (res && !hasUser) {
    res.writeHead(302, { Location: "/login" });
    res.end();
  }
  return { hasUser };
};

export default DevUpgrade;
