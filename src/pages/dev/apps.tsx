import { Layout } from "components/layouts"
import { TabHeader } from "components/TabHeader"
import Head from "next/head"

const DevApps = () => {
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
DevApps.Layout = Layout


export default DevApps