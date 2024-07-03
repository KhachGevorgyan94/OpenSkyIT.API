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
const tutor_1 = require("../../../schemas/tutor");
const subcategory_1 = require("../../../schemas/subcategory");
//#endregion
exports.addSubcategory = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bodyValidation = {
            mainCategoryId: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
            name: AppValidation.translate,
        };
        const result = Joi.validate(req.body, bodyValidation);
        if (result.error) {
            return Helpers.failedResponse(res, { message: result.error.details[0].message });
        }
        const category = yield tutor_1.default.findById(req.body.mainCategoryId);
        if (!category) {
            return Helpers.failedResponse(res, { message: 'Category not found' });
        }
        return next();
    }
    catch (error) {
        Helpers.errorHandler(req, res, { error: error });
    }
});
exports.editSubcategory = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
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
        const subcategory = yield subcategory_1.default.findById(req.params.id);
        if (!subcategory) {
            return Helpers.failedResponse(res, { message: 'Subcategory not found' });
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
        const category = yield subcategory_1.default.findById(req.params.id);
        if (!category) {
            return Helpers.failedResponse(res, { message: 'Category not found' });
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
            mainCategoryId: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
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
exports.getSubcategories = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const paramsValidation = { mainCategoryId: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required() };
        const paramsResult = Joi.validate(req.params, paramsValidation);
        if (paramsResult.error) {
            return Helpers.failedResponse(res, { message: paramsResult.error.details[0].message });
        }
        const mainCategory = tutor_1.default.findById(req.params.mainCategoryId);
        if (!mainCategory) {
            return Helpers.failedResponse(res, { message: 'Main category not found' });
        }
        return next();
    }
    catch (error) {
        Helpers.errorHandler(req, res, { error: error });
    }
});
exports.getSubcategoriesShortList = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const paramsValidation = { mainCategoryId: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required() };
        const paramsResult = Joi.validate(req.params, paramsValidation);
        if (paramsResult.error) {
            return Helpers.failedResponse(res, { message: paramsResult.error.details[0].message });
        }
        const mainCategory = tutor_1.default.findById(req.params.mainCategoryId);
        if (!mainCategory) {
            return Helpers.failedResponse(res, { message: 'Main category not found' });
        }
        return next();
    }
    catch (error) {
        Helpers.errorHandler(req, res, { error: error });
    }
});
exports.getSubcategoriesForAdmin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const paramsValidation = { mainCategoryId: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required() };
        const paramsResult = Joi.validate(req.params, paramsValidation);
        if (paramsResult.error) {
            return Helpers.failedResponse(res, { message: paramsResult.error.details[0].message });
        }
        const mainCategory = tutor_1.default.findById(req.params.mainCategoryId);
        if (!mainCategory) {
            return Helpers.failedResponse(res, { message: 'Main category not found' });
        }
        return next();
    }
    catch (error) {
        Helpers.errorHandler(req, res, { error: error });
    }
});
exports.upload = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const paramsValidation = {
            id: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
        };
        const result = Joi.validate(req.params, paramsValidation);
        if (result.error) {
            return Helpers.failedResponse(res, { message: result.error.details[0].message });
        }
        const category = yield subcategory_1.default.findById(req.params.id);
        if (!category) {
            return Helpers.failedResponse(res, { message: 'Category not found' });
        }
        return next();
    }
    catch (error) {
        Helpers.errorHandler(req, res, { error: error });
    }
});
