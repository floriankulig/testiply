import Head from 'next/head'
import { Header, Hero, Features, Benefits, Footer } from "components/home"

const Home: React.FC = () => {
  return (
    <div id="page--home">
      <Head>
        <title>Beta App Store</title>
        <link rel="shortcut icon" href="favicon.ico" type="image/x-icon" />
      </Head>
      <Header></Header>
      <Hero></Hero>
      <Features></Features>
      {/*<Benefits></Benefits>
      <Footer></Footer> */}
    </div>
  )
}

export default Home