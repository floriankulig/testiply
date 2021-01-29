import { Layout } from "components/layouts"
import { TabHeader } from "components/TabHeader"
import { useSelectedTabValue } from "context"
import Head from "next/head"
import { useEffect } from "react"

const DevDashboard = () => {
    const { setSelectedTab } = useSelectedTabValue()

    useEffect(() => {
        setSelectedTab("dashboard")
    }, [])

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