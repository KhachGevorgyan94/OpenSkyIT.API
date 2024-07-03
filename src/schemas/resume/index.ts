import { Schema, model } from "mongoose";

import { IResume, IResumeModel, IResumeViewModel } from "./model";
import { SchemaStatusEnum } from "../../helpers/enums";

const schema = new Schema({
  imagePath: {
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
  name: {
    type: String,
    default: null,
  },
  phoneNumber: {
    type: String,
    default: null,
  },
  email: {
    type: String,
    default: null,
  },
});

schema.pre("validate", async function (next) {
  const _this = <IResumeViewModel>this;
  if (this.isNew) {
    const ITEMS_COUNT: number = await this.collection.count();
    _this.createdAt = new Date();
  }
  next();
});

export const resume: IResumeModel = model<IResume, IResumeModel>(
  "Resume",
  schema
);

export default resume;
