import { IconType } from "react-icons/lib";

export type Platform =
  | "ios"
  | "android"
  | "windows"
  | "macos"
  | "linux"
  | "all";

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
  websiteUrl: string; //Website oder Github oder FaceBook
  platform: Platform;
  icon: string;
  screenshots: string[];
  rating: number;
  downloads: number;
  developer_id: number; // dev/dev_id
  devName: string;
  _id: string;
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

export type UserType = "tester" | "dev";
