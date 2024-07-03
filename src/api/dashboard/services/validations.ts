import { IGetMonthDaysModel } from './../models/index';
import { Response, NextFunction } from 'express';
import * as Joi                   from 'joi';

import { IOrderCountFilter } from '../models';

import * as Helpers from '../../../helpers';
import { IRequest } from '../../../helpers/models';

export const orderCountFilter = async (req: IRequest, res: Response, next: NextFunction) => {
  try {
    const body: IOrderCountFilter = req.body;
    const bodyValidation = {
      dateFrom : [Joi.date().required(), Joi.string().required()],
      dateTo   : [Joi.date().allow('').allow(null).optional(), Joi.string().allow('').allow(null).optional()],
    };
    const result = Joi.validate(body, bodyValidation);
    if (result.error) {
      return Helpers.failedResponse(res, { message: result.error.details[0].message });
    }
    return next();
  } catch (error) {
    Helpers.errorHandler(req, res, { error : error });
  }
};

export const getMonthDaysCount = async (req: IRequest, res: Response, next: NextFunction) => {
  try {
    const body: IGetMonthDaysModel = req.body;
    const bodyValidation = {
      month : Joi.number().required()
    };
    const result = Joi.validate(body, bodyValidation);
    if (result.error) {
      return Helpers.failedResponse(res, { message: result.error.details[0].message });
    }
    return next();
  } catch (error) {
    Helpers.errorHandler(req, res, { error : error });
  }
};