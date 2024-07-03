import { Schema, model } from 'mongoose';

import { IDeviceTokenModel, IDeviceToken } from './model';

const schema = new Schema(
  {
    token: {
      type    : String,
      default : null
    },
    osType: {
      type    : Number,
      default : null
    },
    deviceId: {
      type    : String,
      default : null,
      unique  : true
    },
    language: {
      type    : String,
      default : 'hy'
    },
    user : {
      type    : Schema.Types.ObjectId,
      refPath: 'referencePath',
      default : null
    },
    referencePath: {
      type : String,
      enum : ['User', 'Driver', null]
    }
  }
);

export const deviceToken: IDeviceTokenModel = model<IDeviceToken<any>, IDeviceTokenModel>('DeviceToken', schema);

export default deviceToken;