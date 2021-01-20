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
        <link rel="apple-touch-icon" sizes="180x180" href="favicons/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="favicons/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="favicons/favicon-16x16.png" />
        <link rel="manifest" href="favicons/site.webmanifest" />
        <link rel="mask-icon" href="favicons/safari-pinned-tab.svg" color="#6b1ef1" />
        <link rel="shortcut icon" href="favicons/favicon.ico" />
        <meta name="msapplication-TileColor" content="#603cba" />
        <meta name="msapplication-config" content="favicons/browserconfig.xml" />
        <meta name="theme-color" content="#ffffff" />
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
