import { SelectedTabProvider } from 'context'
import { AppProps } from 'next/app'
import Head from 'next/head'
import { ThemeProvider } from 'styled-components'
import { GlobalStyle, theme } from "styles"

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Head>
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap" rel="stylesheet" />
      </Head>
      <ThemeProvider theme={theme}>
        <SelectedTabProvider>
          <GlobalStyle />
          <Component {...pageProps} />
        </SelectedTabProvider>
      </ThemeProvider>
    </>
  )
}

export default MyApp
