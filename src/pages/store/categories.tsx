import { Layout } from 'components/layouts'
import { TabHeader } from 'components/TabHeader'
import { useSelectedTabValue } from 'context'
import Head from 'next/head'
import { useEffect } from 'react'

const Categories = () => {
    const { setSelectedTab } = useSelectedTabValue()

    useEffect(() => {
        setSelectedTab("categories")
    }, [])

    return (
        <>
            <Head>
                <link rel="shortcut icon" href="favicon.ico" type="image/x-icon" />
            </Head>
            <TabHeader>
                Categories
            </TabHeader>
        </>
    )
}
Categories.Layout = Layout


export default Categories