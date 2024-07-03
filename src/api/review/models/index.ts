import { SchemaStatusEnum } from '../../../helpers/enums';
import { ITranslateModel }  from '../../../helpers/models';

export interface IAddPromotionBodyModel {
  name: ITranslateModel;
  studied: string;
  comment : string;
}

export interface IChangeStatusBodyModel {
  status: SchemaStatusEnum;
}

export interface IChangePositionBodyModel {
  from: number;
  to: number;
}