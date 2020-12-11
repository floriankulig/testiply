import Head from 'next/head'
import { Content, Footer, Header } from "components/home"
import styles from "scss/pages/home.module.scss"

const Home: React.FC = () => {
  return (
    <div className={styles.Home}>
      <Head>
        <title>Beta App Store</title>
        <link rel="shortcut icon" href="favicon.ico" type="image/x-icon" />
      </Head>
      <Header />
      <Content />
      <Footer />
    </div>
  )
}

export default Home