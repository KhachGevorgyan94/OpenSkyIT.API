import { Schema, model } from 'mongoose';

import { IMainCategoryViewModel, IMainCategory, IMainCategoryModel } from './model';
import { SchemaStatusEnum } from '../../helpers/enums';
import { PaymentMethod }    from '../../helpers/enums/order';

const schema = new Schema(
  {
    imagePath: {
      type    : String,
      default : null
    },
    positionList: {
      type    : Number,
      default : 0
    },
    workingPlace: {
      type    : String,
      default : null
    },
    workingPosition: {
      type    : String,
      default : null
    },
    status: {
      type    : Number,
      enum    : [ SchemaStatusEnum.draft, SchemaStatusEnum.published ],
      default : SchemaStatusEnum.draft,
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
    name: {
      hy: { type: String, required: true, },
      en: String,
      ru: String,
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

schema.virtual('count', {
  ref: 'Company',
  localField: '_id',
  foreignField: 'mainCategories',
});

schema.pre('validate', async function(next) {
  const _this = <IMainCategoryViewModel>this;
  _this.updatedAt = new Date();
  if (this.isNew) {
    const ITEMS_COUNT: number = await this.collection.count();
    _this.positionList = ITEMS_COUNT + 1;
    _this.createdAt = new Date();
  }
  next();
});

export const mainCategory: IMainCategoryModel = model<IMainCategory, IMainCategoryModel>('Tutor', schema);

export default mainCategory;