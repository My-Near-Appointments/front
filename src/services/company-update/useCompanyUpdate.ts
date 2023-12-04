import { useState } from 'react';

import { AxiosError } from 'axios';

import {
  Company,
} from '@/hooks/company/interfaces/company-state.interface';
import axiosInstance from '@/services/axios/axios-instance';

interface UpdateAddressData {
  street: string;
  number: string;
  neighborhood: string;
  city: string;
  state: string;
  zip: string;
}

interface UpdateCompanyData {
  name: string;
  description: string;
  address: UpdateAddressData;
}

export const useUpdateCompany = () => {
  const [isUpdatingCompany, setIsUpdatingCompany] = useState(false);
  const [requestError, setRequestError] = useState<AxiosError | null>();
  const [updatedCompanyData, setCompanyData] = useState<Company | null>();

  const updateCompany = async (id: string, companyData: UpdateCompanyData) => {
    setIsUpdatingCompany(true);
    setRequestError(null);

    try {
      const response = await axiosInstance.put(`/company/${id}`, companyData);
      setCompanyData(response.data);
    } catch (err) {
      setRequestError(err as AxiosError);
    } finally {
      setIsUpdatingCompany(false);
    }
  };

  return { updateCompany, isUpdatingCompany, updatedCompanyData, requestError };
};
