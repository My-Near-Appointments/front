import * as yup from 'yup';

export function useUpdateCompanySchema() {
  const schema = yup.object().shape({
    name: yup.string().required('Nome da empresa é obrigatório'),
    description: yup.string().required('Descrição é obrigatória'),
    address: yup.object().shape({
      street: yup.string().required('Rua é obrigatória'),
      number: yup.string().required('Número é obrigatório'),
      neighborhood: yup.string().required('Bairro é obrigatório'),
      city: yup.string().required('Cidade é obrigatória'),
      state: yup
        .string()
        .oneOf(
          [
            'AC',
            'AL',
            'AP',
            'AM',
            'BA',
            'CE',
            'DF',
            'ES',
            'GO',
            'MA',
            'MT',
            'MS',
            'MG',
            'PA',
            'PB',
            'PR',
            'PE',
            'PI',
            'RJ',
            'RN',
            'RS',
            'RO',
            'RR',
            'SC',
            'SP',
            'SE',
            'TO',
          ],
          'Estado inválido',
        )
        .required('Estado é obrigatório'),
      zip: yup
        .string()
        .min(8, 'CEP precisa ter 8 dígitos')
        .required('CEP é obrigatório'),
    }),
  });

  return schema;
}