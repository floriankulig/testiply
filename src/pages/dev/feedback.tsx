import { Layout } from "components/layouts"
import { TabHeader } from "components/TabHeader"
import { useSelectedTabValue } from "context"
import Head from "next/head"
import { useEffect } from "react"

const DevFeedback = () => {
    const { setSelectedTab } = useSelectedTabValue()

    useEffect(() => {
        setSelectedTab("feedback")
    }, [])

    return (
        <>
            <Head>
                <link rel="shortcut icon" href="favicon.ico" type="image/x-icon" />
            </Head>
            <TabHeader>
                Feedback
            </TabHeader>
        </>
    )
}
DevFeedback.Layout = Layout


export default DevFeedback