import { useMutation, useQuery } from '@tanstack/vue-query';
import { registerUserMutation, loginUserQuery, checkTokenStatus } from '@/entities/user/services';
import type { LoginUserRequest, RegisterUserRequest } from '../types';

export const useRegisterUserMutation = () =>
  useMutation({
    mutationKey: ['authRegister'],
    mutationFn: (data: RegisterUserRequest) => registerUserMutation(data),
  });

export const useLoginMutation = () =>
  useMutation({
    mutationKey: ['authLogin'],
    mutationFn: (data: LoginUserRequest) => loginUserQuery(data),
  });

export const useCheckTokenQuery = () =>
  useQuery({
    queryKey: ['authCheckToken'],
    queryFn: () => checkTokenStatus(),
  });
