import { Layout } from 'components/layouts'
import { TabHeader } from 'components/TabHeader'
import { useSelectedTabValue } from 'context'
import Head from 'next/head'
import { useEffect } from 'react'

const Today = () => {
    const { setSelectedTab } = useSelectedTabValue()

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