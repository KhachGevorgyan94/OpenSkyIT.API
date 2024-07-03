import { Schema, model } from "mongoose";

// import Product  from '../product';
// import MenuItem from '../menuItem';

import { ICompanyViewModel, ICompanyModel, ICompany } from "./model";
import { SchemaStatusEnum } from "../../helpers/enums";

import * as SharedService from "../../api/shared-service";
import { OrderCounterTypeEnum } from "../../helpers/enums/order";
import { CompanyChooseBranchEnum } from "../../helpers/enums/company";

const workingHours = new Schema({
  workingHoursEnd: Date,
  workingHoursStart: Date,
});

const schema = new Schema({
  positionList: {
    type: Number,
    default: 1,
  },
  coverPhoto: {
    type: String,
    default: null,
  },
  status: {
    type: Number,
    enum: [
      SchemaStatusEnum.draft,
      SchemaStatusEnum.published,
      SchemaStatusEnum.deleted,
    ],
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
  slug: {
    type: String,
    default: null,
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
  duration: {
    type: String,
    default: null,
  },
  price: {
    type: Number,
    default: null,
  },
  newPrice: {
    type: Number,
    default: null,
  },
  start: {
    type: Date,
    default: Date.now,
    select: false,
  },
  tutor: [
    {
      type: Schema.Types.ObjectId,
      ref: "Tutor",
      required: true,
    },
  ],
  introductionTitle: {
    type: String,
    default: null,
  },
  introductionDescription: {
    type: String,
    default: null,
  },
  introductionTitle2: {
    type: String,
    default: null,
  },
  introductionDescription2: {
    type: String,
    default: null,
  },
  introductionTitle3: {
    type: String,
    default: null,
  },
  introductionDescription3: {
    type: String,
    default: null,
  },
});

schema.virtual("orders", {
  ref: "Order",
  localField: "_id",
  foreignField: "companies.company",
});

schema.pre("validate", async function (next) {
  const _this = <ICompanyViewModel>this;
  _this.updatedAt = new Date();

  if (this.isNew) {
    const ITEMS_COUNT: number = await SharedService.companyFilter({}).count();
    _this.positionList = ITEMS_COUNT + 1;
  }

  if (this.isModified("status") && _this.status === SchemaStatusEnum.deleted) {
    const items = await SharedService.companyFilter({})
      .where({ positionList: { $gte: _this.positionList } })
      .select("_id positionList");

    await Promise.all(
      items.map(async (item) => {
        item.positionList = item.positionList - 1;
        return item.save();
      })
    );

    _this.positionList = null;
  }

  next();
});

export const company: ICompanyModel = model<ICompany<any, any>, ICompanyModel>(
  "Company",
  schema
);

export default company;
