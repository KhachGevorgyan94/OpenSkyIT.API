import { Schema, model } from "mongoose";
import { ISubscribedUserModel, ISubscribedUser } from "./model";

const schema = new Schema({
  email: {
    type: String,
    default: "",
    set: function (value) {
      return value ? value.toLowerCase() : "";
    },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const subscribedUser: ISubscribedUserModel = model<
  any,
  ISubscribedUserModel
>("SubscribedUser", schema);

export default subscribedUser;
