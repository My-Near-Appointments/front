export interface CompanyFormData {
  name: string;
  description: string;
  adminId?: string;
  email: string;
  cnpj: string;
  address: {
    street: string;
    number: number;
    neighborhood: string;
    city: string;
    state: string;
    zip: string;
  }
}
