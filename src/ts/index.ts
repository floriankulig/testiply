export type Gender = 'male' | 'female' | 'nonbinary';
export const genders: Gender[] = ['male', 'female', 'nonbinary'];

export type InputType = 'email' | 'password';
export type FormType = 'login' | 'register';

export interface User {
  firstName: string;
  lastName: string;
  email: string;
  dateOfBirth?: string;
  gender?: Gender;
}
