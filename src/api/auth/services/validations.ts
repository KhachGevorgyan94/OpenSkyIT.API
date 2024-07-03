import { Response, NextFunction } from 'express';
import * as Joi                   from 'joi';
import * as bcrypt                from 'bcrypt';

import Config         from '../../../config';
import * as Helpers   from '../../../helpers';
import * as Constants from '../../../helpers/services/constants';
import { IRequest }   from '../../../helpers/models';

//#region Schemas

import User           from '../../../schemas/user';
import Admin          from '../../../schemas/admin';
import { ITokenByVC } from '../models';

//#endregion

export const token = async (req: IRequest, res: Response, next: NextFunction) => {
  const language: any = req.headers.languagecode;
  const bodyValidation = {
    email    : Joi.string().required(),
    password : Joi.required(),
  };
  const result = Joi.validate(req.body, bodyValidation, { allowUnknown: true });
  if (result.error) {
    return Helpers.failedResponse(res, { message: Constants.errorIncorrectLogin[language] });
  }
  const user = await User.findOne({
    $or: [
      { email: req.body.email.toLowerCase() },
      { phone: req.body.email },
    ]
  });
  if (!user) {
    return Helpers.failedResponse(res, { message: Constants.errorIncorrectLogin[language] });
  }
  const isValid: boolean = await bcrypt.compare(req.body.password, user.password);
  if (!isValid) {
    return Helpers.failedResponse(res, { message: Constants.errorIncorrectLogin[language] });
  }
  if (req.body.password < 6) {
    return Helpers.failedResponse(res, { message: Constants.errorWrongPassword[language] });
  }
  return next();
};

export const tokenByVC = async (req: IRequest, res: Response, next: NextFunction) => {
  const language: any = req.headers.languagecode;
  const bodyValidation = {
    phone            : Joi.string().required(),
    verificationCode : Joi.string().required(),
  };
  const BODY: ITokenByVC = req.body;
  const result = Joi.validate(BODY, bodyValidation, { allowUnknown: true });
  if (result.error) {
    return Helpers.failedResponse(res, { message: Constants.errorIncorrectLogin[language] });
  }

  return next();
};

export const logout = async (req: IRequest, res: Response, next: NextFunction) => {
  const bodyValidation = {
    deviceId : Joi.string().required(),
  };
  const result = Joi.validate(req.body, bodyValidation, { allowUnknown: true });
  if (result.error) {
    return Helpers.failedResponse(res, { message: result.error.details[0].message });
  }
  return next();
};

export const adminToken = async (req: IRequest, res: Response, next: NextFunction) => {
  const language: any = req.headers.languagecode;
  const bodyValidation = {
    email    : Joi.string().regex(Config.emailRegex).required(),
    password : Joi.required(),
  };
  const result = Joi.validate(req.body, bodyValidation, { allowUnknown: true });
  const admin = await Admin.findOne({ email: req.body.email.toLowerCase() });
  if (!admin) {
    return Helpers.failedResponse(res, { message: Constants.errorIncorrectLogin[language] });
  }
  if (req.body.password < 6) {
    return Helpers.failedResponse(res, { message: Constants.errorWrongPassword[language] });
  }
  const isValid: boolean = await bcrypt.compare(req.body.password, admin.password);
  if (!isValid) {
    return Helpers.failedResponse(res, { message: Constants.errorIncorrectLogin[language] });
  }
  if (result.error) {
    return Helpers.failedResponse(res, { message: Constants.errorIncorrectLogin[language] });
  }
  return next();
};

export const forgotKey = async (req: IRequest, res: Response, next: NextFunction) => {
  try {
    const language: any = req.headers.languagecode;
    const bodyValidation = {
      email: Joi.string().required()
    };
    const result = Joi.validate(req.body, bodyValidation, { allowUnknown: true });
    if (result.error) {
      return Helpers.failedResponse(res, { message: Constants.errorInvalidEmail[language] });
    }
    const user = await User.findOne({
      $or : [
        { email: req.body.email.toLowerCase() },
        { phone: req.body.email },
      ]
    });
    if (!user) {
      return Helpers.failedResponse(res, { message: Constants.errorPersonNotFound[language] });
    }
    return next();
  } catch (error) {
    Helpers.errorHandler(req, res, { error : error });
  }
};

export const checkForgotKey = async (req: IRequest, res: Response, next: NextFunction) => {
  try {
    const language: any = req.headers.languagecode;
    const bodyValidation = {
      email     : Joi.string().required(),
      forgotKey : Joi.string().required()
    };
    const result = Joi.validate(req.body, bodyValidation, { allowUnknown: true });
    if (result.error) {
      return Helpers.failedResponse(res, { message: result.error.details[0].message });
    }
    const user = await User.findOne({
      $or : [
        { email: req.body.email.toLowerCase() },
        { phone: req.body.email },
      ]
    });
    if (!user) {
      return Helpers.failedResponse(res, { message: Constants.errorPersonNotFound[language] });
    }
    return next();
  } catch (error) {
    Helpers.errorHandler(req, res, { error : error });
  }
};

export const resetPassword = async (req: IRequest, res: Response, next: NextFunction) => {
  try {
    const language: any = req.headers.languagecode;
    const bodyValidation = {
      email           : Joi.string().required(),
      forgotKey       : Joi.string().required(),
      newPassword     : Joi.string().required(),
      confirmPassword : Joi.string().required(),
    };
    const result = Joi.validate(req.body, bodyValidation, { allowUnknown: true });
    if (result.error) {
      return Helpers.failedResponse(res, { message: result.error.details[0].message });
    }
    const user = await User.findOne({
      $or : [
        { email: req.body.email.toLowerCase() },
        { phone: req.body.email },
      ]
    });
    if (!user) {
      return Helpers.failedResponse(res, { message: Constants.errorPersonNotFound[language] });
    }
    if (req.body.newPassword !== req.body.confirmPassword) {
      return Helpers.failedResponse(res, { message: Constants.errorDoesNotMatchPassword[language] });
    }
    return next();
  } catch (error) {
    Helpers.errorHandler(req, res, { error : error });
  }
};