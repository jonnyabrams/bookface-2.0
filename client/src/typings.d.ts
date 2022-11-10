export type UserType = {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  id: number;
};

export type PostType = {
  id: number;
  name: string;
  userId: number;
  profilePic: string;
  img?: string;
  desc: string;
};

export interface ILogin {
  email: string;
  password: string;
}