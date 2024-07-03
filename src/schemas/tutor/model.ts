import { Document, Model } from 'mongoose';

import { ITranslateModel }  from '../../helpers/models';
import { SchemaStatusEnum } from '../../helpers/enums';
import { PaymentMethod }    from '../../helpers/enums/order';

export interface IMainCategoryDocument<CA = string, UA = string> extends Document {
  imagePath: string;
  iconPath: string;
  webImagePath: string;
  positionList: number;
  workingPlace : string;
  workingPosition : string;
  status: SchemaStatusEnum;
  name: ITranslateModel;
  createdBy: CA;
  updateBy: UA;
  createdAt: Date;
  updatedAt: Date;
}

export interface IMainCategory<CA = string, UA = string> extends IMainCategoryDocument<CA, UA> {
  count: number;
}

export interface IMainCategoryModel extends Model<IMainCategory<any, any>> {

}

export interface IMainCategoryViewModel<User = string> extends Document {
  imagePath: string;
  webImagePath: string;
  positionList: number;
  status: SchemaStatusEnum;
  createdAt: Date;
  updatedAt: Date;
  name: ITranslateModel;
  createdBy: User;
  updateBy: User;
  workingPlace : string;
  workingPosition : string;
}