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
exports.subscribe = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bodyValidation = {
            email: Joi.string().required(),
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
        const bodyValidation = Object.assign(Object.assign({}, AppValidation.pagination), { email: Joi.string().allow(null).allow(""), registrationDateEnd: Joi.date().iso().allow(null).allow(""), registrationDateStart: Joi.date().iso().allow(null).allow("") });
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
