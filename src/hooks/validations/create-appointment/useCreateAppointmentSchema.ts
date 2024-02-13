import * as yup from 'yup';

export function useCreateAppointmentSchema() {
  return yup.object({
    appointmentDate: yup.date().required('É necessário escolher uma data'),
    appointmentSlot: yup.string().required('É necessário escolher um horário'),
  }).required();
}
