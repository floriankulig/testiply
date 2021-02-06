import { Layout } from "components/layouts";
import { BasePath, CustomPath, TabHeader } from "components/TabHeader";
import { FiChevronLeft } from "react-icons/fi";
import Head from "next/head";
import { App, categories } from "ts";
import { CategoryChip, CategoryGrid } from "components/store/categories";
import Link from "next/link";
import { useCategory } from "hooks";
import { CSSTransition } from "react-transition-group";
import { useEffect, useState } from "react";
import { useFiltersValue } from "context";
import { Loading } from "components/Loading";

const Categories = () => {
  const { selectedCategory, loading, apps } = useCategory();
  const { searchQuery } = useFiltersValue();
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
            >
              <FiChevronLeft />
            </CSSTransition>
            Categories
          </BasePath>
        </Link>
        <CSSTransition
          in={!!selectedCategory}
          timeout={300}
          classNames="fade-right"
          unmountOnExit
        >
          <i>/</i>
        </CSSTransition>
        <CSSTransition
          in={!!selectedCategory}
          timeout={300}
          classNames="fade-right"
          unmountOnExit
        >
          <CustomPath>{selectedCategory?.displayName}</CustomPath>
        </CSSTransition>
      </TabHeader>
      <CategoryGrid>
        {!selectedCategory ? (
          categories?.map((category, i) => (
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
                style={{ animationDelay: `${i * 25}ms` }}
                aria-label={`Select ${category.displayName} as the current category.`}
              >
                <category.icon />
                {category.displayName}
              </CategoryChip>
            </Link>
          ))
        ) : loading ? (
          <h2 className="loading">
            Loading
            <Loading size={60} />
          </h2>
        ) : (
          filteredApps.map((app) => <li key={app._id}>{app.name}</li>)
        )}
      </CategoryGrid>
    </>
  );
};
Categories.Layout = Layout;

export default Categories;
