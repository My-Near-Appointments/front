import { createContext, useContext, useReducer, useState } from 'react';

import {
  CompanyContextData,
} from '@/hooks/company/interfaces/company-context-data.interface';
import {
  CompanyProviderProps,
} from '@/hooks/company/interfaces/company-provider-props.interface';
import {
  Company,
  CompanyState,
} from '@/hooks/company/interfaces/company-state.interface';
import {
  CompanyActions,
  CompanyTypes,
} from '@/hooks/company/types/company-actions.types';
import axiosInstance from '@/services/axios/axios-instance';

const companyContext = createContext<CompanyContextData>({
  state: { company: null },
  dispatch: () => Promise<void>,
  isUpdatingCompany: false,
  // eslint-disable-next-line no-unused-vars
  getCompany: async (userId: string) => {},
});

const companyReducer = (
  state: CompanyState,
  action: CompanyActions,
): CompanyState => {
  switch (action.type) {
    case CompanyTypes.SET_COMPANY:
      return {
        ...state,
        company: action.payload?.company || null,
      };
    default:
      return state;
  }
};

export function CompanyProvider({ children }: CompanyProviderProps) {
  const [state, dispatch] = useReducer(companyReducer, { company: null });
  const [isUpdatingCompany, setIsUpdatingCompany] = useState(false);

  const getCompany = async (userId: string) => {
    setIsUpdatingCompany(true);
    try {
      const response = await axiosInstance.get(
        `/company/${userId}`,
      );

      dispatch({
        type: CompanyTypes.SET_COMPANY,
        payload: {
          company: response.data as Company,
        },
      });
    } catch (err) {
      //
    } finally {
      setIsUpdatingCompany(false);
    }
  };

  return (
    <companyContext.Provider
      value={{ state, dispatch, isUpdatingCompany, getCompany }}
    >
      {children}
    </companyContext.Provider>
  );
}

export function useCompany() {
  const context = useContext(companyContext);

  if (!context) {
    throw new Error('useCompany must be used within an CompanyProvider');
  }

  return context;
}
