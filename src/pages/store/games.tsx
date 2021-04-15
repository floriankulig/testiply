import { AppGrid, Layout } from "components/layouts";
import { TabCurrentlyWorkedOn } from "components/store/TabCurrentlyWorkedOn";
import { TabHeader } from "components/TabHeader";
import Head from "next/head";
import { GamesRows } from "components/store";

const Games = () => {
  return (
    <>
      <Head>
        <link rel="shortcut icon" href="favicon.ico" type="image/x-icon" />
      </Head>
      <TabHeader>Games</TabHeader>
      <AppGrid>
        <TabCurrentlyWorkedOn />
      </AppGrid>
      {/* <GamesRows /> */}
    </>
  );
};

Games.Layout = Layout;

export default Games;
