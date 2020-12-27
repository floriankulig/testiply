import { Layout } from 'components/layouts'
import { SelectedTabProvider } from 'context'
import { NextPage } from 'next'
import Head from 'next/head'

const Apps: NextPage = () => {
    return (
        <>
            <Head>
                <link rel="shortcut icon" href="favicon.ico" type="image/x-icon" />
            </Head>
            <SelectedTabProvider>

                <Layout>
                    Hello
            </Layout>
            </SelectedTabProvider>
        </>
    )
}


export default Apps