import { Document, Model } from 'mongoose';

import { IUserViewModel } from '../user/model';

export interface IDeviceTokenDocument<U = string> extends Document {
  token: string;
  osType: number;
  deviceId: string;
  language: string;
  user: U;
  referencePath: string;
}

export interface IDeviceToken<U = string> extends IDeviceTokenDocument<U> {

}

export interface IDeviceTokenModel extends Model<IDeviceToken<any>> {

}

export interface IDeviceTokenViewModel extends Document {
  token: string;
  osType: string;
  deviceId: string;
  language: string;
  user?: IUserViewModel;
  referencePath: string;
}