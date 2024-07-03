import { Document, Model } from "mongoose";

export interface IGalleryDocument<CA = string, UA = string> extends Document {
  src: string;
  createdBy: CA;
  updateBy: UA;
  createdAt: Date;
  updatedAt: Date;
}

export interface IGallery<CA = string, UA = string>
  extends IGalleryDocument<CA, UA> {
  count: number;
}

export interface IGalleryModel extends Model<IGallery<any, any>> {}

export interface IGalleryViewModel<User = string> extends Document {
  src: string;
  createdAt: Date;
  updatedAt: Date;
  createdBy: User;
  updateBy: User;
}
