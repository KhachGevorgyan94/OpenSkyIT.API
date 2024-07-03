import { Schema, model } from 'mongoose';

import { IGalleryViewModel, IGallery, IGalleryModel } from './model';

const schema = new Schema(
  {
    src: {
      type    : String,
      default : null
    },
    width: {
      type    : Number,
      default : 0
    },
    height: {
      type    : Number,
      default : 0
    },
    positionList: {
      type    : Number,
      default : 0
    },
    createdAt: {
      type    : Date,
      default : Date.now,
      select  : false
    },
    updatedAt: {
      type    : Date,
      default : Date.now,
      select  : false
    },
    createdBy: {
      type     : Schema.Types.ObjectId,
      ref      : 'Admin',
      required : true,
      select   : false
    },
    updateBy: {
      type     : Schema.Types.ObjectId,
      ref      : 'Admin',
      required : true,
      select   : false
    },
  }
);

schema.pre('validate', async function(next) {
  const _this = <IGalleryViewModel>this;
  _this.updatedAt = new Date();
  if (this.isNew) {
    const ITEMS_COUNT: number = await this.collection.count();
    _this.createdAt = new Date();
  }
  next();
});

export const gallery: IGalleryModel = model<IGallery, IGalleryModel>('Gallery', schema);

export default gallery;