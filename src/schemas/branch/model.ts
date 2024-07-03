import { ITranslateModel } from './../../helpers/models/index';
import { Document, Model } from 'mongoose';

import { IUserViewModel }    from '../user/model';
import { ICompanyViewModel } from '../course/model';
import { SchemaStatusEnum }        from '../../helpers/enums';
import { IObjectId }         from '../../helpers/models';

export interface IBranchDocument<C = string, CA = string, UA = string> extends Document {
  isFullTime: boolean;
  status: number;
  createdAt: Date;
  updatedAt: Date;
  mainCompany: C;
  isClosed: boolean;
  natDbId: number;
  address: string;
  latitude: number;
  longitude: number;
  country: string;
  city: string;
  workingHours: Array<{
    workingHoursEnd: Date;
    workingHoursStart: Date;
  }>;
  createdBy: CA;
  updateBy: UA;
  nearest: boolean;
  phoneNumber1: string;
  phoneNumber2: string;
  phoneNumber3: string;
  addressArm : string;
  addressRu : string;
  name: ITranslateModel;
}

export interface IBranch <C = string, CA = string, UA = string> extends IBranchDocument<C, CA, UA> {

}

export interface IBranchModel extends Model<IBranch<any, any, any>> {

}

export interface IBranchViewModel<Company = IObjectId> extends Document {
  isFullTime: boolean;
  address: string;
  country: string;
  createdAt: Date;
  createdBy: IUserViewModel;
  addressArm : string;
  addressRu : string;
  isClosed: boolean;
  latitude: number;
  longitude: number;
  mainCompany: Company;
  status: SchemaStatusEnum;
  rating: number;
  updateBy: IUserViewModel;
  updatedAt: Date;
  city: string;
  workingHours: Array<{
    workingHoursEnd: Date;
    workingHoursStart: Date;
  }>;
  phoneNumber1: string;
  phoneNumber2: string;
  phoneNumber3: string;
  name: ITranslateModel;
}