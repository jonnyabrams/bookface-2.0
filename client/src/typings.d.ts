export type UserType = {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  id: number;
  profile_pic?: string;
  username: string;
};

export type PostType = {
  id: number;
  first_name: string;
  last_name: string;
  user_id: number;
  profile_pic?: string;
  img?: string;
  content: string;
  created_at: Date;
};

export type CommentType = {
  id: number;
  content: string;
  created_at: Date;
  user_id: number;
  post_id: number;
  first_name: string;
  last_name: string;
  profile_pic: string;
};

export interface ILogin {
  email: string;
  password: string;
}
