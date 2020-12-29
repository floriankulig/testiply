import { SelectedTabProvider } from 'context'
import { AppProps } from 'next/app'
import Head from 'next/head'
import { ThemeProvider } from 'styled-components'
import { GlobalStyle, theme } from "styles"


interface EmptyLayoutProps {
  children: React.ReactNode;
}
const EmptyLayout: React.FC<EmptyLayoutProps> = ({ children }) => <>{children}</>

const MyApp = ({ Component, pageProps }: any) => {

  const Layout = Component.Layout || EmptyLayout

  return (
    <>
      <Head>
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap" rel="stylesheet" />
      </Head>
      <ThemeProvider theme={theme}>
        <SelectedTabProvider>
          <Layout>
            <GlobalStyle />
            <Component {...pageProps} />
          </Layout>
        </SelectedTabProvider>
      </ThemeProvider>
    </>
  )
}

export default MyApp
