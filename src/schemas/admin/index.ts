import { Schema, model } from 'mongoose';
import * as bcrypt              from 'bcrypt';

import { IAdminShortViewModel, IAdminModel, IAdmin } from './model';
import { UserRole }                                  from '../../helpers/enums';

const schema = new Schema({
  firstName: {
    type     : String,
    required : true,
  },
  lastName: {
    type     : String,
    required : true,
  },
  email: {
    type     : String,
    required : true,
    unique   : true,
    set: function(value) {
      return value ? value.toLowerCase() : '';
    }
  },
  image: {
    type: String,
  },
  password: {
    type     : String,
    required : true,
  },
  phone     : {
    type     : String,
    required : true,
  },
  role: {
    type    : Number,
    enum    : [ UserRole.admin, UserRole.dispatcher, UserRole.operator, UserRole.dispatcherAdmin ],
    default : UserRole.customer,
  },
  deleted: {
    type    : Boolean,
    default : false,
  },
  updatedAt: {
    type    : Date,
    default : Date.now,
  },
  createdAt: {
    type    : Date,
    default : Date.now,
  },
});

schema.pre('validate', async function(next) {
  const _this = <IAdmin>this;
  _this.updatedAt = new Date();
  if (this.isModified('password') || this.isNew) {
    if (this.isNew) _this.createdAt = new Date();
    _this.password = await bcrypt.hash(_this.password, 12);
  }
  next();
});

schema.methods.short = function (): IAdminShortViewModel {
  return {
    _id       : this._id,
    email     : this.email,
    firstName : this.firstName,
    lastName  : this.lastName,
    phone     : this.phone,
    role      : this.role,
    image     : this.image,
  };
};

export const admin: IAdminModel = model<IAdmin, IAdminModel>('Admin', schema);

export default admin;
