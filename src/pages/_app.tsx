import { AppProps } from 'next/app'
import "scss/base/globals.scss"

const MyApp = ({ Component, pageProps }: AppProps) => {
  return <Component {...pageProps} />
}

export default MyApp
