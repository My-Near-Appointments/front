interface MenuLinks {
  name: string;
  link: string;
  conditional: boolean;
}

export const getMenuLinks = (isCompanyAdmin: boolean): MenuLinks[] => [
  {
    name: 'Agendamentos',
    link: '/appointments',
    conditional: true,
  },
  {
    name: 'Empregados',
    link: '/employees',
    conditional: isCompanyAdmin,
  },
];
