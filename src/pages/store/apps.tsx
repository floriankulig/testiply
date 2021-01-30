import { Layout } from 'components/layouts'
import { TabHeader } from 'components/TabHeader'
import Head from 'next/head'

const Apps = () => {
    return (
        <>
            <Head>
                <link rel="shortcut icon" href="favicon.ico" type="image/x-icon" />
            </Head>
            <TabHeader>
                Apps
            </TabHeader>
        </>
    )
}

Apps.Layout = Layout


export default Apps
