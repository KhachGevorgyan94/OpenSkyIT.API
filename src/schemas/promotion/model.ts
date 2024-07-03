import { Document, Model } from 'mongoose';

import { ITranslateModel }  from '../../helpers/models';
import { SchemaStatusEnum } from '../../helpers/enums';
import { PaymentMethod }    from '../../helpers/enums/order';

export interface IPromotionDocument<CA = string, UA = string> extends Document {
  imagePath: string;
  webImagePath: string;
  positionList: number;
  status: SchemaStatusEnum;
  name: ITranslateModel;
  subtitle:ITranslateModel;
  description: ITranslateModel;
  slug : string;
  createdBy: CA;
  updateBy: UA;
  createdAt: Date;
  updatedAt: Date;
  deleted: Boolean;
}

export interface IPromotion<CA = string, UA = string> extends IPromotionDocument<CA, UA> {
  count: number;
}

export interface IPromotionModel extends Model<IPromotion<any, any>> {

}

export interface IPromotionViewModel<User = string> extends Document {
  imagePath: string;
  webImagePath: string;
  count: number;
  positionList: number;
  status: SchemaStatusEnum;
  createdAt: Date;
  updatedAt: Date;
  name: ITranslateModel;
  subtitle : ITranslateModel;
  description: ITranslateModel;
  createdBy: User;
  updateBy: User;
  deleted: Boolean;
}