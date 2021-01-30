import { Layout } from 'components/layouts'
import { TabHeader } from 'components/TabHeader'
import Head from 'next/head'

const Games = () => {
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