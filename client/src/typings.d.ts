export type UserType = {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  id: number;
};

export type PostType = {
  id: number;
  first_name: string;
  last_name: string;
  user_id: number;
  profile_pic?: string;
  img?: string;
  content: string;
};

export interface ILogin {
  email: string;
  password: string;
}