import { Document, Model } from 'mongoose';


import { ITranslateModel, IObjectId } from '../../helpers/models';

export interface ICompanyDocument<CA = string, UA = string,> extends Document {
  coverPhoto: string;
  createdAt: Date;
  createdBy: CA;
  name: ITranslateModel;
  positionList: number;
  status: number;
  updateBy: UA;
  updatedAt: Date;
  description :ITranslateModel; 
  duration : string;
  price : number;
  newPrice : number;
  start : Date;
  tutor: string[];
  introductionTitle:string;
  introductionDescription : string;
  introductionTitle2 : string;
  introductionDescription2 : string;
  introductionTitle3 : string;
  introductionDescription3: string;
  slug : string;
}

export interface ICompany <CA = string, UA = string> extends ICompanyDocument<CA, UA> {

}

export interface ICompanyModel extends Model<ICompany<any, any>> {

}

export interface ICompanyViewModel<User = string> extends Document {
  coverPhoto: string;
  createdAt: Date;
  createdBy: User;
  name: ITranslateModel;
  positionList: number;
  status: number;
  updateBy: User;
  updatedAt: Date;
  description :ITranslateModel; 
  duration : string;
  price : number;
  newPrice : number;
  start : Date;
  tutor: string[];
  introductionTitle:string;
  introductionDescription : string;
  introductionTitle2 : string;
  introductionDescription2 : string;
  introductionTitle3 : string;
  introductionDescription3: string;
}