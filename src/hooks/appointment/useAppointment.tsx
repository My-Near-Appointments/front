/* eslint-disable no-unused-vars */
import { createContext, useContext, useLayoutEffect, useReducer } from 'react';

import {
  AppointmentProviderProps,
} from '@/hooks/appointment/interfaces/appointment-provider-props.interface';
import {
  AppointmentContextData,
} from '@/hooks/appointment/interfaces/appointments-context-data.interface';
import {
  Appointment,
  AppointmentState,
  CreateAppointment,
} from '@/hooks/appointment/interfaces/appointments-state.interface';
import {
  AppointmentActions,
  AppointmentTypes,
} from '@/hooks/appointment/types/appointment-actions.types';
import axiosInstance from '@/services/axios/axios-instance';
import {
  LocalStorageService,
} from '@/services/local-storage/local-storage.service';

const appointmentContext = createContext<AppointmentContextData>({
  state: { appointments: [] },
  dispatch: () => Promise<void>,
  getByEmployeeId: async (employeeId: string) => {},
  getFilteredByEmployeeId: (employeeId: string) => [],
  create: async () => {},
});

const appointmentReducer = (
  state: AppointmentState,
  action: AppointmentActions,
): AppointmentState => {
  switch (action.type) {
    case AppointmentTypes.SET_APPOINTMENTS: {
      const updatedAppointmentsMap = new Map(
        state.appointments.map((appointment) => [appointment.id, appointment]),
      );

      action.payload.appointments.forEach((appointment) => {
        updatedAppointmentsMap.set(appointment.id, appointment);
      });

      const appointmentsList = Array.from(updatedAppointmentsMap.values());

      LocalStorageService.set<Appointment[]>(
        'appointment',
        appointmentsList,
      );

      return {
        ...state,
        appointments: appointmentsList,
      };
    }

    default:
      return state;
  }
};

export function AppointmentProvider({ children }: AppointmentProviderProps) {
  const [state, dispatch] = useReducer(appointmentReducer, {
    appointments: [],
  });

  useLayoutEffect(() => {
    const appointments = LocalStorageService.get('appointments');

    if (appointments) {
      dispatch({
        type: AppointmentTypes.SET_APPOINTMENTS,
        payload: { appointments },
      });
    }
  }, []);

  const create = async (data: CreateAppointment) => {
    const response = await axiosInstance.post('/appointment', {
      ...data,
    });

    dispatch({
      type: AppointmentTypes.SET_APPOINTMENTS,
      payload: { appointments: [...state.appointments, response.data] },
    });
  };

  const getByEmployeeId = async (employeeId: string) => {
    try {
      const response = await axiosInstance.get<Appointment[]>(
        `/appointment/${employeeId}`,
      );

      dispatch({
        type: AppointmentTypes.SET_APPOINTMENTS,
        payload: {
          appointments: response.data,
        },
      });
    } catch (err) {
      //
    }
  };

  const getFilteredByEmployeeId = (employeeId: string) => {
    const appointments = state.appointments.filter(
      (appointment) => appointment.employeeId !== employeeId,
    );

    return appointments;
  };

  return (
    <appointmentContext.Provider
      value={{
        state,
        dispatch,
        create,
        getByEmployeeId,
        getFilteredByEmployeeId,
      }}
    >
      {children}
    </appointmentContext.Provider>
  );
}

export function useAppointment() {
  const context = useContext(appointmentContext);

  if (!context) {
    throw new Error(
      'useAppointment must be used within an AppointmentProvider',
    );
  }

  return context;
}
