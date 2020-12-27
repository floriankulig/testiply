import { Layout } from 'components/layouts'
import { useSelectedTabValue } from 'context'
import { NextPage } from 'next'
import Head from 'next/head'
import { useEffect } from 'react'

const Games: NextPage = () => {
    const { setSelectedTab } = useSelectedTabValue()

    useEffect(() => {
        setSelectedTab("games")
    }, [])

    return (
        <>
            <Head>
                <link rel="shortcut icon" href="favicon.ico" type="image/x-icon" />
            </Head>
            <Layout>
                Games
            </Layout>
        </>
    )
}

export default Games