export interface EmployeeAvailability {
  id: string;
  start: Date;
  end: Date;
  companyId: string;
  employeeId: string;
}

export interface CreateEmployeeAvailability {
  companyId: string;
  employeeId: string;
  start: Date;
  end: Date;
}

export interface EmployeeAvailabilityState {
  employeeAvailability: EmployeeAvailability[];
}
