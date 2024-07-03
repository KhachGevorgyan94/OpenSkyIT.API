import { Schema, model } from 'mongoose';

import * as Models  from './model';
import { UserRole } from '../../helpers/enums';

const schema = new Schema({
  firstName: {
    type    : String,
    default : '',
  },
  lastName: {
    type    : String,
    default : '',
  },
  email: {
    type    : String,
    default : '',
    set     : function(value) {
      return value ? value.toLowerCase() : '';
    }
  },
  lesson: {
    type     : String,
    required : true,
  },
  phone: {
    type     : String,
    required : true,
  },
  role: {
    type    : Number,
    default : UserRole.customer,
  },
  deleted: {
    type    : Boolean,
    default : false,
  },
  blocked: {
    type    : Boolean,
    default : false
  },
  updatedAt: {
    type    : Date,
    default : Date.now,
  },
  createdAt: {
    type    : Date,
    default : Date.now,
  },
  forgotKey: {
    type    : String,
    default : null,
  },
});

schema.methods.shortDescription = function (): Models.IUserShortDescription {
  return {
    _id                : this._id,
    email              : this.email,
    firstName          : this.firstName,
    phone              : this.phone,
    role               : this.role,
  };
};

schema.statics.getIdListBySearch = async function(search: string): Promise<string[]> {
  const key                      = search.toString().replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '').trim();
  const _this: Models.IUserModel = this;
  const aggregation              = [
    {
      $match: {
        deleted : false,
        role    : UserRole.customer,
        blocked : false
      }
    },
    {
      $project: {
        _id   : 1,
        name  : { $concat: [ '$firstName', ' ', '$lastName' ] },
        phone : 1
      }
    },
    {
      $match: {
        $or: [
          { name: new RegExp(key, 'i') },
          { phone: new RegExp(key, 'i') }
        ]
      }
    }
  ];
  const list = await _this.aggregate(aggregation);
  return list.map(item => item._id);
};

export const user: Models.IUserModel = model<Models.IUser<any>, Models.IUserModel>('User', schema);

export default user;