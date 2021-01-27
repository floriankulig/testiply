export type Platform =
  | 'ios'
  | 'android'
  | 'windows'
  | 'macOS'
  | 'linux'
  | 'all';
export const platforms: Platform[] = [
  'ios',
  'android',
  'windows',
  'macOS',
  'linux',
  'all',
];

export type InputType = 'email' | 'password';
export type FormType = 'login' | 'register' | 'dev_register';

export type UserType = 'tester' | 'dev';

export interface User {
  firstName: string;
  lastName: string;
  email: string;
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
