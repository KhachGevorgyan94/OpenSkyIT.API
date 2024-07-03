import { Response, NextFunction } from 'express';
import * as Joi                   from 'joi';

import * as Helpers       from '../../../helpers';
import * as AppValidation from '../../../helpers/services/validation';
import { IRequest }       from '../../../helpers/models';

//#region Schemas

import MainCategory from '../../../schemas/tutor';

//#endregion

export const create = async (req: IRequest, res: Response, next: NextFunction) => {
  try {
    const bodyValidation = {
      name           : AppValidation.translate,
      workingPlace   : Joi.string().required(),
      workingPosition: Joi.string().required(),
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

export const editCategory = async (req: IRequest, res: Response, next: NextFunction) => {
  try {
    const paramsValidation = { id: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required() };
    const bodyValidation = {
      name : AppValidation.translate,
      workingPlace   : Joi.string().required(),
      workingPosition: Joi.string().required(),
    };
    const result = Joi.validate(req.body, bodyValidation);
    const paramsResult = Joi.validate(req.params, paramsValidation);
    if (paramsResult.error) {
      return Helpers.failedResponse(res, { message: 'Id is not valid' });
    }
    if (result.error) {
      return Helpers.failedResponse(res, { message: result.error.details[0].message });
    }
    const category = await MainCategory.findById(req.params.id);
    if (!category) {
      return Helpers.failedResponse(res, { message: 'Category not found' });
    }
    return next();
  } catch (error) {
    Helpers.errorHandler(req, res, { error : error });
  }
};

export const changeStatus = async (req: IRequest, res: Response, next: NextFunction) => {
  try {
    const paramsValidation = { id: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required() };
    const bodyValidation = {
      status: Joi.number().required(),
    };
    const result = Joi.validate(req.body, bodyValidation);
    const paramsResult = Joi.validate(req.params, paramsValidation);
    if (paramsResult.error) {
      return Helpers.failedResponse(res, { message: 'Id is not valid' });
    }
    if (result.error) {
      return Helpers.failedResponse(res, { message: result.error.details[0].message });
    }
    const category = await MainCategory.findById(req.params.id);
    if (!category) {
      return Helpers.failedResponse(res, { message: 'Category not found' });
    }
    return next();
  } catch (error) {
    Helpers.errorHandler(req, res, { error : error });
  }
};

export const changePosition = async (req: IRequest, res: Response, next: NextFunction) => {
  try {
    const bodyValidation = {
      from: Joi.number().required(),
      to: Joi.number().required(),
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
      id        : Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
      imageType : Joi.number().required(),
    };
    const result = Joi.validate(req.query, queryValidation);
    if (result.error) {
      return Helpers.failedResponse(res, { message: result.error.details[0].message });
    }
    const category = await MainCategory.findById(req.query.id);
    if (!category) {
      return Helpers.failedResponse(res, { message: 'Category not found' });
    }
    return next();
  } catch (error) {
    Helpers.errorHandler(req, res, { error : error });
  }
};

export const details = async (req: IRequest, res: Response, next: NextFunction) => {
  try {
    const paramsValidation = { id: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required() };
    const paramsResult = Joi.validate(req.params, paramsValidation);
    if (paramsResult.error) {
      return Helpers.failedResponse(res, { message: 'Id is not valid' });
    }
    const category = await MainCategory.findById(req.params.id);
    if (!category) {
      return Helpers.failedResponse(res, { message: 'Category not found' });
    }
    return next();
  } catch (error) {
    Helpers.errorHandler(req, res, { error : error });
  }
};
