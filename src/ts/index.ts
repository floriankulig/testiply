type Gender = 'male' | 'female' | 'nonbinary';
export type FormType = 'login' | 'register';

export interface User {
  firstName: string;
  lastName: string;
  email: string;
  dateOfBirth?: string;
  gender?: Gender;
}
