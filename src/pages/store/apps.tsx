import { Layout } from 'components/layouts'
import { useSelectedTabValue } from 'context'
import { NextPage } from 'next'
import Head from 'next/head'
import { useEffect } from 'react'

const Apps: NextPage = () => {
    const { setSelectedTab } = useSelectedTabValue()

    useEffect(() => {
        setSelectedTab("apps")
    }, [])

    return (
        <>
            <Head>
                <link rel="shortcut icon" href="favicon.ico" type="image/x-icon" />
            </Head>
            <Layout>
                Apps
            </Layout>
        </>
    )
}

export default Apps
