import { SchemaStatusEnum } from '../../../helpers/enums';
import { ITranslateModel }  from '../../../helpers/models';

export interface IAddCategoryBodyModel {
  name: ITranslateModel;
  workingPlace : string;
  workingPosition : string;
}

export interface IChangeStatusBodyModel {
  status: SchemaStatusEnum;
}

export interface IChangePositionBodyModel {
  from: number;
  to: number;
}