import { ParsedUrlQuery } from "querystring";
import { AppRowCategory, gameRowCategories } from "ts";

const getCurrentCategoryFromRoute = (query: ParsedUrlQuery): AppRowCategory =>
  gameRowCategories.find(({ id }) => id === query.category) || null;

export default getCurrentCategoryFromRoute;
