import { Document, Model } from 'mongoose';

import { SchemaStatusEnum } from '../../helpers/enums';

export interface IResumeDocument<CA = string, UA = string> extends Document {
  imagePath: string;
  status: SchemaStatusEnum;
  createdAt: Date;
  name: string;
  phoneNumber: string;
  email: string;
  deleted: Boolean;
}

export interface IResume<CA = string, UA = string> extends IResumeDocument<CA, UA> {
  count: number;
}

export interface IResumeModel extends Model<IResume<any, any>> {

}

export interface IResumeViewModel<User = string> extends Document {
  imagePath: string;
  status: SchemaStatusEnum;
  createdAt: Date;
  name: string;
  phoneNumber: string;
  email: string;
  deleted: Boolean;
}