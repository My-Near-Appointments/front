/* eslint-disable no-unused-vars */
import { Employee } from '@/hooks/employee/interfaces/employee-state.interface';

export enum EmployeeTypes {
  SET_EMPLOYEES = 'SET_EMPLOYEES',
  RESET_EMPLOYEES = 'RESET_EMPLOYEES',
  UPDATE_EMPLOYEE = 'UPDATE_EMPLOYEE',
  DELETE_EMPLOYEE = 'DELETE_EMPLOYEE',
}

export interface SetEmployeesPayload {
  employees: Employee[];
}

export interface UpdateEmployeePayload {
  id: string;
  employee: Employee;
}

export interface DeleteEmployeePayload {
  id: string;
}

export type setEmployeesAction = {
  type: EmployeeTypes.SET_EMPLOYEES;
  payload: SetEmployeesPayload;
}

export type UpdateEmployeeAction = {
  type: EmployeeTypes.UPDATE_EMPLOYEE;
  payload: UpdateEmployeePayload;
}

export type DeleteEmployeeAction = {
  type: EmployeeTypes.DELETE_EMPLOYEE;
  payload: DeleteEmployeePayload;
}

export type ResetEmployeesAction = {
  type: EmployeeTypes.RESET_EMPLOYEES;
}

export type EmployeeActions =
  | setEmployeesAction
  | UpdateEmployeeAction
  | DeleteEmployeeAction
  | ResetEmployeesAction;
