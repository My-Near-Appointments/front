/* eslint-disable no-unused-vars */
import { Dispatch } from 'react';

import {
  AppointmentState,
  CreateAppointment,
} from '@/hooks/appointment/interfaces/appointments-state.interface';
import {
  AppointmentActions,
} from '@/hooks/appointment/types/appointment-actions.types';

export interface AppointmentContextData {
  state: AppointmentState;
  dispatch: Dispatch<AppointmentActions>;
  create: (appointment: CreateAppointment) => Promise<void>;
  getByEmployeeId: (employeeId: string) => Promise<void>;
}
