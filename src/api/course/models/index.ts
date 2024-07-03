import { IPaginationReqViewModel } from './../../../helpers/models/index';
import { IObjectId, ITranslateModel } from '../../../helpers/models';
import { SchemaStatusEnum } from '../../../helpers/enums';
import { OrderCounterTypeEnum } from '../../../helpers/enums/order';
import { SortBy } from '../enums';
import { CompanyChooseBranchEnum } from '../../../helpers/enums/company';

export interface IGetCompaniesQueryModel extends IGetCompaniesQueryBaseModel {
  count: number;
  page: number;
}
export interface IGetCompaniesQueryBaseModel {
  mainCategoryId?: string;
  subcategoryId?: string;
  sortBy?: SortBy;
  latitude?: number;
  longitude?: number;
}

export interface IGetCompaniesByFilterBodyModel extends IPaginationReqViewModel {
  mainCategoryId: IObjectId;
  name: string;
  subcategoryId?: IObjectId;
  sortBy?: number;
}

export interface ICreateCompanyBodyModel {
  name          : ITranslateModel;
  description   : ITranslateModel;
  start: Date;
  tutor: string[];
  duration : string;
  price : number;
  newPrice : number;
  introductionTitle:string;
  introductionDescription : string;
  introductionTitle2 : string;
  introductionDescription2 : string;
  introductionTitle3 : string;
  introductionDescription3: string;
  slug : string;
}

export interface IEditCompanyBodyModel {
  name          : ITranslateModel;
  description   : ITranslateModel;
  start: Date;
  tutor: string[];
  duration : string;
  price : number;
  newPrice : number;
  introductionTitle:string;
  introductionDescription : string;
  introductionTitle2 : string;
  introductionDescription2 : string;
  introductionTitle3 : string;
  introductionDescription3: string;
  slug: string;
}

export interface IChangeStatusBodyModel {
  status: SchemaStatusEnum;
}

export interface IGetCompanyBodyModel {
  status: SchemaStatusEnum;
  deliveryFeeFrom: number;
  deliveryFeeTo: number;
  ratingFrom: number;
  ratingTo: number;
  name: string;
  dateFrom: Date;
  dateTo: Date;
}

export interface IChangePositionBodyModel {
  from: number;
  to: number;
}

export interface IAddCompanyCashOut {
  amount: number;
}
