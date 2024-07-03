import { Response, NextFunction } from 'express';
import * as Joi                   from 'joi';

import * as Helpers       from '../../../helpers';
import * as AppValidation from '../../../helpers/services/validation';
import { IRequest }       from '../../../helpers/models';

//#region Schemas

import MainCategory from '../../../schemas/tutor';
import Subcategory  from '../../../schemas/subcategory';

//#endregion

export const addSubcategory = async (req: IRequest, res: Response, next: NextFunction) => {
  try {
    const bodyValidation = {
      mainCategoryId : Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
      name           : AppValidation.translate,
    };
    const result = Joi.validate(req.body, bodyValidation);
    if (result.error) {
      return Helpers.failedResponse(res, { message: result.error.details[0].message });
    }
    const category = await MainCategory.findById(req.body.mainCategoryId);
    if (!category) {
      return Helpers.failedResponse(res, { message: 'Category not found' });
    }
    return next();
  } catch (error) {
    Helpers.errorHandler(req, res, { error : error });
  }
};

export const editSubcategory = async (req: IRequest, res: Response, next: NextFunction) => {
  try {
    const paramsValidation = { id: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required() };
    const paramsResult = Joi.validate(req.params, paramsValidation);
    const result = Joi.validate(req.body, { name: AppValidation.translate });
    if (paramsResult.error) {
      return Helpers.failedResponse(res, { message: 'Id is not valid' });
    }
    if (result.error) {
      return Helpers.failedResponse(res, { message: result.error.details[0].message });
    }
    const subcategory = await Subcategory.findById(req.params.id);
    if (!subcategory) {
      return Helpers.failedResponse(res, { message: 'Subcategory not found' });
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
    const category = await Subcategory.findById(req.params.id);
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
      from           : Joi.number().required(),
      to             : Joi.number().required(),
      mainCategoryId : Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
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

export const getSubcategories = async (req: IRequest, res: Response, next: NextFunction) => {
  try {
    const paramsValidation = { mainCategoryId: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required() };
    const paramsResult = Joi.validate(req.params, paramsValidation);
    if (paramsResult.error) {
      return Helpers.failedResponse(res, { message: paramsResult.error.details[0].message });
    }
    const mainCategory = MainCategory.findById(req.params.mainCategoryId);
    if (!mainCategory) {
      return Helpers.failedResponse(res, { message: 'Main category not found' });
    }
    return next();
  } catch (error) {
    Helpers.errorHandler(req, res, { error : error });
  }
};

export const getSubcategoriesShortList = async (req: IRequest, res: Response, next: NextFunction) => {
  try {
    const paramsValidation = { mainCategoryId: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required() };
    const paramsResult = Joi.validate(req.params, paramsValidation);
    if (paramsResult.error) {
      return Helpers.failedResponse(res, { message: paramsResult.error.details[0].message });
    }
    const mainCategory = MainCategory.findById(req.params.mainCategoryId);
    if (!mainCategory) {
      return Helpers.failedResponse(res, { message: 'Main category not found' });
    }
    return next();
  } catch (error) {
    Helpers.errorHandler(req, res, { error : error });
  }
};

export const getSubcategoriesForAdmin = async (req: IRequest, res: Response, next: NextFunction) => {
  try {
    const paramsValidation = { mainCategoryId: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required() };
    const paramsResult = Joi.validate(req.params, paramsValidation);
    if (paramsResult.error) {
      return Helpers.failedResponse(res, { message: paramsResult.error.details[0].message });
    }
    const mainCategory = MainCategory.findById(req.params.mainCategoryId);
    if (!mainCategory) {
      return Helpers.failedResponse(res, { message: 'Main category not found' });
    }
    return next();
  } catch (error) {
    Helpers.errorHandler(req, res, { error : error });
  }
};

export const upload = async (req: IRequest, res: Response, next: NextFunction) => {
  try {
    const paramsValidation = {
      id : Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
    };
    const result = Joi.validate(req.params, paramsValidation);
    if (result.error) {
      return Helpers.failedResponse(res, { message: result.error.details[0].message });
    }
    const category = await Subcategory.findById(req.params.id);
    if (!category) {
      return Helpers.failedResponse(res, { message: 'Category not found' });
    }
    return next();
  } catch (error) {
    Helpers.errorHandler(req, res, { error : error });
  }
};