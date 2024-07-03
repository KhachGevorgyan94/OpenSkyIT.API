import { Document, Model } from 'mongoose';


import { ITranslateModel, IObjectId } from '../../helpers/models';

export interface ICVDocument<CA = string, UA = string,> extends Document {
  pdf: Buffer;
  createdAt: Date;
}

export interface ICV <CA = string, UA = string> extends ICVDocument<CA, UA> {

}

export interface ICVModel extends Model<ICV<any, any>> {

}

export interface ICVViewModel<User = string> extends Document {
  pdf: Buffer;
  createdAt: Date;
}