import { IPaginationReqViewModel, IUsersFilterModel } from '../../../helpers/models';

export interface ICreateUser {
  name: string;
  email: string;
  phone: string;
  lesson: string;
}

export interface ICreateCV {
  name: string;
  email: string;
  phone: string;
  position?: string;
  about: string;
  birthday : string;
  education : string;
  skills : string[];
  experience : string;
}

export interface IGetUsersBodyModel extends IPaginationReqViewModel, IUsersFilterModel {
  balance: number;
  orderFromDate: Date;
  orderToDate: Date;
}

export interface IUserEditEmail {
  email: string;
}

export interface IVerifyCorporatePartner {
  verificationCode: string;
}

export interface IAddComapnyCard {
  companyId: string;
  card: number;
}