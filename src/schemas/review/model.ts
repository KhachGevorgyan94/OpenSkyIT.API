import { Document, Model } from 'mongoose';

import { ITranslateModel }  from '../../helpers/models';
import { SchemaStatusEnum } from '../../helpers/enums';
import { PaymentMethod }    from '../../helpers/enums/order';

export interface IReviewDocument<CA = string, UA = string> extends Document {
  imagePath: string;
  iconPath: string;
  webImagePath: string;
  positionList: number;
  studied : string;
  comment : string;
  status: SchemaStatusEnum;
  name: ITranslateModel;
  createdBy: CA;
  updateBy: UA;
  createdAt: Date;
  updatedAt: Date;
}

export interface IReview<CA = string, UA = string> extends IReviewDocument<CA, UA> {
  count: number;
}

export interface IReviewModel extends Model<IReview<any, any>> {

}

export interface IReviewViewModel<User = string> extends Document {
  imagePath: string;
  webImagePath: string;
  positionList: number;
  studied : string;
  comment : string;
  status: SchemaStatusEnum;
  createdAt: Date;
  updatedAt: Date;
  name: ITranslateModel;
  createdBy: User;
  updateBy: User;
  workingPlace : string;
  workingPosition : string;
}