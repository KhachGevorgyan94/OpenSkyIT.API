import { Schema, model } from "mongoose";

import { ISettingsModel, ISettings } from "./model";

const schema = new Schema({
  homeBanner: [String],
  title: {
    type: String,
    default: null,
  },
  description: {
    type: String,
    default: null,
  },
});

export const subCategory: ISettingsModel = model<ISettings, ISettingsModel>(
  "Settings",
  schema
);

export default subCategory;
