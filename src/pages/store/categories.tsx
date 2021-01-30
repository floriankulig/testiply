import { Layout } from 'components/layouts'
import { TabHeader } from 'components/TabHeader'
import Head from 'next/head'

const Categories = () => {
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