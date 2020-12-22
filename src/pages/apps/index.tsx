import { Layout } from 'components/layouts'
import Head from 'next/head'

const Apps: React.FC = () => {
    return (
        <>
            <Head>
                <title>Beta App Store</title>
                <link rel="shortcut icon" href="favicon.ico" type="image/x-icon" />
            </Head>
            <Layout>
                Hello
            </Layout>
        </>
    )
}

export default Apps