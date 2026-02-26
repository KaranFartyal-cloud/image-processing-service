export interface IUser {
  id: number; // int AI PK
  name: string; // varchar(100)
  email: string; // varchar(255)
  password?: string; // varchar(255)
  createdAt: Date;
  updatedAt: Date;
}

export interface IOauthUser {
  id: number;
  provider: string;
  providerUserId: string;
  userId: number;
  createdAt: Date;
}
