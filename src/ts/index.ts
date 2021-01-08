type Gender = 'male' | 'female' | 'nonbinary';

export interface User {
  firstName: string;
  lastName: string;
  email: string;
  dateOfBirth?: string;
  gender?: Gender;
}
