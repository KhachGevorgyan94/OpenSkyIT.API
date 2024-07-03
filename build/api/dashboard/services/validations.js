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
exports.orderCountFilter = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        const bodyValidation = {
            dateFrom: [Joi.date().required(), Joi.string().required()],
            dateTo: [Joi.date().allow('').allow(null).optional(), Joi.string().allow('').allow(null).optional()],
        };
        const result = Joi.validate(body, bodyValidation);
        if (result.error) {
            return Helpers.failedResponse(res, { message: result.error.details[0].message });
        }
        return next();
    }
    catch (error) {
        Helpers.errorHandler(req, res, { error: error });
    }
});
exports.getMonthDaysCount = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        const bodyValidation = {
            month: Joi.number().required()
        };
        const result = Joi.validate(body, bodyValidation);
        if (result.error) {
            return Helpers.failedResponse(res, { message: result.error.details[0].message });
        }
        return next();
    }
    catch (error) {
        Helpers.errorHandler(req, res, { error: error });
    }
});
