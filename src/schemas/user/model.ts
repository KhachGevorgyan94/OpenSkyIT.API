import { Document, Model } from 'mongoose';

import { IPersonBaseModel } from '../../helpers/models';
import { UserRole } from '../../helpers/enums';

export interface IUserDocument<UA = string> extends IPersonBaseModel, Document {
  forgotKey: string;
  role:UserRole;
}

export interface IUser<UA = string> extends IUserDocument<UA> {
  shortDescription(): IUserShortDescription;
}

export interface IUserModel extends Model<IUser<any>> {
  getIdListBySearch(search: string): Promise<string[]>;
}

export interface IUserViewModel extends IPersonBaseModel {
  forgotKey: string;
  role:UserRole;
}

export interface IUserShortDescription {
  _id: string;
  email: string;
  firstName: string;
  phone: string;
  role: UserRole;
}

export interface IUserDocViewModel extends IUserViewModel, Document {
  shortDescription(): IUserShortDescription;
}

export interface IUserSchema extends Model<IUserDocViewModel> { }