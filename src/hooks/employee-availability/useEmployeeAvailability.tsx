/* eslint-disable no-unused-vars */
import { createContext, useContext, useReducer, useState } from 'react';

import {
  EmployeeAvailabilityContextData,
  // eslint-disable-next-line max-len
} from '@/hooks/employee-availability/interfaces/employee-availability-context-data.interface';
import {
  CreateEmployeeAvailability,
  EmployeeAvailabilityState,
  // eslint-disable-next-line max-len
} from '@/hooks/employee-availability/interfaces/employee-availability-state.interface';
import {
  EmployeeAvailabilityProviderProps,
  // eslint-disable-next-line max-len
} from '@/hooks/employee-availability/interfaces/employee-provider-props.interface';
import {
  EmployeeAvailabilityTypes,
  setEmployeeAvailabilityAction,
  // eslint-disable-next-line max-len
} from '@/hooks/employee-availability/types/employee-availability-actions.types';
import axiosInstance from '@/services/axios/axios-instance';

const employeeAvailabilityContext =
  createContext<EmployeeAvailabilityContextData>({
    state: { employeeAvailability: [] },
    dispatch: () => Promise<void>,
    createEmployeeAvailability: async () => {},
    getByCompanyId: async (companyId: string) => Promise.resolve(undefined),
    isUpdatingEmployee: false,
  });

const employeeAvailabilityReducer = (
  state: EmployeeAvailabilityState,
  action: setEmployeeAvailabilityAction,
): EmployeeAvailabilityState => {
  switch (action.type) {
    case 'SET_EMPLOYEE_AVAILABILITY':
      return {
        ...state,
        employeeAvailability: action.payload.employees,
      };
    default:
      return state;
  }
};

export function EmployeeAvailabilityProvider({
  children,
}: EmployeeAvailabilityProviderProps) {
  const [state, dispatch] = useReducer(employeeAvailabilityReducer, {
    employeeAvailability: [],
  });
  const [isUpdatingEmployee, setisUpdatingEmployee] = useState(false);

  const createEmployeeAvailability = async (
    data: CreateEmployeeAvailability,
  ) => {
    setisUpdatingEmployee(true);

    try {
      const response = await axiosInstance.post('/employee-availability', {
        ...data,
      });

      dispatch({
        type: EmployeeAvailabilityTypes.SET_EMPLOYEE_AVAILABILITY,
        payload: { employees: [...state.employeeAvailability, response.data] },
      });
    } finally {
      setisUpdatingEmployee(false);
    }
  };

  const getByCompanyId = async (companyId: string) => {
    setisUpdatingEmployee(true);

    try {
      const response = await axiosInstance.get(
        `employee-availability/${companyId}`,
      );

      dispatch({
        type: EmployeeAvailabilityTypes.SET_EMPLOYEE_AVAILABILITY,
        payload: { employees: response.data },
      });

      return response.data;
    } catch (err) {
      //
    } finally {
      setisUpdatingEmployee(false);
    }
  };

  return (
    <employeeAvailabilityContext.Provider
      value={{
        state,
        dispatch,
        isUpdatingEmployee,
        createEmployeeAvailability,
        getByCompanyId,
      }}
    >
      {children}
    </employeeAvailabilityContext.Provider>
  );
}

export function useEmployeeAvailability() {
  const context = useContext(employeeAvailabilityContext);

  if (!context) {
    throw new Error(
      'useEmployeeAvailability must be used within an EmployeeProvider',
    );
  }

  return context;
}
