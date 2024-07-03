import { ITranslateModel, IObjectId } from '../../../helpers/models';
import { SchemaStatusEnum } from '../../../helpers/enums';

export interface IAddSubcategoryBodyModel {
  name: ITranslateModel;
  mainCategoryId?: IObjectId;
}

export interface IChangeStatusBodyModel {
  status: SchemaStatusEnum;
}

export interface IChangePositionBodyModel {
  from: number;
  to: number;
  mainCategoryId: IObjectId;
}