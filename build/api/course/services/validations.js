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
const course_1 = require("../../../schemas/course");
const tutor_1 = require("../../../schemas/tutor");
const subcategory_1 = require("../../../schemas/subcategory");
//#endregion
exports.createCompany = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bodyValidation = {
            name: AppValidation.translate,
            description: AppValidation.translate,
            start: Joi.date().iso().allow(null).allow(''),
            tutor: Joi.array().items(Joi.string().regex(/^[0-9a-fA-F]{24}$/)).required(),
            duration: Joi.string().allow(null).allow(''),
            price: Joi.number().allow(null),
            newPrice: Joi.number().allow(null),
            introductionTitle: Joi.string().allow(null).allow(''),
            introductionDescription: Joi.string().allow(null).allow(''),
            introductionTitle2: Joi.string().allow(null).allow(''),
            introductionDescription2: Joi.string().allow(null).allow(''),
            introductionTitle3: Joi.string().allow(null).allow(''),
            introductionDescription3: Joi.string().allow(null).allow(''),
            slug: Joi.string().required(),
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
exports.addCashOut = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bodyValidation = {
            amount: Joi.number().required(),
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
    }
    catch (error) {
        Helpers.errorHandler(req, res, { error: error });
    }
});
exports.deleteImage = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
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
    }
    catch (error) {
        Helpers.errorHandler(req, res, { error: error });
    }
});
exports.editCompany = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const paramsValidation = { id: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required() };
        const bodyValidation = {
            name: AppValidation.translate,
            description: AppValidation.translate,
            start: Joi.date().iso().allow(null).allow(''),
            tutor: Joi.array().items(Joi.string().regex(/^[0-9a-fA-F]{24}$/)).required(),
            duration: Joi.string().allow(null).allow(''),
            price: Joi.number().allow(null),
            newPrice: Joi.number().allow(null),
            introductionTitle: Joi.string().allow(null).allow(''),
            introductionDescription: Joi.string().allow(null).allow(''),
            introductionTitle2: Joi.string().allow(null).allow(''),
            introductionDescription2: Joi.string().allow(null).allow(''),
            introductionTitle3: Joi.string().allow(null).allow(''),
            introductionDescription3: Joi.string().allow(null).allow(''),
            slug: Joi.string().required(),
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
    }
    catch (error) {
        Helpers.errorHandler(req, res, { error: error });
    }
});
exports.upload = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const queryValidation = {
            companyId: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
            imageType: Joi.number().required(),
        };
        const result = Joi.validate(req.query, queryValidation);
        if (result.error) {
            return Helpers.failedResponse(res, { message: result.error.details[0].message });
        }
        const company = yield course_1.default.findById(req.query.companyId);
        if (!company) {
            return Helpers.failedResponse(res, { message: 'Company are not found' });
        }
        return next();
    }
    catch (error) {
        Helpers.errorHandler(req, res, { error: error });
    }
});
exports.getCompanies = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const queryValidation = Object.assign(Object.assign({}, AppValidation.pagination), { mainCategoryId: Joi.string().regex(/^[0-9a-fA-F]{24}$/).optional(), subcategoryId: Joi.string().regex(/^[0-9a-fA-F]{24}$/).optional(), sortBy: Joi.number().optional() });
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
    }
    catch (error) {
        Helpers.errorHandler(req, res, { error: error });
    }
});
exports.getCompaniesWithDistance = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const queryValidation = Object.assign({}, AppValidation.pagination);
        const result = Joi.validate(req.query, queryValidation);
        if (result.error) {
            return Helpers.failedResponse(res, { message: result.error.details[0].message });
        }
        return next();
    }
    catch (error) {
        Helpers.errorHandler(req, res, { error: error });
    }
});
exports.getCompaniesByFilter = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bodyValidation = Object.assign(Object.assign({}, AppValidation.pagination), { mainCategoryId: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(), name: Joi.string().allow(null).allow(''), subcategoryId: Joi.string().regex(/^[0-9a-fA-F]{24}$/), sortBy: Joi.number() });
        const result = Joi.validate(req.body, bodyValidation);
        if (result.error) {
            return Helpers.failedResponse(res, { message: result.error.details[0].message });
        }
        const mainCategory = yield tutor_1.default.findById(req.body.mainCategoryId);
        if (!mainCategory) {
            return Helpers.failedResponse(res, { message: 'Main Category not found' });
        }
        if (req.body.subcategoryId) {
            const subcategory = yield subcategory_1.default.findById(req.body.subcategoryId);
            if (!subcategory)
                return Helpers.failedResponse(res, { message: 'Subcategory not found' });
        }
        return next();
    }
    catch (error) {
        Helpers.errorHandler(req, res, { error: error });
    }
});
exports.getCompaniesForAdmin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bodyValidation = {
            name: Joi.string().allow(null).allow(''),
            deliveryFeeFrom: Joi.number().allow(null),
            deliveryFeeTo: Joi.number().allow(null),
            ratingFrom: Joi.number().allow(null),
            ratingTo: Joi.number().allow(null),
            status: Joi.number().allow(null),
            dateFrom: Joi.date().iso().allow(null).allow(''),
            dateTo: Joi.date().iso().allow(null).allow(''),
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
    }
    catch (error) {
        Helpers.errorHandler(req, res, { error: error });
    }
});
exports.getShortList = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bodyValidation = {
            name: Joi.string().allow(null).allow(''),
            deliveryFeeFrom: Joi.number().allow(null),
            deliveryFeeTo: Joi.number().allow(null),
            ratingFrom: Joi.number().allow(null),
            ratingTo: Joi.number().allow(null),
            status: Joi.array().items(Joi.number().allow(null)),
            count: Joi.number().allow(null),
            mainCategoryId: Joi.string().regex(/^[0-9a-fA-F]{24}$/),
            subcategoryId: Joi.string().regex(/^[0-9a-fA-F]{24}$/),
        };
        const bodyResult = Joi.validate(req.body, bodyValidation);
        if (bodyResult.error) {
            return Helpers.failedResponse(res, { message: bodyResult.error.details[0].message });
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
        const company = yield course_1.default.findById(req.params.id);
        if (!company) {
            return Helpers.failedResponse(res, { message: 'Company not found' });
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
        const company = yield course_1.default.findOne().where({ slug: req.params._id });
        if (!company) {
            return Helpers.failedResponse(res, { message: 'Company not found' });
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
