/* eslint-disable no-unused-vars */
import { createContext, useContext, useLayoutEffect, useReducer } from 'react';

import {
  AppointmentProviderProps
} from '@/hooks/appointment/interfaces/appointment-provider-props.interface';
import
  { AppointmentContextData }
from '@/hooks/appointment/interfaces/appointments-context-data.interface';
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
  LocalStorageService
} from '@/services/local-storage/local-storage.service';

const appointmentContext = createContext<AppointmentContextData>({
  state: { appointments: [] },
  dispatch: () => Promise<void>,
  getByEmployeeId: async (employeeId: string) => {},
  create: async () => {},
});

const appointmentReducer = (
  state: AppointmentState,
  action: AppointmentActions,
): AppointmentState => {
  switch (action.type) {
    case AppointmentTypes.SET_APPOINTMENTS:
      LocalStorageService.set<Appointment[]>(
        'appointment',
        action.payload?.appointments,
      );

      return {
        ...state,
        appointments: action.payload?.appointments || [],
      };

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

    try {
      const response = await axiosInstance.post('/appointment', {
        ...data,
      });

      dispatch({
        type: AppointmentTypes.SET_APPOINTMENTS,
        payload: { appointments: [...state.appointments, response.data] },
      });
    } catch (err) {
      //
    }
  }

  const getByEmployeeId = async (employeeId: string) => {

    try {
      const response = await axiosInstance.get(`/appointment/${employeeId}`);

      dispatch({
        type: AppointmentTypes.SET_APPOINTMENTS,
        payload: {
          appointments: response.data as Appointment[],
        },
      });
    } catch (err) {
      //
    }
  };

  return (
    <appointmentContext.Provider
      value={{
        state,
        dispatch,
        create,
        getByEmployeeId,
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
