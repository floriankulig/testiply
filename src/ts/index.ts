import {
  Category,
  Platform,
  CategoryID,
  UserType,
  InputType,
  FormType,
  App,
} from "./types";

import { platforms, categories } from "./constants";

export interface User {
  email: string;
  is_dev: boolean;
  _id: string;
}

export { platforms, categories };
export type {
  Category,
  Platform,
  CategoryID,
  UserType,
  InputType,
  FormType,
  App,
};
