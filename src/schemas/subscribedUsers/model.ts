import { Model } from "mongoose";

export interface ISubscribedUserModel extends Model<any> {
  email: string;
  createdAt: Date;
}

export interface ISubscribedUserDocument  {
  email: string;
  createdAt: Date;
}

export interface ISubscribedUser extends ISubscribedUserDocument {
  email: string;
  createdAt: Date;
}
