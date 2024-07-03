import { Response, NextFunction } from 'express';
import * as Joi                   from 'joi';
import * as bcrypt                from 'bcrypt';

import Config         from '../../../config';
import * as Helpers   from '../../../helpers';
import { IRequest }   from '../../../helpers/models';
import * as Constants from '../../../helpers/services/constants';

//#region Schemas
import Admin from '../../../schemas/admin';
//#endregion

export const changePassword = async (req: IRequest, res: Response, next: NextFunction) => {
  try {
    const bodyValidation = {
      newConfirmPassword : Joi.string().required(),
      newPassword        : Joi.string().required(),
      oldPassword        : Joi.string().required(),
    };
    const result = Joi.validate(req.body, bodyValidation, { allowUnknown: true });
    if (result.error) {
      return Helpers.failedResponse(res, { message: 'All field are required' });
    }
    const isValid: boolean = await bcrypt.compare(req.body.oldPassword, req.user.password);
    if (!isValid) {
      return Helpers.failedResponse(res, { message: 'Not valid old password' });
    }
    if (req.body.newPassword === req.body.oldPassword) {
      return Helpers.failedResponse(res, { message: 'Old password and new password cannot be same' });
    }
    if (req.body.newPassword !== req.body.newConfirmPassword) {
      return Helpers.failedResponse(res, { message: 'New password does not match the new confirm password' });
    }
    return next();
  } catch (error) {
    Helpers.errorHandler(req, res, { error : error });
  }
};

export const changePasswordForAdmin = async (req: IRequest, res: Response, next: NextFunction) => {
  try {
    const bodyValidation = {
      password : Joi.string().required(),
    };
    const paramsValidation = { id: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required() };
    const paramsResult = Joi.validate(req.params, paramsValidation);
    if (paramsResult.error) {
      return Helpers.failedResponse(res, { message: 'Id is not valid' });
    }
    const result = Joi.validate(req.body, bodyValidation);
    if (result.error) {
      return Helpers.failedResponse(res, { message: 'All field are required' });
    }
    return next();
  } catch (error) {
    Helpers.errorHandler(req, res, { error : error });
  }
};

export const getList = async (req: IRequest, res: Response, next: NextFunction) => {
  try {
    const queryValidation = {
      role : Joi.number().required(),
    };
    const result = Joi.validate(req.query, queryValidation);
    if (result.error) {
      return Helpers.failedResponse(res, { message: 'All field are required' });
    }
    return next();
  } catch (error) {
    Helpers.errorHandler(req, res, { error : error });
  }
};

export const create = async (req: IRequest, res: Response, next: NextFunction) => {
  try {
    const language: any = req.headers.languagecode;
    if (req.body.phone && req.body.phone[0] === '+') req.body.phone = req.body.phone.slice(1, req.body.phone.length);
    const bodyValidation = {
      email     : Joi.string().regex(Config.emailRegex).required(),
      firstName : Joi.string().required(),
      lastName  : Joi.string().required(),
      password  : Joi.string().min(6).required(),
      role      : Joi.number().required(),
      phone     : Joi.string().required(),
    };
    const result = Joi.validate(req.body, bodyValidation);
    if (result.error) {
      return Helpers.failedResponse(res, { message: result.error.details[0].message });
    }
    if (req.body.phone.length !== 9 || !Helpers.isValidPhoneNumber(req.body.phone)) {
      return Helpers.failedResponse(res, { message: 'Not valid phone number' });
    }
    const admin = await Admin
      .findOne()
      .where({ email: req.body.email })
      .where({ deleted: false });
    if (admin) {
      return Helpers.failedResponse(res, { message: Constants.errorEmailExist[language] });
    }
    return next();
  } catch (error) {
    Helpers.errorHandler(req, res, { error : error });
  }
};

export const edit = async (req: IRequest, res: Response, next: NextFunction) => {
  try {
    const language: any = req.headers.languagecode;
    if (req.body.phone && req.body.phone[0] === '+') req.body.phone = req.body.phone.slice(1, req.body.phone.length);
    const bodyValidation = {
      email     : Joi.string().regex(Config.emailRegex).required(),
      phone     : Joi.string().required(),
      firstName : Joi.string().required(),
      lastName  : Joi.string().required(),
    };
    const result = Joi.validate(req.body, bodyValidation);
    if (result.error) {
      return Helpers.failedResponse(res, { message: result.error.details[0].message });
    }
    if (req.body.phone && (req.body.phone.length !== 9 || !Helpers.isValidPhoneNumber(req.body.phone))) {
      return Helpers.failedResponse(res, { message: 'Not valid phone number' });
    }
    const admin = await Admin
      .findOne()
      .where({ _id: { $ne: req.user._id } })
      .where({ email: req.body.email })
      .where({ deleted: false });
    if (admin) {
      return Helpers.failedResponse(res, { message: Constants.errorEmailExist[language] });
    }
    return next();
  } catch (error) {
    Helpers.errorHandler(req, res, { error : error });
  }
};

export const editWithAdmin = async (req: IRequest, res: Response, next: NextFunction) => {
  try {
    const language: any = req.headers.languagecode;
    if (req.body.phone && req.body.phone[0] === '+') req.body.phone = req.body.phone.slice(1, req.body.phone.length);
    const bodyValidation = {
      email     : Joi.string().regex(Config.emailRegex).required(),
      firstName : Joi.string().required(),
      lastName  : Joi.string().required(),
      phone     : Joi.string().required(),
      role      : Joi.number().required(),
    };
    const paramsValidation = { id: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required() };
    const paramsResult = Joi.validate(req.params, paramsValidation);
    if (paramsResult.error) {
      return Helpers.failedResponse(res, { message: 'Id is not valid' });
    }
    const result = Joi.validate(req.body, bodyValidation, { allowUnknown: true });
    if (result.error) {
      return Helpers.failedResponse(res, { message: result.error.details[0].message });
    }
    if (req.body.phone && (req.body.phone.length !== 9 || !Helpers.isValidPhoneNumber(req.body.phone))) {
      return Helpers.failedResponse(res, { message: 'Not valid phone number' });
    }
    if (req.body.firstName && req.body.firstName.length < 2) {
      return Helpers.failedResponse(res, { message: 'Not valid first name' });
    }
    if (req.body.lastName && req.body.lastName.length < 2) {
      return Helpers.failedResponse(res, { message: 'Not valid last name' });
    }
    const admin = await Admin
      .findOne()
      .where({ _id: { $ne: req.params.id } })
      .where({ email: req.body.email })
      .where({ deleted: false });
    if (admin) {
      return Helpers.failedResponse(res, { message: Constants.errorEmailExist[language] });
    }
    return next();
  } catch (error) {
    Helpers.errorHandler(req, res, { error : error });
  }
};

export const deleteAdmin = async(req: IRequest, res: Response, next: NextFunction) => {
  try {
    const paramsValidation = { id: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required() };
    const paramsResult = Joi.validate(req.params, paramsValidation);
    if (paramsResult.error) {
      return Helpers.failedResponse(res, { message: 'Id is not valid' });
    }
    return next();
  } catch (error) {
    Helpers.errorHandler(req, res, { error : error });
  }
};

export const upload = async(req: IRequest, res: Response, next: NextFunction) => {
  try {
    const paramsValidation = { id: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required() };
    const paramsResult = Joi.validate(req.params, paramsValidation);
    if (paramsResult.error) {
      return Helpers.failedResponse(res, { message: 'Id is not valid' });
    }
    return next();
  } catch (error) {
    Helpers.errorHandler(req, res, { error : error });
  }
};
