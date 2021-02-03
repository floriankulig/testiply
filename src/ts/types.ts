export type Platform =
  | "ios"
  | "android"
  | "windows"
  | "macOS"
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
  | "referenceBooks"
  | "addons"
  | "sport"
  | "economy";

export interface Category {
  id?: CategoryID;
  icon?: JSX.Element;
  displayName: string;
}

export type InputType = "email" | "password";
export type FormType = "login" | "register" | "dev_register";

export type UserType = "tester" | "dev";
