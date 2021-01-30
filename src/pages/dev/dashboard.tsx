import { Layout } from "components/layouts"
import { TabHeader } from "components/TabHeader"
import Head from "next/head"

const DevDashboard = () => {
    return (
        <>
            <Head>
                <link rel="shortcut icon" href="favicon.ico" type="image/x-icon" />
            </Head>
            <TabHeader>
                Dashboard
            </TabHeader>
        </>
    )
}
DevDashboard.Layout = Layout


export default DevDashboard