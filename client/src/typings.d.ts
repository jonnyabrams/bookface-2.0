export type UserType = {
  firstName: string;
  lastName: string;
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
