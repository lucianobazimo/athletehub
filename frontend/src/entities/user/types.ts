export interface IUser {
  id: string;
  email: string;
  username: string;
  firstname: string;
  lastname: string;
  password: string;
}

export interface IAccessToken {
  token: string;
  type: string;
  name?: string;
  lastUsedAt?: string;
  expiresAt?: string;
}

export type LoginUserRequest = Pick<IUser, 'email' | 'password'>;
export type LoginUserResponse = IAccessToken;

export type RegisterUserRequest = Omit<IUser, 'id'>;
