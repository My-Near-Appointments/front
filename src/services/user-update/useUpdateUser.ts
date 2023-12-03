import { useState } from 'react';

import { AxiosError } from 'axios';

import { User } from '@/hooks/user/interfaces/user-state.interface';
import axiosInstance from '@/services/axios/axios-instance';

interface UpdateUserData {
  name: string;
  password: string;
}

export const useUpdateUser = () => {
  const [isUpdatingUser, setIsUpdatingUser] = useState(false);
  const [error, setError] = useState<AxiosError | null>();
  const [updatedUserData, setUserData] = useState<User | null>();

  const updateUser = async (id: string, userData: UpdateUserData) => {
    setIsUpdatingUser(true);
    setError(null);

    try {
      const response = await axiosInstance.put(`/user/${id}`, userData);
      setUserData(response.data);
    } catch (err) {
      setError(err as AxiosError);
    } finally {
      setIsUpdatingUser(false);
    }
  };

  return { updateUser, isUpdatingUser, updatedUserData, error };
};
