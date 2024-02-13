import {
  Appointment,
} from '@/hooks/appointment/interfaces/appointments-state.interface';

/* eslint-disable no-unused-vars */
export enum AppointmentTypes {
  SET_APPOINTMENTS = 'SET_APPOINTMENTS',
}

export interface SetAppointmentsPayload {
  appointments: Appointment[];
}

export type SetAppointmentAction = {
  type: AppointmentTypes.SET_APPOINTMENTS;
  payload: SetAppointmentsPayload;
};

export type AppointmentActions = SetAppointmentAction;
