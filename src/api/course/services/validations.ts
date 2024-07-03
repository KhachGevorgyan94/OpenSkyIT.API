import { Response, NextFunction } from 'express';
import * as Joi                   from 'joi';

import * as Helpers       from '../../../helpers';
import * as AppValidation from '../../../helpers/services/validation';
import { IRequest }       from '../../../helpers/models';

//#region Schemas

import Company      from '../../../schemas/course';
import MainCategory from '../../../schemas/tutor';
import Subcategory  from '../../../schemas/subcategory';
import Config         from '../../../config';

//#endregion

export const createCompany = async (req: IRequest, res: Response, next: NextFunction) => {
  try {
    const bodyValidation = {
      name                    : AppValidation.translate,
      description             : AppValidation.translate,
      start                   : Joi.date().iso().allow(null).allow(''),
      tutor                   : Joi.array().items(Joi.string().regex(/^[0-9a-fA-F]{24}$/) ).required(),
      duration                : Joi.string().allow(null).allow(''),
      price                   : Joi.number().allow(null),
      newPrice                : Joi.number().allow(null),
      introductionTitle       : Joi.string().allow(null).allow(''),
      introductionDescription : Joi.string().allow(null).allow(''),
      introductionTitle2      : Joi.string().allow(null).allow(''),
      introductionDescription2: Joi.string().allow(null).allow(''),
      introductionTitle3      : Joi.string().allow(null).allow(''),
      introductionDescription3: Joi.string().allow(null).allow(''),
      slug                    : Joi.string().required(),
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

export const addCashOut = async (req: IRequest, res: Response, next: NextFunction) => {
  try {
    const bodyValidation = {
      amount : Joi.number().required(),
    };
    const paramsValidation = { id: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required() };
    const paramsResult = Joi.validate(req.params, paramsValidation);
    if (paramsResult.error) {
      return Helpers.failedResponse(res, { message: 'Id is not valid' });
    }
    const result = Joi.validate(req.body, bodyValidation);
    if (result.error) {
      return Helpers.failedResponse(res, { message: result.error.details[0].message });
    }
    return next();
  } catch (error) {
    Helpers.errorHandler(req, res, { error : error });
  }
};

export const deleteImage = async (req: IRequest, res: Response, next: NextFunction) => {
  try {
    const paramsValidation = { id: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required() };
    const bodyValidation = {
      index: Joi.number().required(),
    };
    const result = Joi.validate(req.body, bodyValidation);
    const paramsResult = Joi.validate(req.params, paramsValidation);
    if (paramsResult.error) {
      return Helpers.failedResponse(res, { message: 'Id are not valid' });
    }
    if (result.error) {
      return Helpers.failedResponse(res, { message: result.error.details[0].message });
    }
    return next();
  } catch (error) {
    Helpers.errorHandler(req, res, { error : error });
  }
};

export const editCompany = async (req: IRequest, res: Response, next: NextFunction) => {
  try {
    const paramsValidation = { id: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required() };
    const bodyValidation = {
      name                    : AppValidation.translate,
      description             : AppValidation.translate,
      start                   : Joi.date().iso().allow(null).allow(''),
      tutor                   : Joi.array().items(Joi.string().regex(/^[0-9a-fA-F]{24}$/) ).required(),
      duration                : Joi.string().allow(null).allow(''),
      price                   : Joi.number().allow(null),
      newPrice                : Joi.number().allow(null),
      introductionTitle       : Joi.string().allow(null).allow(''),
      introductionDescription : Joi.string().allow(null).allow(''),
      introductionTitle2      : Joi.string().allow(null).allow(''),
      introductionDescription2: Joi.string().allow(null).allow(''),
      introductionTitle3      : Joi.string().allow(null).allow(''),
      introductionDescription3: Joi.string().allow(null).allow(''),
      slug                    : Joi.string().required(),
    };
    const result = Joi.validate(req.body, bodyValidation);
    const paramsResult = Joi.validate(req.params, paramsValidation);
    if (paramsResult.error) {
      return Helpers.failedResponse(res, { message: 'Id are not valid' });
    }
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

export const getCompanies = async (req: IRequest, res: Response, next: NextFunction) => {
  try {
    const queryValidation = {
      ...AppValidation.pagination,
      mainCategoryId : Joi.string().regex(/^[0-9a-fA-F]{24}$/).optional(),
      subcategoryId  : Joi.string().regex(/^[0-9a-fA-F]{24}$/).optional(),
      sortBy         : Joi.number().optional(),
    };
    const result = Joi.validate(req.query, queryValidation);
    if (result.error) {
      return Helpers.failedResponse(res, { message: result.error.details[0].message });
    }
    // const mainCategory = await MainCategory.findById(req.query.mainCategoryId);
    // if (!mainCategory) {
    //   return Helpers.failedResponse(res, { message: 'Main Category not found' });
    // }
    // if (req.query.subcategoryId) {
    //   const subcategory = await Subcategory.findById(req.query.subcategoryId);
    //   if (!subcategory) return Helpers.failedResponse(res, { message: 'Subcategory not found' });
    // }
    return next();
  } catch (error) {
    Helpers.errorHandler(req, res, { error : error });
  }
};

export const getCompaniesWithDistance = async (req: IRequest, res: Response, next: NextFunction) => {
  try {
    const queryValidation = {
      ...AppValidation.pagination,
    };
    const result = Joi.validate(req.query, queryValidation);
    if (result.error) {
      return Helpers.failedResponse(res, { message: result.error.details[0].message });
    }
    return next();
  } catch (error) {
    Helpers.errorHandler(req, res, { error : error });
  }
};

export const getCompaniesByFilter = async (req: IRequest, res: Response, next: NextFunction) => {
  try {
    const bodyValidation = {
      ...AppValidation.pagination,
      mainCategoryId : Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
      name           : Joi.string().allow(null).allow(''),
      subcategoryId  : Joi.string().regex(/^[0-9a-fA-F]{24}$/),
      sortBy         : Joi.number()
    };
    const result = Joi.validate(req.body, bodyValidation);
    if (result.error) {
      return Helpers.failedResponse(res, { message: result.error.details[0].message });
    }
    const mainCategory = await MainCategory.findById(req.body.mainCategoryId);
    if (!mainCategory) {
      return Helpers.failedResponse(res, { message: 'Main Category not found' });
    }
    if (req.body.subcategoryId) {
      const subcategory = await Subcategory.findById(req.body.subcategoryId);
      if (!subcategory) return Helpers.failedResponse(res, { message: 'Subcategory not found' });
    }
    return next();
  } catch (error) {
    Helpers.errorHandler(req, res, { error : error });
  }
};

export const getCompaniesForAdmin = async (req: IRequest, res: Response, next: NextFunction) => {
  try {
    const bodyValidation = {
      name            : Joi.string().allow(null).allow(''),
      deliveryFeeFrom : Joi.number().allow(null),
      deliveryFeeTo   : Joi.number().allow(null),
      ratingFrom      : Joi.number().allow(null),
      ratingTo        : Joi.number().allow(null),
      status          : Joi.number().allow(null),
      dateFrom        : Joi.date().iso().allow(null).allow(''),
      dateTo          : Joi.date().iso().allow(null).allow(''),
    };
    const bodyResult = Joi.validate(req.body, bodyValidation);
    const queryResult = Joi.validate(req.query, AppValidation.pagination);

    if (bodyResult.error) {
      return Helpers.failedResponse(res, { message: bodyResult.error.details[0].message });
    }
    if (queryResult.error) {
      return Helpers.failedResponse(res, { message: queryResult.error.details[0].message });
    }
    return next();
  } catch (error) {
    Helpers.errorHandler(req, res, { error : error });
  }
};

export const getShortList = async (req: IRequest, res: Response, next: NextFunction) => {
  try {
    const bodyValidation = {
      name            : Joi.string().allow(null).allow(''),
      deliveryFeeFrom : Joi.number().allow(null),
      deliveryFeeTo   : Joi.number().allow(null),
      ratingFrom      : Joi.number().allow(null),
      ratingTo        : Joi.number().allow(null),
      status          : Joi.array().items(Joi.number().allow(null)),
      count           : Joi.number().allow(null),
      mainCategoryId  : Joi.string().regex(/^[0-9a-fA-F]{24}$/),
      subcategoryId   : Joi.string().regex(/^[0-9a-fA-F]{24}$/),
    };
    const bodyResult = Joi.validate(req.body, bodyValidation);

    if (bodyResult.error) {
      return Helpers.failedResponse(res, { message: bodyResult.error.details[0].message });
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
    const company = await Company.findById(req.params.id);
    if (!company) {
      return Helpers.failedResponse(res, { message: 'Company not found' });
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
    const company = await Company.findOne().where({ slug : req.params._id })
    if (!company) {
      return Helpers.failedResponse(res, { message: 'Company not found' });
    }
    return next();
  } catch (error) {
    Helpers.errorHandler(req, res, { error : error });
  }
};

export const changePosition = async (req: IRequest, res: Response, next: NextFunction) => {
  try {
    const bodyValidation = {
      from : Joi.number().required(),
      to   : Joi.number().required(),
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