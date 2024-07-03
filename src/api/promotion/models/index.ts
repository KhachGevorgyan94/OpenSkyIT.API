import { SchemaStatusEnum } from '../../../helpers/enums';
import { ITranslateModel }  from '../../../helpers/models';

export interface IAddPromotionBodyModel {
  name: ITranslateModel;
  description: ITranslateModel;
  slug : string;
  subtitle : ITranslateModel;
}

export interface IChangeStatusBodyModel {
  status: SchemaStatusEnum;
}

export interface IChangePositionBodyModel {
  from: number;
  to: number;
}