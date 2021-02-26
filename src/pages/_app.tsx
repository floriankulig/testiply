import { AuthProvider, SelectedTabProvider } from "context";
import { CookiesProvider } from "react-cookie";
import { Layout as StoreLayout } from "components/layouts/Layout";
import Head from "next/head";
import { ThemeProvider } from "styled-components";
import { GlobalStyle, theme } from "styles";
import { AnimateSharedLayout } from "framer-motion";
import { useEffect } from "react";
import axios from "axios";

interface EmptyLayoutProps {
  children: React.ReactNode;
}
const EmptyLayout: React.FC<EmptyLayoutProps> = ({ children }) => (
  <>{children}</>
);

const MyApp = ({ Component, pageProps }: any) => {
  const Layout = Component.Layout || EmptyLayout;

  useEffect(() => {
    axios.defaults.headers.common["api_key"] = process.env.API_KEY;
  }, []);

  return (
    <>
      <Head>
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap"
          rel="stylesheet"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="favicons/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="favicons/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="favicons/favicon-16x16.png"
        />
        <link rel="manifest" href="favicons/site.webmanifest" />
        <link
          rel="mask-icon"
          href="favicons/safari-pinned-tab.svg"
          color="#2262b6"
        />
        <link rel="shortcut icon" href="favicons/favicon.ico" />
        <meta name="msapplication-TileColor" content="#603cba" />
        <meta
          name="msapplication-TileImage"
          content="favicons/mstile-144x144.png"
        />
        <meta
          name="msapplication-config"
          content="favicons/browserconfig.xml"
        />
        <meta name="theme-color" content="#2262b6" />
      </Head>
      <ThemeProvider theme={theme}>
        <CookiesProvider>
          <AuthProvider>
            <AnimateSharedLayout type="crossfade">
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
            </AnimateSharedLayout>
          </AuthProvider>
        </CookiesProvider>
      </ThemeProvider>
    </>
  );
};

export default MyApp;
