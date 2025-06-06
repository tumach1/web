export interface User {
  username: string;
  email?: string;
  firstName: string;
  lastName: string;
  isCreator: boolean;
  createdAt: Date;
  followersCount: number;
  followingsCount: number;
}
