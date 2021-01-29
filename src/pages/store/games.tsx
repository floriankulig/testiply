import { Layout } from 'components/layouts'
import { TabHeader } from 'components/TabHeader'
import { useSelectedTabValue } from 'context'
import Head from 'next/head'

const Games = () => {
    const { setSelectedTab } = useSelectedTabValue()

    return (
        <>
            <Head>
                <link rel="shortcut icon" href="favicon.ico" type="image/x-icon" />
            </Head>
            <TabHeader>
                Games
            </TabHeader>
        </>
    )
}

Games.Layout = Layout

export default Games