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
const bcrypt = require("bcrypt");
const config_1 = require("../../../config");
const Helpers = require("../../../helpers");
const Constants = require("../../../helpers/services/constants");
//#region Schemas
const admin_1 = require("../../../schemas/admin");
//#endregion
exports.changePassword = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bodyValidation = {
            newConfirmPassword: Joi.string().required(),
            newPassword: Joi.string().required(),
            oldPassword: Joi.string().required(),
        };
        const result = Joi.validate(req.body, bodyValidation, { allowUnknown: true });
        if (result.error) {
            return Helpers.failedResponse(res, { message: 'All field are required' });
        }
        const isValid = yield bcrypt.compare(req.body.oldPassword, req.user.password);
        if (!isValid) {
            return Helpers.failedResponse(res, { message: 'Not valid old password' });
        }
        if (req.body.newPassword === req.body.oldPassword) {
            return Helpers.failedResponse(res, { message: 'Old password and new password cannot be same' });
        }
        if (req.body.newPassword !== req.body.newConfirmPassword) {
            return Helpers.failedResponse(res, { message: 'New password does not match the new confirm password' });
        }
        return next();
    }
    catch (error) {
        Helpers.errorHandler(req, res, { error: error });
    }
});
exports.changePasswordForAdmin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bodyValidation = {
            password: Joi.string().required(),
        };
        const paramsValidation = { id: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required() };
        const paramsResult = Joi.validate(req.params, paramsValidation);
        if (paramsResult.error) {
            return Helpers.failedResponse(res, { message: 'Id is not valid' });
        }
        const result = Joi.validate(req.body, bodyValidation);
        if (result.error) {
            return Helpers.failedResponse(res, { message: 'All field are required' });
        }
        return next();
    }
    catch (error) {
        Helpers.errorHandler(req, res, { error: error });
    }
});
exports.getList = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const queryValidation = {
            role: Joi.number().required(),
        };
        const result = Joi.validate(req.query, queryValidation);
        if (result.error) {
            return Helpers.failedResponse(res, { message: 'All field are required' });
        }
        return next();
    }
    catch (error) {
        Helpers.errorHandler(req, res, { error: error });
    }
});
exports.create = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const language = req.headers.languagecode;
        if (req.body.phone && req.body.phone[0] === '+')
            req.body.phone = req.body.phone.slice(1, req.body.phone.length);
        const bodyValidation = {
            email: Joi.string().regex(config_1.default.emailRegex).required(),
            firstName: Joi.string().required(),
            lastName: Joi.string().required(),
            password: Joi.string().min(6).required(),
            role: Joi.number().required(),
            phone: Joi.string().required(),
        };
        const result = Joi.validate(req.body, bodyValidation);
        if (result.error) {
            return Helpers.failedResponse(res, { message: result.error.details[0].message });
        }
        if (req.body.phone.length !== 9 || !Helpers.isValidPhoneNumber(req.body.phone)) {
            return Helpers.failedResponse(res, { message: 'Not valid phone number' });
        }
        const admin = yield admin_1.default
            .findOne()
            .where({ email: req.body.email })
            .where({ deleted: false });
        if (admin) {
            return Helpers.failedResponse(res, { message: Constants.errorEmailExist[language] });
        }
        return next();
    }
    catch (error) {
        Helpers.errorHandler(req, res, { error: error });
    }
});
exports.edit = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const language = req.headers.languagecode;
        if (req.body.phone && req.body.phone[0] === '+')
            req.body.phone = req.body.phone.slice(1, req.body.phone.length);
        const bodyValidation = {
            email: Joi.string().regex(config_1.default.emailRegex).required(),
            phone: Joi.string().required(),
            firstName: Joi.string().required(),
            lastName: Joi.string().required(),
        };
        const result = Joi.validate(req.body, bodyValidation);
        if (result.error) {
            return Helpers.failedResponse(res, { message: result.error.details[0].message });
        }
        if (req.body.phone && (req.body.phone.length !== 9 || !Helpers.isValidPhoneNumber(req.body.phone))) {
            return Helpers.failedResponse(res, { message: 'Not valid phone number' });
        }
        const admin = yield admin_1.default
            .findOne()
            .where({ _id: { $ne: req.user._id } })
            .where({ email: req.body.email })
            .where({ deleted: false });
        if (admin) {
            return Helpers.failedResponse(res, { message: Constants.errorEmailExist[language] });
        }
        return next();
    }
    catch (error) {
        Helpers.errorHandler(req, res, { error: error });
    }
});
exports.editWithAdmin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const language = req.headers.languagecode;
        if (req.body.phone && req.body.phone[0] === '+')
            req.body.phone = req.body.phone.slice(1, req.body.phone.length);
        const bodyValidation = {
            email: Joi.string().regex(config_1.default.emailRegex).required(),
            firstName: Joi.string().required(),
            lastName: Joi.string().required(),
            phone: Joi.string().required(),
            role: Joi.number().required(),
        };
        const paramsValidation = { id: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required() };
        const paramsResult = Joi.validate(req.params, paramsValidation);
        if (paramsResult.error) {
            return Helpers.failedResponse(res, { message: 'Id is not valid' });
        }
        const result = Joi.validate(req.body, bodyValidation, { allowUnknown: true });
        if (result.error) {
            return Helpers.failedResponse(res, { message: result.error.details[0].message });
        }
        if (req.body.phone && (req.body.phone.length !== 9 || !Helpers.isValidPhoneNumber(req.body.phone))) {
            return Helpers.failedResponse(res, { message: 'Not valid phone number' });
        }
        if (req.body.firstName && req.body.firstName.length < 2) {
            return Helpers.failedResponse(res, { message: 'Not valid first name' });
        }
        if (req.body.lastName && req.body.lastName.length < 2) {
            return Helpers.failedResponse(res, { message: 'Not valid last name' });
        }
        const admin = yield admin_1.default
            .findOne()
            .where({ _id: { $ne: req.params.id } })
            .where({ email: req.body.email })
            .where({ deleted: false });
        if (admin) {
            return Helpers.failedResponse(res, { message: Constants.errorEmailExist[language] });
        }
        return next();
    }
    catch (error) {
        Helpers.errorHandler(req, res, { error: error });
    }
});
exports.deleteAdmin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
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
exports.upload = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
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
