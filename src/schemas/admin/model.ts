import { Document, Model } from 'mongoose';

import { IPersonBaseModel } from '../../helpers/models';
import { UserRole }         from '../../helpers/enums';


export interface IAdminDocument extends IPersonBaseModel, Document {
  image: string;
}

export interface IAdmin extends IAdminDocument {
  short(): IAdminShortViewModel;
}

export interface IAdminModel extends Model<IAdmin> {}

export interface IAdminShortViewModel {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  role: UserRole;
  image: string;
}