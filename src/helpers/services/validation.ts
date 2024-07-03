import * as Joi from 'joi';

export const translate = Joi.object().required().keys({
  hy : Joi.string().required(),
  en : Joi.string().allow(null).allow(''),
  ru : Joi.string().allow(null).allow(''),
});

export const translateNotRequired = Joi.object().keys({
  hy : Joi.string().allow(null).allow(''),
  en : Joi.string().allow(null).allow(''),
  ru : Joi.string().allow(null).allow(''),
});

export const pagination = {
  page  : Joi.number().min(1).required(),
  count : Joi.number().min(1).required(),
};

export const idValidation = {
  id: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
};

export const idValidationOptional = {
  id: Joi.string().regex(/^[0-9a-fA-F]{24}$/).allow(['', null]).optional(),
};

export const languageValidation = {
  language: Joi.string().equal(['hy', 'ru', 'en']).required()
};

export const skipPagination = {
  skip : Joi.number().min(0).integer().required(),
  limit: Joi.number().min(1).integer().required()
};