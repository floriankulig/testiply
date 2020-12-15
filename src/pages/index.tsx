import Head from 'next/head'
import { Header, Hero, Features, Benefits, Footer, NewsLetter } from "components/home"

const Home: React.FC = () => {
  return (
    <>
      <Head>
        <title>Beta App Store</title>
        <link rel="shortcut icon" href="favicon.ico" type="image/x-icon" />
      </Head>
      <Header />
      <Hero />
      <Features />
      <Benefits />
      <NewsLetter />
      <Footer />
    </>
  )
}

export default Home