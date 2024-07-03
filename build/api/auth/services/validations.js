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
const user_1 = require("../../../schemas/user");
const admin_1 = require("../../../schemas/admin");
//#endregion
exports.token = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const language = req.headers.languagecode;
    const bodyValidation = {
        email: Joi.string().required(),
        password: Joi.required(),
    };
    const result = Joi.validate(req.body, bodyValidation, { allowUnknown: true });
    if (result.error) {
        return Helpers.failedResponse(res, { message: Constants.errorIncorrectLogin[language] });
    }
    const user = yield user_1.default.findOne({
        $or: [
            { email: req.body.email.toLowerCase() },
            { phone: req.body.email },
        ]
    });
    if (!user) {
        return Helpers.failedResponse(res, { message: Constants.errorIncorrectLogin[language] });
    }
    const isValid = yield bcrypt.compare(req.body.password, user.password);
    if (!isValid) {
        return Helpers.failedResponse(res, { message: Constants.errorIncorrectLogin[language] });
    }
    if (req.body.password < 6) {
        return Helpers.failedResponse(res, { message: Constants.errorWrongPassword[language] });
    }
    return next();
});
exports.tokenByVC = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const language = req.headers.languagecode;
    const bodyValidation = {
        phone: Joi.string().required(),
        verificationCode: Joi.string().required(),
    };
    const BODY = req.body;
    const result = Joi.validate(BODY, bodyValidation, { allowUnknown: true });
    if (result.error) {
        return Helpers.failedResponse(res, { message: Constants.errorIncorrectLogin[language] });
    }
    return next();
});
exports.logout = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const bodyValidation = {
        deviceId: Joi.string().required(),
    };
    const result = Joi.validate(req.body, bodyValidation, { allowUnknown: true });
    if (result.error) {
        return Helpers.failedResponse(res, { message: result.error.details[0].message });
    }
    return next();
});
exports.adminToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const language = req.headers.languagecode;
    const bodyValidation = {
        email: Joi.string().regex(config_1.default.emailRegex).required(),
        password: Joi.required(),
    };
    const result = Joi.validate(req.body, bodyValidation, { allowUnknown: true });
    const admin = yield admin_1.default.findOne({ email: req.body.email.toLowerCase() });
    if (!admin) {
        return Helpers.failedResponse(res, { message: Constants.errorIncorrectLogin[language] });
    }
    if (req.body.password < 6) {
        return Helpers.failedResponse(res, { message: Constants.errorWrongPassword[language] });
    }
    const isValid = yield bcrypt.compare(req.body.password, admin.password);
    if (!isValid) {
        return Helpers.failedResponse(res, { message: Constants.errorIncorrectLogin[language] });
    }
    if (result.error) {
        return Helpers.failedResponse(res, { message: Constants.errorIncorrectLogin[language] });
    }
    return next();
});
exports.forgotKey = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const language = req.headers.languagecode;
        const bodyValidation = {
            email: Joi.string().required()
        };
        const result = Joi.validate(req.body, bodyValidation, { allowUnknown: true });
        if (result.error) {
            return Helpers.failedResponse(res, { message: Constants.errorInvalidEmail[language] });
        }
        const user = yield user_1.default.findOne({
            $or: [
                { email: req.body.email.toLowerCase() },
                { phone: req.body.email },
            ]
        });
        if (!user) {
            return Helpers.failedResponse(res, { message: Constants.errorPersonNotFound[language] });
        }
        return next();
    }
    catch (error) {
        Helpers.errorHandler(req, res, { error: error });
    }
});
exports.checkForgotKey = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const language = req.headers.languagecode;
        const bodyValidation = {
            email: Joi.string().required(),
            forgotKey: Joi.string().required()
        };
        const result = Joi.validate(req.body, bodyValidation, { allowUnknown: true });
        if (result.error) {
            return Helpers.failedResponse(res, { message: result.error.details[0].message });
        }
        const user = yield user_1.default.findOne({
            $or: [
                { email: req.body.email.toLowerCase() },
                { phone: req.body.email },
            ]
        });
        if (!user) {
            return Helpers.failedResponse(res, { message: Constants.errorPersonNotFound[language] });
        }
        return next();
    }
    catch (error) {
        Helpers.errorHandler(req, res, { error: error });
    }
});
exports.resetPassword = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const language = req.headers.languagecode;
        const bodyValidation = {
            email: Joi.string().required(),
            forgotKey: Joi.string().required(),
            newPassword: Joi.string().required(),
            confirmPassword: Joi.string().required(),
        };
        const result = Joi.validate(req.body, bodyValidation, { allowUnknown: true });
        if (result.error) {
            return Helpers.failedResponse(res, { message: result.error.details[0].message });
        }
        const user = yield user_1.default.findOne({
            $or: [
                { email: req.body.email.toLowerCase() },
                { phone: req.body.email },
            ]
        });
        if (!user) {
            return Helpers.failedResponse(res, { message: Constants.errorPersonNotFound[language] });
        }
        if (req.body.newPassword !== req.body.confirmPassword) {
            return Helpers.failedResponse(res, { message: Constants.errorDoesNotMatchPassword[language] });
        }
        return next();
    }
    catch (error) {
        Helpers.errorHandler(req, res, { error: error });
    }
});
