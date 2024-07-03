import { Response, NextFunction } from "express";
import * as Joi from "joi";

import * as Helpers from "../../../helpers";

import { IRequest } from "../../../helpers/models";
import { ICreateUser } from "../models";
import Config from "../../../config";
import * as Constants from "../../../helpers/services/constants";
import User from "../../../schemas/user";
import * as AppValidation from "../../../helpers/services/validation";

export const instaServiceApply = async (
  req : IRequest,
  res : Response,
  next: NextFunction
) => {
  try {
    const bodyValidation = {
      name       : Joi.string().required(),
      phoneNumber: Joi.string().required(),
      companyName: Joi.string().required(),
      comment    : Joi.string().optional().allow(""),
      category   : Joi.string().required(),
      city       : Joi.string().required(),
    };
    const result = Joi.validate(req.body, bodyValidation);
    if (result.error) {
      return Helpers.failedResponse(res, {
        message: result.error.details[0].message,
      });
    }
    return next();
  } catch (error) {
    Helpers.errorHandler(req, res, { error: error });
  }
};

export const fda = async (
  req : IRequest,
  res : Response,
  next: NextFunction
) => {
  try {
    const bodyValidation = {
      name   : Joi.string().required(),
      email  : Joi.string().required(),
      message: Joi.string().required(),
    };
    const result = Joi.validate(req.body, bodyValidation);
    if (result.error) {
      return Helpers.failedResponse(res, {
        message: result.error.details[0].message,
      });
    }
    return next();
  } catch (error) {
    Helpers.errorHandler(req, res, { error: error });
  }
};


export const hybrid = async (
  req : IRequest,
  res : Response,
  next: NextFunction
) => {
  try {
    const bodyValidation = {
      name   : Joi.string().required(),
      email  : Joi.string().required(),
      message: Joi.string().required(),
    };
    const result = Joi.validate(req.body, bodyValidation);
    if (result.error) {
      return Helpers.failedResponse(res, {
        message: result.error.details[0].message,
      });
    }
    return next();
  } catch (error) {
    Helpers.errorHandler(req, res, { error: error });
  }
};

export const register = async (
  req : IRequest,
  res : Response,
  next: NextFunction
) => {
  try {
    const bodyValidation = {
      email : Joi.string().required(),
      name  : Joi.string().required(),
      lesson: Joi.string().required(),
      phone : Joi.string().required(),
    };

    const BODY: ICreateUser = req.body;
    const result            = Joi.validate(BODY, bodyValidation);
    if (result.error) {
      return Helpers.failedResponse(res, {
        message: result.error.details[0].message,
      });
    }
    return next();
  } catch (error) {
    Helpers.errorHandler(req, res, { error: error });
  }
};

export const getListWithPaging = async (
  req : IRequest,
  res : Response,
  next: NextFunction
) => {
  try {
    const bodyValidation = {
      ...AppValidation.pagination,
      firstName            : Joi.string().allow(null).allow(""),
      lastName             : Joi.string().allow(null).allow(""),
      email                : Joi.string().allow(null).allow(""),
      phone                : Joi.string().allow(null).allow(""),
      emails               : Joi.array().items(Joi.string()),
      phones               : Joi.array().items(Joi.string()),
      blocked              : Joi.boolean().allow(null).required(),
      registrationDateEnd  : Joi.date().iso().allow(null).allow(""),
      registrationDateStart: Joi.date().iso().allow(null).allow(""),
      activityFromDate     : Joi.date().iso().allow(null).allow(""),
      activityToDate       : Joi.date().iso().allow(null).allow(""),
    };
    const result = Joi.validate(req.body, bodyValidation);
    if (result.error) {
      return Helpers.failedResponse(res, {
        message: result.error.details[0].message,
      });
    }
    return next();
  } catch (error) {
    Helpers.errorHandler(req, res, { error: error });
  }
};

export const sendEmailToUser = async (
  req : IRequest,
  res : Response,
  next: NextFunction
) => {
  try {
    const bodyValidation = {
      email : Joi.string().regex(Config.emailRegex).required(),
      name  : Joi.string().required(),
      lesson: Joi.string().required(),
      phone : Joi.string().required(),
    };
    const result = Joi.validate(req.body, bodyValidation);
    if (result.error) {
      return Helpers.failedResponse(res, {
        message: result.error.details[0].message,
      });
    }
    return next();
  } catch (error) {
    Helpers.errorHandler(req, res, { error: error });
  }
};

export const createCV = async (
  req : IRequest,
  res : Response,
  next: NextFunction
) => {
  try {
    const bodyValidation = {
      email     : Joi.string().regex(Config.emailRegex).required(),
      name      : Joi.string().required(),
      phone     : Joi.string().required(),
      position  : Joi.string().required(),
      birthday  : Joi.string().required(),
      about     : Joi.string().required(),
      skills    : Joi.array().items(Joi.string()),
      education : Joi.string().required(),
      experience: Joi.string().required(),
    };
    const result = Joi.validate(req.body, bodyValidation);
    if (result.error) {
      return Helpers.failedResponse(res, {
        message: result.error.details[0].message,
      });
    }
    return next();
  } catch (error) {
    Helpers.errorHandler(req, res, { error: error });
  }
};
