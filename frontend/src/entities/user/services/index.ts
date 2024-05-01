import type {
  IUser,
  LoginUserRequest,
  LoginUserResponse,
  RegisterUserRequest
} from '@/entities/user/types';
import api from '@/lib/api';

export const registerUserMutation = async (data: RegisterUserRequest): Promise<IUser> =>
  await api.post('/auth/register', data).then((res) => res.data);

export const loginUserQuery = async (data: LoginUserRequest): Promise<LoginUserResponse> =>
  await api.post('/auth/login', data).then((res) => res.data);
