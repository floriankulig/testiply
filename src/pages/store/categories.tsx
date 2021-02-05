import { Layout } from "components/layouts";
import { BasePath, CustomPath, TabHeader } from "components/TabHeader";
import { FiChevronLeft } from "react-icons/fi";
import Head from "next/head";
import { categories } from "ts";
import { CategoryChip, CategoryGrid } from "components/store/categories";
import { testerTabNames } from "ts/constants";
import Link from "next/link";
import { useSelectedTabValue } from "context";
import { useCategory } from "hooks";
import { CSSTransition } from "react-transition-group";

const Categories = () => {
  const { selectedCategory, setSelectedCategory, apps } = useCategory(null);

  return (
    <>
      <Head>
        <link rel="shortcut icon" href="favicon.ico" type="image/x-icon" />
      </Head>
      <TabHeader>
        <BasePath
          onClick={() => setSelectedCategory(null)}
          onKeyDown={() => setSelectedCategory(null)}
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
        {!selectedCategory
          ? categories?.map((category, i) => {
              if (testerTabNames.includes(category.id))
                //if we got a tab with the same name as the current category e.g. games, then link to that tab in the store
                return (
                  <Link href={`/store/${category.id}`} key={category.id}>
                    <CategoryChip
                      style={{ animationDelay: `${i * 25}ms` }}
                      tabIndex={0}
                      aria-label={`Select ${category.displayName} as the current category.`}
                    >
                      {category.displayName}
                    </CategoryChip>
                  </Link>
                );
              return (
                <CategoryChip
                  key={category.id}
                  onClick={() => setSelectedCategory(category)}
                  onKeyDown={() => setSelectedCategory(category)}
                  tabIndex={0}
                  style={{ animationDelay: `${i * 25}ms` }}
                  aria-label={`Select ${category.displayName} as the current category.`}
                >
                  {category.displayName}
                </CategoryChip>
              );
            })
          : apps?.map((app) => <li>{app.name}</li>)}
      </CategoryGrid>
    </>
  );
};
Categories.Layout = Layout;

export default Categories;
