"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const Joi = require("joi");
const Helpers = require("../../../helpers");
const AppValidation = require("../../../helpers/services/validation");
//#region Schemas
const promotion_1 = require("../../../schemas/promotion");
//#endregion
exports.create = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bodyValidation = {
            name: AppValidation.translate,
            description: AppValidation.translate,
            slug: Joi.string().required(),
            subtitle: AppValidation.translate.optional(),
        };
        const result = Joi.validate(req.body, bodyValidation);
        if (result.error) {
            return Helpers.failedResponse(res, { message: result.error.details[0].message });
        }
        return next();
    }
    catch (error) {
        Helpers.errorHandler(req, res, { error: error });
    }
});
exports.editPromotion = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const paramsValidation = { id: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required() };
        const bodyValidation = {
            name: AppValidation.translate,
            description: AppValidation.translate,
            slug: Joi.string().required(),
            subtitle: AppValidation.translate.optional(),
        };
        const result = Joi.validate(req.body, bodyValidation);
        const paramsResult = Joi.validate(req.params, paramsValidation);
        if (paramsResult.error) {
            return Helpers.failedResponse(res, { message: 'Id is not valid' });
        }
        if (result.error) {
            return Helpers.failedResponse(res, { message: result.error.details[0].message });
        }
        const promotion = yield promotion_1.default.findById(req.params.id);
        if (!promotion) {
            return Helpers.failedResponse(res, { message: 'Promotion not found' });
        }
        return next();
    }
    catch (error) {
        Helpers.errorHandler(req, res, { error: error });
    }
});
exports.changeStatus = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
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
        const promotion = yield promotion_1.default.findById(req.params.id);
        if (!promotion) {
            return Helpers.failedResponse(res, { message: 'Promotion not found' });
        }
        return next();
    }
    catch (error) {
        Helpers.errorHandler(req, res, { error: error });
    }
});
exports.changePosition = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
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
    }
    catch (error) {
        Helpers.errorHandler(req, res, { error: error });
    }
});
exports.upload = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const queryValidation = {
            id: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
            imageType: Joi.number().required(),
        };
        const result = Joi.validate(req.query, queryValidation);
        if (result.error) {
            return Helpers.failedResponse(res, { message: result.error.details[0].message });
        }
        const promotion = yield promotion_1.default.findById(req.query.id);
        if (!promotion) {
            return Helpers.failedResponse(res, { message: 'Promotion not found' });
        }
        return next();
    }
    catch (error) {
        Helpers.errorHandler(req, res, { error: error });
    }
});
exports.details = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const paramsValidation = { slug: Joi.string().required() };
        // const paramsResult = Joi.validate(req.params, paramsValidation);
        // if (paramsResult.error) {
        //   return Helpers.failedResponse(res, { message: 'Id is not valid' });
        // }
        const promotion = yield promotion_1.default.findOne().where({ slug: req.params.id });
        if (!promotion) {
            return Helpers.failedResponse(res, { message: 'Promotion not found' });
        }
        return next();
    }
    catch (error) {
        Helpers.errorHandler(req, res, { error: error });
    }
});
exports.deleteBlog = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const paramsValidation = { id: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required() };
        const paramsResult = Joi.validate(req.params, paramsValidation);
        if (paramsResult.error) {
            return Helpers.failedResponse(res, { message: 'Id is not valid' });
        }
        return next();
    }
    catch (error) {
        Helpers.errorHandler(req, res, { error: error });
    }
});
