export interface CreateAppointmentFormProps {
  appointmentDate: {
    [key: string]: Date;
  },
  appointmentSlot: {
    [key: string]: Date;
  }
}
