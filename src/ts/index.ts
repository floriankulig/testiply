import {
  Category,
  Platform,
  CategoryID,
  UserType,
  InputType,
  FormType,
} from './types';

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

export type { Category, Platform, CategoryID, UserType, InputType, FormType };
