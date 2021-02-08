import { Layout, AppGrid } from "components/layouts";
import { BasePath, CustomPath, TabHeader } from "components/TabHeader";
import { FiChevronLeft } from "react-icons/fi";
import Head from "next/head";
import { App, categories } from "ts";
import { CategoryChip } from "components/store/categories";
import Link from "next/link";
import { useCategory, useIsMobile } from "hooks";
import { CSSTransition } from "react-transition-group";
import { useEffect, useState } from "react";
import { useFiltersValue } from "context";
import { Loading } from "components/Loading";
import { NoAppsView } from "components/store";
import { MenuTransition } from "components/MenuTransition";

const Categories = () => {
  const { selectedCategory, loading, apps } = useCategory();
  const { searchQuery } = useFiltersValue();
  const isMobile = useIsMobile(550);
  const [filteredApps, setFilteredApps] = useState<App[]>(apps);

  useEffect(() => {
    const newApps = searchQuery
      ? apps?.filter((app) =>
          app.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
      : apps;

    if (JSON.stringify(newApps) !== JSON.stringify(filteredApps))
      setFilteredApps(newApps);
  }, [searchQuery, apps]);

  return (
    <>
      <Head>
        <link rel="shortcut icon" href="favicon.ico" type="image/x-icon" />
      </Head>
      <TabHeader>
        <Link href="/store/categories">
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
            Categories
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
      <MenuTransition>
        <CSSTransition
          in={!selectedCategory}
          classNames="menu-primary"
          timeout={400}
          unmountOnExit
          appear
        >
          <AppGrid>
            {categories?.map((category, i) => (
              <Link
                href={
                  category.id === "games"
                    ? "/store/games"
                    : `/store/categories?category=${category.id}`
                }
                key={category.id}
              >
                <CategoryChip
                  key={category.id}
                  tabIndex={0}
                  style={{ animationDelay: `${i * 15}ms` }}
                  color={category.color}
                  aria-label={`Select ${category.displayName} as the current category.`}
                >
                  <category.icon />
                  {category.displayName}
                </CategoryChip>
              </Link>
            ))}
          </AppGrid>
        </CSSTransition>
        <CSSTransition
          in={!!selectedCategory}
          classNames="menu-secondary"
          timeout={400}
          unmountOnExit
        >
          <AppGrid>
            {loading ? (
              <h2 className="loading">
                Loading
                <Loading size={60} />
              </h2>
            ) : !filteredApps[0] ? (
              <NoAppsView hasApps={!!apps[0]} />
            ) : (
              filteredApps.map((app, i) => (
                <li key={app._id} style={{ animationDelay: `${i * 15}ms` }}>
                  {app.name}
                </li>
              ))
            )}
          </AppGrid>
        </CSSTransition>
      </MenuTransition>
    </>
  );
};
Categories.Layout = Layout;

export default Categories;
