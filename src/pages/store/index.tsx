import { Layout } from 'components/layouts'
import { NextPage } from 'next'
import Head from 'next/head'

const Apps: NextPage = () => {
    return (
        <>
            <Head>
                <link rel="shortcut icon" href="favicon.ico" type="image/x-icon" />
            </Head>
            <Layout>
                Hello
            </Layout>
        </>
    )
}


export default Apps