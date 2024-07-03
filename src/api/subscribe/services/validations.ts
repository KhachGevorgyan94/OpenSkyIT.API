import { Response, NextFunction } from "express";
import * as Joi from "joi";

import * as Helpers from "../../../helpers";

import { IRequest } from "../../../helpers/models";
import { ISubscribe } from "../models";
import * as AppValidation from "../../../helpers/services/validation";

export const subscribe = async (
  req: IRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const bodyValidation = {
      email: Joi.string().required(),
    };
    const BODY: ISubscribe = req.body;
    const result = Joi.validate(BODY, bodyValidation);
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
  req: IRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const bodyValidation = {
      ...AppValidation.pagination,
      email: Joi.string().allow(null).allow(""),
      registrationDateEnd: Joi.date().iso().allow(null).allow(""),
      registrationDateStart: Joi.date().iso().allow(null).allow(""),
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
