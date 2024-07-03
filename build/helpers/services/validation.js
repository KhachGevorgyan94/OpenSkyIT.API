"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Joi = require("joi");
exports.translate = Joi.object().required().keys({
    hy: Joi.string().required(),
    en: Joi.string().allow(null).allow(''),
    ru: Joi.string().allow(null).allow(''),
});
exports.translateNotRequired = Joi.object().keys({
    hy: Joi.string().allow(null).allow(''),
    en: Joi.string().allow(null).allow(''),
    ru: Joi.string().allow(null).allow(''),
});
exports.pagination = {
    page: Joi.number().min(1).required(),
    count: Joi.number().min(1).required(),
};
exports.idValidation = {
    id: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
};
exports.idValidationOptional = {
    id: Joi.string().regex(/^[0-9a-fA-F]{24}$/).allow(['', null]).optional(),
};
exports.languageValidation = {
    language: Joi.string().equal(['hy', 'ru', 'en']).required()
};
exports.skipPagination = {
    skip: Joi.number().min(0).integer().required(),
    limit: Joi.number().min(1).integer().required()
};
