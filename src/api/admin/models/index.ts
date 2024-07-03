import { UserRole } from '../../../helpers/enums';
export interface IEditAdminModel {
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  role: UserRole;
}

export interface ICreateAdmin {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  role: UserRole;
}
