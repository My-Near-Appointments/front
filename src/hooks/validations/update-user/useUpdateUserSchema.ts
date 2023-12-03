import * as yup from 'yup';

export function useUpdateUserSchema() {
  const schema = yup.object().shape({
    firstName: yup.string().required('Nome é obrigatório').min(2),
    lastName: yup.string().required('Sobrenome é obrigatório').min(2),
    password: yup
      .string()
      .required('É necessário criar uma senha')
      .min(8, 'A senha precisa ter no mínimo 8 caracteres')
      .matches(/^(?=.*[A-Z])/, 'Precisa conter uma letra maiúscula')
      // eslint-disable-next-line no-useless-escape
      .matches(/^(?=.*[!@#\$%\^&\*])/, 'Precisa conter um símbolo especial'),
    passwordConfirmation: yup
      .string()
      .oneOf([yup.ref('password'), undefined], 'Senhas devem ser iguais'),
  });

  return schema;
}