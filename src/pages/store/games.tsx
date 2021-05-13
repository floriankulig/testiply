import { AppGrid, Layout } from "components/layouts";
import { TabCurrentlyWorkedOn } from "components/store/TabCurrentlyWorkedOn";
import { BasePath, CustomPath, TabHeader } from "components/TabHeader";
import Head from "next/head";
import { GamesRows } from "components/store";
import { useGamesApps, useIsMobile } from "hooks";
import Link from "next/link";
import { CSSTransition } from "react-transition-group";
import { FiChevronLeft } from "react-icons/fi";

const Games = () => {
  const props = useGamesApps();
  const { selectedCategory } = props;

  const isMobile = useIsMobile(550);
  return (
    <>
      <Head>
        <link rel="shortcut icon" href="favicon.ico" type="image/x-icon" />
      </Head>
      <TabHeader>
        <Link href="/store/games">
          <BasePath
            aria-label="Reset selected category"
            tabIndex={-1}
            hasIcon={!!selectedCategory}
          >
            <CSSTransition
              in={!!selectedCategory}
              timeout={250}
              classNames="pop-in"
              unmountOnExit
              appear
            >
              <FiChevronLeft />
            </CSSTransition>
            Games
          </BasePath>
        </Link>
        <CSSTransition
          in={!!selectedCategory && !isMobile}
          timeout={300}
          classNames="fade-right"
          unmountOnExit
        >
          <div>
            <i>/</i>
            <CustomPath>{selectedCategory?.displayName}</CustomPath>
          </div>
        </CSSTransition>
      </TabHeader>
      <AppGrid>
        <TabCurrentlyWorkedOn />
      </AppGrid>
      {/* <GamesRows {...props} /> */}
    </>
  );
};

Games.Layout = Layout;

export default Games;
