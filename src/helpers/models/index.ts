import { Request } from 'express';
import { Types }   from 'mongoose';
import { SchemaStatusEnum, UserRole } from '../enums';


export interface IResponseObjectViewModel<T = any> {
  success: boolean;
  data: T;
  message: string;
}

export interface IErrorHandler {
  error: any;
  statusCode?: number;
}

export interface IFailedResponse {
  message?: string;
  statusCode?: number;
}

export interface ISuccessResponse {
  body?: any;
  message?: string;
  statusCode?: number;
}

export interface IHttpRequest {
  controllerName: string;
  actionName?: string;
  method: string;
  body?: any;
}

export interface IRequest<T = IPersonBaseModel> extends Request {
  user: T;
  params: any;
}

export interface IPersonBaseModel {
  _id: any;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone: string;
  referralCode: string;
  referralBonusUser: boolean;
  freeOrderBonus: boolean;
  freeOrderBonusDate: Date;
  friendReferralCode: string;
  blocked: boolean;
  deleted: boolean;
  updatedAt: Date;
  createdAt: Date;
  role : UserRole;
}


export interface ICompanyFilterModel {
  status?: SchemaStatusEnum[];
  name?: string;
  count?: number;
  mainCategories?: Array<IObjectId>;
  subcategoryId?: IObjectId;
  description? : string;
}

export interface IObjectId extends Types.ObjectId {}

export interface IWorkingHours {
  workingHoursStart: Date;
  workingHoursEnd: Date;
}

export interface IPaginationViewModel<T = any> {
  list: T;
  pageCount: number;
  itemsCount: number;
}

export interface IPaginationReqViewModel {
  page: number;
  count: number;
}

export interface IConfigModel {
  port: number;
  schedulerBaseUrl: string;
}

export interface ITranslateModel {
  en: string;
  hy: string;
  ru: string;
}

export interface ISubscribedUsersFilterModel {
  email: string;
  registrationDateEnd: Date;
  registrationDateStart: Date;
}

export interface IUsersFilterModel {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  emails: string[];
  phones: string[];
  userIds: string[];
  blocked: boolean;
  noOrderUsers: boolean;
  canceledOrdersCountFrom: number;
  canceledOrdersCountTo: number;
  finishedOrdersCountFrom: number;
  finishedOrdersCountTo: number;
  totalOrdersPriceFrom: number;
  totalOrdersPriceTo: number;
  registrationDateEnd: Date;
  registrationDateStart: Date;
  balance: number;
  balanceFrom: number;
  balanceTo: number;
  orderFromDate: Date;
  orderToDate: Date;
  activityFromDate: Date;
  activityToDate: Date;
}


export interface IPaymentData {
  orderId: IObjectId;
  uniqueId: string;
  amount: number;
  description?: string;
}

export interface IMessageModel {
  _id: string;
  message: string;
  messageType: number;
  createdDt: string;
  image: string;
}