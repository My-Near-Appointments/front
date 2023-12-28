import { Company } from '@/hooks/company/interfaces/company-state.interface';

export interface CreateAppointmentModalProps {
  currentCompany: Company;
  isOpen: boolean;
  onClose: () => void;
}
