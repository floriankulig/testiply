import Head from 'next/head'
import { Content, Footer, Header } from "components/home"

const Home: React.FC = () => {
  return (
    <>
      <Head>
        <title>Beta App Store</title>
        <link rel="shortcut icon" href="favicon.ico" type="image/x-icon" />
      </Head>
      <Header />
      <Content />
      {/* <Footer /> */}
    </>
  )
}

export default Home