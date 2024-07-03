import { Response, NextFunction } from 'express';
import * as Joi                   from 'joi';

import * as Helpers       from '../../../helpers';
import * as AppValidation from '../../../helpers/services/validation';
import { IRequest }       from '../../../helpers/models';

//#region Schemas

import Company      from '../../../schemas/resume';
import Config         from '../../../config';

//#endregion

export const createCompany = async (req: IRequest, res: Response, next: NextFunction) => {
  try {
    const bodyValidation = {
      name                   : Joi.string().required(),
      phoneNumber            : Joi.number().allow(null),
      email                  : Joi.string().regex(Config.emailRegex).allow(null).optional(),
    };
    const result = Joi.validate(req.body, bodyValidation);
    if (result.error) {
      return Helpers.failedResponse(res, { message: result.error.details[0].message });
    }
    return next();
  } catch (error) {
    Helpers.errorHandler(req, res, { error : error });
  }
};

export const upload = async (req: IRequest, res: Response, next: NextFunction) => {
  try {
    const queryValidation = {
      companyId : Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
      imageType : Joi.number().required(),
    };
    const result = Joi.validate(req.query, queryValidation);
    if (result.error) {
      return Helpers.failedResponse(res, { message: result.error.details[0].message });
    }
    const company = await Company.findById(req.query.companyId);
    if (!company) {
      return Helpers.failedResponse(res, { message: 'Company are not found' });
    }
    return next();
  } catch (error) {
    Helpers.errorHandler(req, res, { error : error });
  }
};