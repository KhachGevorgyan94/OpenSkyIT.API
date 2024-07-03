import { SchemaStatusEnum } from '../../../helpers/enums';
import { ITranslateModel }  from '../../../helpers/models';

export interface IAddCareersBodyModel {
  name: ITranslateModel;
  description: ITranslateModel;
  slug : string;
}

export interface IChangeStatusBodyModel {
  status: SchemaStatusEnum;
}

export interface IChangePositionBodyModel {
  from: number;
  to: number;
}