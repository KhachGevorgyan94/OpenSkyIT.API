import { Schema, model } from "mongoose";

import { ICVViewModel, ICVModel, ICV } from "./model";

const schema = new Schema({
  pdf: {
    type: Buffer,
    default: null,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    select: false,
  },
});

schema.pre("validate", async function (next) {
  next();
});

export const cv: ICVModel = model<
  ICV<any, any>,
  ICVModel
>("CV", schema);

export default cv;
