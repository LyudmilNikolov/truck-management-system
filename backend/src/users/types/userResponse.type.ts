import { User } from '../schemas/user.schema';

export type UserResponseType = Omit<User, 'password'>;

export type LoginResponseType = {
  accessToken: string;
  user: UserResponseType;
};
