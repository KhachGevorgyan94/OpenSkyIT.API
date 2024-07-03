import { Document, Model } from 'mongoose';

import { ITranslateModel }  from '../../helpers/models';
import { SchemaStatusEnum } from '../../helpers/enums';
import { PaymentMethod }    from '../../helpers/enums/order';

export interface ICareersDocument<CA = string, UA = string> extends Document {
  imagePath: string;
  webImagePath: string;
  positionList: number;
  status: SchemaStatusEnum;
  name: ITranslateModel;
  description: ITranslateModel;
  slug : string;
  createdBy: CA;
  updateBy: UA;
  createdAt: Date;
  updatedAt: Date;
}

export interface ICareers<CA = string, UA = string> extends ICareersDocument<CA, UA> {
  count: number;
}

export interface ICareersModel extends Model<ICareers<any, any>> {

}

export interface ICareersViewModel<User = string> extends Document {
  imagePath: string;
  webImagePath: string;
  count: number;
  positionList: number;
  status: SchemaStatusEnum;
  createdAt: Date;
  updatedAt: Date;
  name: ITranslateModel;
  description: ITranslateModel;
  createdBy: User;
  updateBy: User;
}