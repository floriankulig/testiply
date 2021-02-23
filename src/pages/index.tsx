import Head from "next/head";
import { Hero, Features, Benefits, Footer } from "components/home";
import { InfoPageHeader } from "components/InfoPageHeader";
import { NextPage } from "next";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Testiply - Test Beta Apps</title>
        <link rel="shortcut icon" href="favicon.ico" type="image/x-icon" />
      </Head>
      <InfoPageHeader className="container" hasLogoBackground={true} />
      <Hero />
      <Features />
      <Benefits />
      <Footer />
    </>
  );
};

export default Home;
