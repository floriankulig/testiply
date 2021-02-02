export type Platform =
  | 'ios'
  | 'android'
  | 'windows'
  | 'macOS'
  | 'linux'
  | 'all';

export type CategoryID =
  | 'education'
  | 'finances'
  | 'graphicsAndDesign'
  | 'music'
  | 'productivity'
  | 'socialMedia'
  | 'entertainment'
  | 'utilities'
  | 'photoAndVideo'
  | 'lifestyle'
  | 'news'
  | 'travel'
  | 'games'
  | 'weather'
  | 'developerTools'
  | 'healthAndFitness'
  | 'medicine'
  | 'referenceBooks'
  | 'addons'
  | 'sport'
  | 'economy';

export type InputType = 'email' | 'password';
export type FormType = 'login' | 'register' | 'dev_register';

export type UserType = 'tester' | 'dev';

export interface User {
  email: string;
  is_dev: boolean;
  _id: string;
}

interface App {
  name: string;
  desc: string;
  websiteUrl: string; //Website oder Github oder FaceBook
  platform: Platform;
  icon: string;
  screenshots: string[];
  rating: number;
  downloads: number;
  developer_id: number; // dev/dev_id
  developer_name: string;
  _id: string;
}

interface TodayAppWidgets {
  heading: string;
  opensLongDescription: boolean;
  _id: string;
  apps: App[];
}
