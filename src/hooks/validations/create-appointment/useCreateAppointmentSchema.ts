import * as yup from 'yup';

export function useCreateAppointmentSchema() {
  return yup.object().shape({
    appointmentDate: yup.lazy((value = {}) =>
      yup.object().shape(
        Object.keys(value).reduce((shape: Record<string, any>, key) => {
          shape[key] = yup
            .date()
            .required('Preencher uma faixa de datas é obrigatório');
          return shape;
        }, {}),
      ),
    ),
    appointmentSlot: yup.lazy((value = {}) =>
      yup.object().shape(
        Object.keys(value).reduce((shape: Record<string, any>, key) => {
          shape[key] = yup.date().required('É necessário escolher um slot');
          return shape;
        }, {}),
      ),
    ),
  });
}
