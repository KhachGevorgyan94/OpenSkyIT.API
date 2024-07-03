import { UserRole } from './../../../helpers/enums/index';

//#region Models

import { IResponseObjectViewModel, IRequest, IObjectId, IPersonBaseModel } from '../../../helpers/models';

//#endregion

//#region Schemas

import Admin from '../../../schemas/admin';
import { ICreateAdmin, IEditAdminModel } from '../models';

//#endregion

export const upload = async (id: IObjectId, files: any): Promise<IResponseObjectViewModel> => {
  try {
    const admin = await Admin.findById(id);
    admin.image = files.imagePath && files.imagePath[0].filename;
    admin.save();
    return {
      success : true,
      data    : null,
      message : 'Successfully updated'
    };
  } catch (error) { throw error; }
};

export const changePassword = async (password: string, user: IPersonBaseModel): Promise<IResponseObjectViewModel> => {
  try {
    const admin = await Admin.findById(user._id);
    admin.password = password;
    admin.save();
    return {
      success : true,
      data    : null,
      message : 'Successfully updated'
    };
  } catch (error) { throw error; }
};

export const changePasswordForAdmin = async (password: string, id: IObjectId): Promise<IResponseObjectViewModel> => {
  try {
    const admin = await Admin.findById(id);
    admin.password = password;
    admin.save();
    return {
      success : true,
      data    : null,
      message : 'Successfully updated'
    };
  } catch (error) { throw error; }
};

export const create = async (body: ICreateAdmin): Promise<IResponseObjectViewModel> => {
  try {
    const admin = await Admin.create({
      firstName : body.firstName,
      lastName  : body.lastName,
      email     : body.email,
      phone     : body.phone,
      password  : body.password,
      role      : body.role,
    });
    return {
      success : true,
      data    : admin._id,
      message : 'Successfully created'
    };
  } catch (error) { throw error; }
};

export const edit = async (body: IEditAdminModel, user: IPersonBaseModel): Promise<IResponseObjectViewModel> => {
  try {
    const admin = await Admin.findById(user._id);
    admin.firstName = body.firstName;
    admin.lastName = body.lastName;
    admin.email = body.email;
    admin.phone = body.phone;
    admin.save();
    return {
      success : true,
      data    : null,
      message : 'Successfully updated'
    };
  } catch (error) { throw error; }
};

export const editWithAdmin = async (body: IEditAdminModel, id: IObjectId): Promise<IResponseObjectViewModel> => {
  try {
    const admin = await Admin.findById(id);
    admin.firstName = body.firstName;
    admin.lastName = body.lastName;
    admin.email = body.email;
    admin.phone = body.phone;
    // admin.role = body.role;
    admin.save();
    return {
      success : true,
      data    : null,
      message : 'Successfully updated'
    };
  } catch (error) { throw error; }
};

export const getList = async (role: UserRole): Promise<IResponseObjectViewModel> => {
  try {
    const data = await Admin
      .find()
      .where({ role: role })
      .where({ deleted: false })
      .sort('-createdAt')
      .select({
        firstName : 1,
        lastName  : 1,
        email     : 1,
        phone     : 1,
        createdAt : 1,
        image     : 1,
      });
    return {
      success : true,
      data    : data,
      message : 'Successfully updated'
    };
  } catch (error) { throw error; }
};

export const deleteAdmin = async (id: IObjectId): Promise<IResponseObjectViewModel> => {
  try {
    const admin = await Admin.findById(id);
    admin.deleted = true;
    admin.save();
    return {
      success : true,
      data    : null,
      message : 'ok'
    };
  } catch (error) { throw error; }
};
