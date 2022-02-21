import { IconType } from "react-icons/lib";

export type PlatformID =
  | "ios"
  | "android"
  | "windows"
  | "ipados"
  | "linux"
  | "web"
  | "all";

export interface Platform {
  id: PlatformID;
  displayName: string;
}

export interface DescriptiveObj {
  id: string;
  displayName: string;
}

export type CategoryID =
  | "education"
  | "finances"
  | "graphicsAndDesign"
  | "music"
  | "productivity"
  | "socialMedia"
  | "entertainment"
  | "utilities"
  | "photoAndVideo"
  | "travel"
  | "games"
  | "weather"
  | "developerTools"
  | "healthAndFitness"
  | "news"
  | "addons"
  | "sport";

export interface Category {
  id: CategoryID;
  icon: IconType;
  displayName: string;
  color?: string;
}

export type InputType = "email" | "password";
export type FormType = "login" | "register" | "dev_register";

export interface App {
  name: string;
  description: string;
  platforms: PlatformID[];
  categories: CategoryID[];
  rating: {
    total: number;
    amount: number;
    5: number;
    4: number;
    3: number;
    2: number;
    1: number;
  };
  downloads: number;
  date: string;
  devId: string; // dev/dev_id
  devName: string;
  devWebsite: string;
  testflightIos?: string;
  testflightIpados?: string;
  website?: string;
  isSample?: boolean;
  _id: string;
}

export interface User {
  mail: string;
  isDev: boolean;
  _id: string;
  downloadedApps: Array<{
    id: string;
    hasLeftFeedback: boolean;
  }>;
  website: string;
  name: string;
}

export type AppPreview = Readonly<
  Pick<App, "name" | "description" | "_id" | "devName" | "rating">
>;

interface TodayAppWidgets {
  heading: string;
  opensLongDescription: boolean;
  _id: string;
  apps: App[];
}

export interface Feedback {
  heading: string;
  text: string;
  date: string;
  rating: number;
  appId: string;
  appName: string;
  _id: string;
}
export type AppRowCategoryID = "latest" | "rating" | "downloads";
export interface AppRowCategory {
  id: AppRowCategoryID;
  displayName: "Latest" | "Best Rating" | "Most Downloads";
  icon: IconType;
}
export interface GameRowApps {
  latest: App[];
  rating: App[];
  downloads: App[];
}

export type UserType = "tester" | "dev";
