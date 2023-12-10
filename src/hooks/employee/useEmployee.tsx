/* eslint-disable no-unused-vars */
import {
  createContext,
  useContext,
  useReducer,
  useState
} from 'react';

import {
  EmployeeContextData,
} from '@/hooks/employee/interfaces/employee-context-data.interface';
import {
  EmployeeProviderProps,
} from '@/hooks/employee/interfaces/employee-provider-props.interface';
import {
  CreateEmployee,
  EmployeeState,
  UpdateEmployee,
} from '@/hooks/employee/interfaces/employee-state.interface';
import {
  EmployeeActions,
  EmployeeTypes,
} from '@/hooks/employee/types/employee-actions.types';
import axiosInstance from '@/services/axios/axios-instance';

const employeeContext = createContext<EmployeeContextData>({
  state: { employees: [] },
  dispatch: () => Promise<void>,
  deactivateEmployee: async () => {},
  updateEmployee: async (id: string, employee: UpdateEmployee) => {},
  activateEmployee: async () => {},
  deleteEmployee: async () => {},
  isUpdatingEmployee: false,
  createEmployee: async (data: CreateEmployee) => {},
  getEmployees: async (companyId: string) => {},
  getEmployeeById: async (id: string) => Promise.resolve(undefined),
});

const employeeReducer = (
  state: EmployeeState,
  action: EmployeeActions,
): EmployeeState => {
  switch (action.type) {
    case EmployeeTypes.SET_EMPLOYEES:
      return {
        ...state,
        employees: action.payload.employees,
      };
    case EmployeeTypes.UPDATE_EMPLOYEE:
      return {
        ...state,
        employees: state.employees.map((employee) =>
          employee.id === action.payload.id
            ? { ...employee, ...action.payload.employee }
            : employee,
        ),
      };
    case EmployeeTypes.DELETE_EMPLOYEE:
      return {
        ...state,
        employees: state.employees.filter(
          (employee) => employee.id !== action.payload.id,
        ),
      };
    default:
      return state;
  }
};

export function EmployeeProvider({ children }: EmployeeProviderProps) {
  const [state, dispatch] = useReducer(employeeReducer, { employees: [] });
  const [isUpdatingEmployee, setisUpdatingEmployee] = useState(false);

  const createEmployee = async (data: CreateEmployee) => {
    setisUpdatingEmployee(true);

    try {
      const response = await axiosInstance.post('/employee', {
        ...data,
      });

      dispatch({
        type: EmployeeTypes.SET_EMPLOYEES,
        payload: { employees: [...state.employees, response.data] },
      });
    } catch (err) {
      //
    } finally {
      setisUpdatingEmployee(false);
    }
  }

  const getEmployees = async (id: string) => {
    setisUpdatingEmployee(true);

    try {
      const response = await axiosInstance.get(`/employee/${id}`);

      dispatch({
        type: EmployeeTypes.SET_EMPLOYEES,
        payload: { employees: response.data },
      });
    } catch (err) {
      //
    } finally {
      setisUpdatingEmployee(false);
    }
  };

  const updateEmployee = async (id: string, employee: UpdateEmployee) => {
    setisUpdatingEmployee(true);

    try {
      const response = await axiosInstance.put(`/employee/${id}`, {
        ...employee,
      });

      dispatch({
        type: EmployeeTypes.UPDATE_EMPLOYEE,
        payload: { id, employee: response.data },
      });
    } catch (err) {
      //
    } finally {
      setisUpdatingEmployee(false);
    }
  };

  const activateEmployee = async (employeeId: string) => {
    setisUpdatingEmployee(true);

    try {
      const response = await axiosInstance.put(
        `/employee/activate/${employeeId}`,
      );

      dispatch({
        type: EmployeeTypes.UPDATE_EMPLOYEE,
        payload: { id: employeeId, employee: response.data },
      });
    } catch (err) {
      //
    } finally {
      setisUpdatingEmployee(false);
    }
  };

  const deactivateEmployee = async (employeeId: string) => {
    setisUpdatingEmployee(true);

    try {
      const response = await axiosInstance.put(
        `/employee/deactivate/${employeeId}`,
      );

      dispatch({
        type: EmployeeTypes.UPDATE_EMPLOYEE,
        payload: { id: employeeId, employee: response.data },
      });
    } catch (err) {
      //
    } finally {
      setisUpdatingEmployee(false);
    }
  };

  const deleteEmployee = async (employeeId: string) => {
    setisUpdatingEmployee(true);

    try {
      await axiosInstance.delete(`/employee/${employeeId}`);

      dispatch({
        type: EmployeeTypes.DELETE_EMPLOYEE,
        payload: { id: employeeId },
      });
    } catch (err) {
      //
    } finally {
      setisUpdatingEmployee(false);
    }
  };

  const getEmployeeById = async (id: string) => {
    const employee = state.employees.find((employee) => employee.id === id);

    return employee;
  }

  return (
    <employeeContext.Provider
      value={{
        state,
        dispatch,
        isUpdatingEmployee,
        createEmployee,
        getEmployees,
        getEmployeeById,
        updateEmployee,
        deactivateEmployee,
        activateEmployee,
        deleteEmployee,
      }}
    >
      {children}
    </employeeContext.Provider>
  );
}

export function useEmployee() {
  const context = useContext(employeeContext);

  if (!context) {
    throw new Error('useEmployee must be used within an EmployeeProvider');
  }

  return context;
}
