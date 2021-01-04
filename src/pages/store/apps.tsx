import { Layout } from 'components/layouts'
import { TabHeader } from 'components/TabHeader'
import { useSelectedTabValue } from 'context'
import Head from 'next/head'
import { useEffect } from 'react'

const Apps = () => {
    const { setSelectedTab } = useSelectedTabValue()

    useEffect(() => {
        setSelectedTab("apps")
    }, [])

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
