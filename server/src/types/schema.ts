export interface IUser {
  id: number; // int AI PK
  name: string; // varchar(100)
  email: string; // varchar(255)
  password: string; // varchar(255)
}

export interface IImage {
  postId: number; // int AI PK
  imageUrl: string; // text
  userId: number; // FK -> users.id
}
