import { Document, Model } from 'mongoose';
import { OrderStatusEnum } from '../../helpers/enums/order';

export interface ISettingsDocument extends Document {
  homeBanner: string[];
  title : string;
  description : string;
}

export interface ISettings extends ISettingsDocument {

}

export interface ISettingsModel extends Model<ISettings> {

}