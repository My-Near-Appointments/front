export interface User {
  id: string;
  name: string;
  username: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserState {
  user: User | null;
  userId?: string;
}
