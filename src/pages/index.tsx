import Head from "next/head";
import { Hero, Features, Benefits, Footer } from "components/home";
import { InfoPageHeader } from "components/InfoPageHeader";
import { NextPage, NextPageContext } from "next";

interface HomeProps {
  wasLoggedIn: boolean;
}

const Home: NextPage<HomeProps> = ({ wasLoggedIn }) => {
  return (
    <>
      <Head>
        <title>Testiply - Test Beta Apps</title>
        <link rel="shortcut icon" href="favicon.ico" type="image/x-icon" />
      </Head>
      <InfoPageHeader className="container" hasLogoBackground={true} />
      <Hero wasLoggedIn={wasLoggedIn} />
      <Features />
      <Benefits />
      <Footer />
    </>
  );
};

Home.getInitialProps = ({ res, req }: NextPageContext) => {
  const wasLoggedIn = !!req?.headers.cookie?.slice(4);
  return { wasLoggedIn };
};

export default Home;
