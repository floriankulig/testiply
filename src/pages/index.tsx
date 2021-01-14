import Head from 'next/head'
import { Hero, Features, Benefits, Footer, NewsLetter } from "components/home"
import { InfoPageHeader } from "components/InfoPageHeader"
import { NextPage } from 'next'

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Beta App Store</title>
        <link rel="shortcut icon" href="favicon.ico" type="image/x-icon" />
      </Head>
      <InfoPageHeader className="container" />
      <Hero />
      <Features />
      <Benefits />
      <NewsLetter />
      <Footer />
    </>
  )
}

export default Home