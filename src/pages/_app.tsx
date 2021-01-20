import { AuthProvider, SelectedTabProvider } from 'context'
import { Layout as StoreLayout } from "components/layouts/Layout"
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
        <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
      </Head>
      <ThemeProvider theme={theme}>
        <AuthProvider>
          {Layout === StoreLayout ? (
            <SelectedTabProvider>
              <Layout>
                <GlobalStyle />
                <Component {...pageProps} />
              </Layout>
            </SelectedTabProvider>
          ) : (
              <Layout>
                <GlobalStyle />
                <Component {...pageProps} />
              </Layout>
            )}
        </AuthProvider>
      </ThemeProvider>
    </>
  )
}

export default MyApp
