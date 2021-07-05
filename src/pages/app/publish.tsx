import Head from "next/head";
import { NextPage } from "next";
import { InfoPageHeader } from "components/InfoPageHeader";
import { getTextColor } from "helpers";
import { theme } from "styles";
import { Footer } from "components/home";
import { PublishAppForm } from "components/forms";
import { TabHeader } from "components/TabHeader";
import { motion } from "framer-motion";
import styled from "styled-components";

const FormWrapper = styled.div`
  margin: 8em auto;
  width: clamp(1px, 90%, 550px);
  height: 550px;
`;

const PublishApp: NextPage = () => {
  return (
    <>
      <Head>
        <link
          rel="shortcut icon"
          href="favicons/favicon.ico"
          type="image/x-icon"
        />
        <title>Publish your own app | Testiply</title>
      </Head>
      <InfoPageHeader
        className="container-small"
        style={{
          color: getTextColor(theme.layoutContentBg),
        }}
      />
      <FormWrapper as={motion.div} animate>
        <TabHeader>Publish your app.</TabHeader>
        <PublishAppForm />
      </FormWrapper>
      <Footer />
    </>
  );
};

export default PublishApp;
