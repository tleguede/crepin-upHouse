export interface User {
  id?: string;
  displayName?: string;
  email?: string;
  photoURL?: string;
  phoneNumber?: string;
  createdAt?: string;
  disabled?: boolean;
}

export interface UserIndexes {
  id: string;
  records: User[];
  ids: string[];
  createdAt?: Date;
  updatedAt?: Date;
}