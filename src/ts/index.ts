type Gender = 'male' | 'female' | 'nonbinary';
export type FormType = 'login' | 'register';

export const placeholderDate = '0000-01-01';

export interface User {
  firstName: string;
  lastName: string;
  email: string;
  dateOfBirth?: string;
  gender?: Gender;
}
