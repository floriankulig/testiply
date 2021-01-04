import { Layout } from 'components/layouts'
import { TabHeader } from 'components/TabHeader'
import { useSelectedTabValue } from 'context'
import Head from 'next/head'
import { useEffect } from 'react'

const News = () => {
    const { setSelectedTab } = useSelectedTabValue()

    useEffect(() => {
        setSelectedTab("news")
    }, [])

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
