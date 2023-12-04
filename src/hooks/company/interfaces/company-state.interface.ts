import { States } from '@/hooks/company/interfaces/states';

export interface Company {
  id: string;
  name: string;
  cnpj: string;
  description: string;
  email: string;
  active?: boolean;
  createdAt: Date;
  updatedAt: Date;
  address: {
    number: number;
    street: string;
    neighborhood: string;
    city: string;
    state: States;
    zip: string;
  };
}

export interface CompanyState {
  company: Company | null;
}
