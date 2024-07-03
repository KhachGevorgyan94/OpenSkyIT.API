import { Schema, model } from 'mongoose';

import { ISubCategoryViewModel, ISubCategoryModel, ISubCategory } from './model';
import { SchemaStatusEnum } from '../../helpers/enums';

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
    status: {
      type    : Number,
      enum    : [ SchemaStatusEnum.draft, SchemaStatusEnum.published ],
      default : SchemaStatusEnum.draft,
    },
    name: {
      hy: { type: String, required: true, },
      en: String,
      ru: String,
    },
    mainCategory: {
      type     : Schema.Types.ObjectId,
      ref      : 'MainCategory',
      required : true
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
    createdAt: {
      type    : Date,
      default : Date.now,
      select  : false
    },
    updatedAt: {
      type    : Date,
      default : Date.now,
      select  : false
    }
  }
);

schema.virtual('count', {
  ref: 'Company',
  localField: '_id',
  foreignField: 'categories',
});

schema.pre('validate', async function(next) {
  const _this = <ISubCategoryViewModel>this;
  _this.updatedAt = new Date();
  if (this.isNew) {
    _this.createdAt = new Date();
  }
  next();
});

export const subCategory: ISubCategoryModel = model<ISubCategory<any, any, any>, ISubCategoryModel>('Subcategory', schema);

export default subCategory;