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
const config_1 = require("../../../config");
const AppValidation = require("../../../helpers/services/validation");
exports.instaServiceApply = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bodyValidation = {
            name: Joi.string().required(),
            phoneNumber: Joi.string().required(),
            companyName: Joi.string().required(),
            comment: Joi.string().optional().allow(""),
            category: Joi.string().required(),
            city: Joi.string().required(),
        };
        const result = Joi.validate(req.body, bodyValidation);
        if (result.error) {
            return Helpers.failedResponse(res, {
                message: result.error.details[0].message,
            });
        }
        return next();
    }
    catch (error) {
        Helpers.errorHandler(req, res, { error: error });
    }
});
exports.fda = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bodyValidation = {
            name: Joi.string().required(),
            email: Joi.string().required(),
            message: Joi.string().required(),
        };
        const result = Joi.validate(req.body, bodyValidation);
        if (result.error) {
            return Helpers.failedResponse(res, {
                message: result.error.details[0].message,
            });
        }
        return next();
    }
    catch (error) {
        Helpers.errorHandler(req, res, { error: error });
    }
});
exports.hybrid = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bodyValidation = {
            name: Joi.string().required(),
            email: Joi.string().required(),
            message: Joi.string().required(),
        };
        const result = Joi.validate(req.body, bodyValidation);
        if (result.error) {
            return Helpers.failedResponse(res, {
                message: result.error.details[0].message,
            });
        }
        return next();
    }
    catch (error) {
        Helpers.errorHandler(req, res, { error: error });
    }
});
exports.register = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bodyValidation = {
            email: Joi.string().required(),
            name: Joi.string().required(),
            lesson: Joi.string().required(),
            phone: Joi.string().required(),
        };
        const BODY = req.body;
        const result = Joi.validate(BODY, bodyValidation);
        if (result.error) {
            return Helpers.failedResponse(res, {
                message: result.error.details[0].message,
            });
        }
        return next();
    }
    catch (error) {
        Helpers.errorHandler(req, res, { error: error });
    }
});
exports.getListWithPaging = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bodyValidation = Object.assign(Object.assign({}, AppValidation.pagination), { firstName: Joi.string().allow(null).allow(""), lastName: Joi.string().allow(null).allow(""), email: Joi.string().allow(null).allow(""), phone: Joi.string().allow(null).allow(""), emails: Joi.array().items(Joi.string()), phones: Joi.array().items(Joi.string()), blocked: Joi.boolean().allow(null).required(), registrationDateEnd: Joi.date().iso().allow(null).allow(""), registrationDateStart: Joi.date().iso().allow(null).allow(""), activityFromDate: Joi.date().iso().allow(null).allow(""), activityToDate: Joi.date().iso().allow(null).allow("") });
        const result = Joi.validate(req.body, bodyValidation);
        if (result.error) {
            return Helpers.failedResponse(res, {
                message: result.error.details[0].message,
            });
        }
        return next();
    }
    catch (error) {
        Helpers.errorHandler(req, res, { error: error });
    }
});
exports.sendEmailToUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bodyValidation = {
            email: Joi.string().regex(config_1.default.emailRegex).required(),
            name: Joi.string().required(),
            lesson: Joi.string().required(),
            phone: Joi.string().required(),
        };
        const result = Joi.validate(req.body, bodyValidation);
        if (result.error) {
            return Helpers.failedResponse(res, {
                message: result.error.details[0].message,
            });
        }
        return next();
    }
    catch (error) {
        Helpers.errorHandler(req, res, { error: error });
    }
});
exports.createCV = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bodyValidation = {
            email: Joi.string().regex(config_1.default.emailRegex).required(),
            name: Joi.string().required(),
            phone: Joi.string().required(),
            position: Joi.string().required(),
            birthday: Joi.string().required(),
            about: Joi.string().required(),
            skills: Joi.array().items(Joi.string()),
            education: Joi.string().required(),
            experience: Joi.string().required(),
        };
        const result = Joi.validate(req.body, bodyValidation);
        if (result.error) {
            return Helpers.failedResponse(res, {
                message: result.error.details[0].message,
            });
        }
        return next();
    }
    catch (error) {
        Helpers.errorHandler(req, res, { error: error });
    }
});
