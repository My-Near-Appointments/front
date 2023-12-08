import * as yup from 'yup';

export function useCreateEmployeeSchema() {
  return yup.object().shape({
    name: yup.string().required('Nome é obrigatório'),
    photoLink:
      yup.string().required('Um link para um avatar é necessário'),
  });
}
