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
//#region Schemas
const resume_1 = require("../../../schemas/resume");
const config_1 = require("../../../config");
//#endregion
exports.createCompany = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bodyValidation = {
            name: Joi.string().required(),
            phoneNumber: Joi.number().allow(null),
            email: Joi.string().regex(config_1.default.emailRegex).allow(null).optional(),
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
            companyId: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
            imageType: Joi.number().required(),
        };
        const result = Joi.validate(req.query, queryValidation);
        if (result.error) {
            return Helpers.failedResponse(res, { message: result.error.details[0].message });
        }
        const company = yield resume_1.default.findById(req.query.companyId);
        if (!company) {
            return Helpers.failedResponse(res, { message: 'Company are not found' });
        }
        return next();
    }
    catch (error) {
        Helpers.errorHandler(req, res, { error: error });
    }
});
