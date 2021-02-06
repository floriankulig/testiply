import { ParsedUrlQuery } from "querystring";
import { categories, Category } from "ts";

const getCurrentCategoryFromRoute = (query: ParsedUrlQuery): Category =>
  categories.find(({ id }) => id === query.category) || null;

export default getCurrentCategoryFromRoute;
