export interface Appointment {
  id: string;
  start: Date;
  end: Date;
  userId: string;
  employeeId: string;
  companyId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateAppointment {
  id: string;
  start: Date;
  end: Date;
  userId: string;
  employeeId: string;
  companyId: string;
}

export interface AppointmentState {
  appointments: Appointment[];
}
