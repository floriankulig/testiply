import { AppProps } from 'next/app'
import "scss/App.scss"

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (<Component {...pageProps} />)
}

export default MyApp
