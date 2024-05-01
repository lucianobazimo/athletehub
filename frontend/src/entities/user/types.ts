export interface IUser {
  id: string;
  email: string;
  username: string;
  firstname: string;
  lastname: string;
  password: string;
}

export type LoginUserRequest = Pick<IUser, 'email' | 'password'>;
export type LoginUserResponse = Pick<IUser, 'id'>;

export type RegisterUserRequest = Omit<IUser, 'id'>;
