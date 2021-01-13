export type Gender = 'male' | 'female' | 'other';
export const genders: Gender[] = ['male', 'female', 'other'];

export type InputType = 'email' | 'password';
export type FormType = 'login' | 'register' | 'dev_register';

export interface User {
  firstName: string;
  lastName: string;
  email: string;
  dateOfBirth?: string;
  gender?: Gender;
}

type Platform = 'iOS' | 'Android' | 'Windows' | 'MacOS' | 'Linux';

interface App {
  name: string;
  desc: string;
  websiteUrl: string; //Website oder Github oder FaceBook
  platform: Platform;
  imageUrl: string[];
  rating: number;
  downloads: number;
  developer_id: number; // dev/dev_id
  developer_name: string;
  _id: number;
}

interface TodayAppWidgets {
  heading: string;
  opensLongDescription: boolean;
  _id: number;
  apps: App[];
}
