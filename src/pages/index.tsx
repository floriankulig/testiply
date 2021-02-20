import Head from "next/head";
import { Hero, Features, Benefits, Footer, NewsLetter } from "components/home";
import { InfoPageHeader } from "components/InfoPageHeader";
import { NextPage } from "next";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Testiply</title>
        <link rel="shortcut icon" href="favicon.ico" type="image/x-icon" />
      </Head>
      <InfoPageHeader className="container" hasLogoBackground={true} />
      <Hero />
      <Features />
      <Benefits />
      <NewsLetter />
      <Footer />
    </>
  );
};

export default Home;
