import { Layout } from 'components/layouts'
import { TabHeader } from 'components/TabHeader'
import Head from 'next/head'

const Today = () => {
    return (
        <>
            <Head>
                <link rel="shortcut icon" href="favicon.ico" type="image/x-icon" />
            </Head>
            <TabHeader>
                Today
            </TabHeader>
        </>
    )
}

Today.Layout = Layout

export default Today