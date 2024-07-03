import { Document, Model } from 'mongoose';

import { ITranslateModel, IObjectId } from '../../helpers/models';
import { SchemaStatusEnum } from '../../helpers/enums';

export interface ISubCategoryDocument<MC = string, CA = string, UA = string> extends Document {
  imagePath: string;
  positionList: number;
  status: number;
  name: ITranslateModel;
  mainCategory: MC;
  createdBy: CA;
  updateBy: UA;
  createdAt: Date;
  updatedAt: Date;
}

export interface ISubCategory<MC = string, CA = string, UA = string> extends ISubCategoryDocument<MC, CA, UA> {

}

export interface ISubCategoryModel extends Model<ISubCategory<any, any, any>> {

}

export interface ISubCategoryViewModel<User = string> extends Document {
  positionList: number;
  status: SchemaStatusEnum;
  createdAt: Date;
  updatedAt: Date;
  mainCategory: IObjectId;
  name: ITranslateModel;
  createdBy: User;
  updateBy: User;
}