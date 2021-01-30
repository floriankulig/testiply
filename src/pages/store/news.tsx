import { Layout } from 'components/layouts'
import { TabHeader } from 'components/TabHeader'
import Head from 'next/head'

const News = () => {
    return (
        <>
            <Head>
                <link rel="shortcut icon" href="favicon.ico" type="image/x-icon" />
            </Head>
            <TabHeader>
                News
            </TabHeader>
        </>
    )
}

News.Layout = Layout

export default News
