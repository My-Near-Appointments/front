/* eslint-disable no-unused-vars */
import {
  createContext,
  useContext,
  useLayoutEffect,
  useReducer,
  useState,
} from 'react';

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
import {
  LocalStorageService,
} from '@/services/local-storage/local-storage.service';

const companyContext = createContext<CompanyContextData>({
  state: { company: null, companies: [] },
  dispatch: () => Promise<void>,
  isUpdatingCompany: false,
  getCompanyByOwnerId: async (userId: string) => {},
  getCompanyById: async (id: string) => {},
  getCompanies: async () => {},
});

const companyReducer = (
  state: CompanyState,
  action: CompanyActions,
): CompanyState => {
  switch (action.type) {
    case CompanyTypes.SET_COMPANY:
      LocalStorageService.set<Company>(
        'company',
        action.payload?.company as Company,
      );

      return {
        ...state,
        company: action.payload?.company || null,
      };

    case CompanyTypes.SET_COMPANIES: {
      const updatedCompanies = action.payload?.companies as Company[];

      LocalStorageService.set<Company[]>('companies', updatedCompanies);

      return {
        ...state,
        companies: updatedCompanies,
      };
    }

    default:
      return state;
  }
};

export function CompanyProvider({ children }: CompanyProviderProps) {
  const [state, dispatch] = useReducer(companyReducer, {
    company: null,
    companies: [],
  });
  const [isUpdatingCompany, setIsUpdatingCompany] = useState(false);

  useLayoutEffect(() => {
    const company = LocalStorageService.get('company');
    const companies = LocalStorageService.get('companies');

    if (company) {
      dispatch({ type: CompanyTypes.SET_COMPANY, payload: { company } });
    }

    if (companies) {
      dispatch({ type: CompanyTypes.SET_COMPANIES, payload: { companies } });
    }
  }, []);

  const getCompanies = async () => {
    setIsUpdatingCompany(true);

    try {
      const response = await axiosInstance.get('/company');

      dispatch({
        type: CompanyTypes.SET_COMPANIES,
        payload: {
          companies: response.data as Company[],
        },
      });
    } catch (err) {
      //
    } finally {
      setIsUpdatingCompany(false);
    }
  };

  const getCompanyById = async (id: string) => {
    setIsUpdatingCompany(true);

    try {
      const response = await axiosInstance.get(`/company/${id}`);

      const companyIndex = state.companies
        .findIndex((company) => company.id === id);

      const companies = [
        ...state.companies,
      ]

      companies[companyIndex] = response.data as Company;

      dispatch({
        type: CompanyTypes.SET_COMPANIES,
        payload: {
          companies: companies,
        },
      });
    } catch (err) {
      //
    } finally {
      setIsUpdatingCompany(false);
    }
  };

  const getCompanyByOwnerId = async (userId: string) => {
    setIsUpdatingCompany(true);

    try {
      const response = await axiosInstance.get(`/company/owner/${userId}`);

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
      value={{
        state,
        dispatch,
        isUpdatingCompany,
        getCompanyById,
        getCompanyByOwnerId,
        getCompanies,
      }}
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
