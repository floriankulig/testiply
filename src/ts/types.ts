import { IconType } from "react-icons/lib";

export type PlatformID =
  | "ios"
  | "android"
  | "windows"
  | "macos"
  | "linux"
  | "all";

export interface Platform {
  id: PlatformID;
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
  | "lifestyle"
  | "travel"
  | "games"
  | "weather"
  | "developerTools"
  | "healthAndFitness"
  | "medicine"
  | "news"
  | "referenceBooks"
  | "addons"
  | "sport"
  | "economy";

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
  screenshots: string[];
  rating: number;
  downloads: number;
  devId: number; // dev/dev_id
  devName: string;
  devWebsite: string;
  _id: string;
}

export interface User {
  email: string;
  is_dev: boolean;
  _id: string;
  ownedApps: Array<string>;
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
  _id: string;
}

export type UserType = "tester" | "dev";
