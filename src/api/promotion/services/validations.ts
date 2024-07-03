import { Response, NextFunction } from 'express';
import * as Joi                   from 'joi';

import * as Helpers       from '../../../helpers';
import * as AppValidation from '../../../helpers/services/validation';
import { IRequest }       from '../../../helpers/models';

//#region Schemas

import Promotions from '../../../schemas/promotion';

//#endregion

export const create = async (req: IRequest, res: Response, next: NextFunction) => {
  try {
    const bodyValidation = {
      name                  : AppValidation.translate,
      description           : AppValidation.translate,
      slug                  : Joi.string().required(),
      subtitle              : AppValidation.translate.optional(),
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

export const editPromotion = async (req: IRequest, res: Response, next: NextFunction) => {
  try {
    const paramsValidation = { id: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required() };
    const bodyValidation = {
      name                  : AppValidation.translate,
      description           : AppValidation.translate,
      slug                  : Joi.string().required(),
      subtitle              : AppValidation.translate.optional(),
    };
    const result = Joi.validate(req.body, bodyValidation);
    const paramsResult = Joi.validate(req.params, paramsValidation);
    if (paramsResult.error) {
      return Helpers.failedResponse(res, { message: 'Id is not valid' });
    }
    if (result.error) {
      return Helpers.failedResponse(res, { message: result.error.details[0].message });
    }
    const promotion = await Promotions.findById(req.params.id);
    if (!promotion) {
      return Helpers.failedResponse(res, { message: 'Promotion not found' });
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
    const promotion = await Promotions.findById(req.params.id);
    if (!promotion) {
      return Helpers.failedResponse(res, { message: 'Promotion not found' });
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
    const promotion = await Promotions.findById(req.query.id);
    if (!promotion) {
      return Helpers.failedResponse(res, { message: 'Promotion not found' });
    }
    return next();
  } catch (error) {
    Helpers.errorHandler(req, res, { error : error });
  }
};

export const details = async (req: IRequest, res: Response, next: NextFunction) => {
  try {
    const paramsValidation = { slug: Joi.string().required() };
    // const paramsResult = Joi.validate(req.params, paramsValidation);
    // if (paramsResult.error) {
    //   return Helpers.failedResponse(res, { message: 'Id is not valid' });
    // }
    const promotion = await Promotions.findOne().where({ slug : req.params.id })
    if (!promotion) {
      return Helpers.failedResponse(res, { message: 'Promotion not found' });
    }
    return next();
  } catch (error) {
    Helpers.errorHandler(req, res, { error : error });
  }
};

export const deleteBlog = async(req: IRequest, res: Response, next: NextFunction) => {
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