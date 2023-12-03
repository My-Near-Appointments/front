import { useState } from 'react';

import { AxiosError } from 'axios';

import { User } from '@/hooks/user/interfaces/user-state.interface';
import { UserTypes } from '@/hooks/user/types/user-actions.types';
import { useUser } from '@/hooks/user/useUser';
import axiosInstance from '@/services/axios/axios-instance';

export const useUserMe = () => {
  const [isUpdatingUser, setIsUpdatingUser] = useState(false);
  const [error, setError] = useState<AxiosError | null>();

  const { dispatch } = useUser();

  const getUserMe = async () => {
    setIsUpdatingUser(true);
    setError(null);

    try {
      const response = await axiosInstance.get('/user/me');
      dispatch({ type: UserTypes.SET_USER, payload: {
        user: response.data as User,
      } });
    } catch (err) {
      setError(err as AxiosError);
    } finally {
      setIsUpdatingUser(false);
    }
  };

  return { getUserMe, isUpdatingUser, error };
};