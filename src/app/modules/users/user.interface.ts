export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  avatar: string
}


export type SortedFields = 'firstName' | 'lastName';