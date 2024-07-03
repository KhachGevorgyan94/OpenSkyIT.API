import { Schema, model } from "mongoose";

import { IPromotionViewModel, IPromotion, IPromotionModel } from "./model";
import { SchemaStatusEnum } from "../../helpers/enums";
import { PaymentMethod } from "../../helpers/enums/order";

const schema = new Schema({
  imagePath: {
    type: String,
    default: null,
  },
  webImagePath: {
    type: String,
    default: null,
  },
  positionList: {
    type: Number,
    default: 0,
  },
  slug: {
    type: String,
    default: null,
  },
  status: {
    type: Number,
    enum: [SchemaStatusEnum.draft, SchemaStatusEnum.published],
    default: SchemaStatusEnum.draft,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    select: false,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
    select: false,
  },
  name: {
    hy: { type: String, required: true },
    en: String,
    ru: String,
  },
  description: {
    hy: { type: String, required: true },
    en: String,
    ru: String,
  },
  subtitle: {
    hy: { type: String, required: false },
    en: String,
    ru: String,
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: "Admin",
    required: true,
    select: false,
  },
  updateBy: {
    type: Schema.Types.ObjectId,
    ref: "Admin",
    required: true,
    select: false,
  },
});

schema.pre("validate", async function (next) {
  const _this = <IPromotionViewModel>this;
  _this.updatedAt = new Date();
  if (this.isNew) {
    const ITEMS_COUNT: number = await this.collection.count();
    _this.positionList = ITEMS_COUNT + 1;
    _this.createdAt = new Date();
  }
  next();
});

export const promotion: IPromotionModel = model<IPromotion, IPromotionModel>(
  "Promotion",
  schema
);

export default promotion;
