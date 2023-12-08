export interface Employee {
  id: string;
  name: string;
  photoLink: string;
  active: boolean;
}

export interface CreateEmployee {
  name: string;
  photoLink: string;
  companyId: string;
}

export interface UpdateEmployee {
  name: string;
  photoLink: string;
}

export interface EmployeeState {
  employees: Employee[];
}
