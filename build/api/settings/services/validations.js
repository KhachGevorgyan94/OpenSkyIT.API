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
const settings_1 = require("../../../schemas/settings");
//#endregion
exports.Info = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bodyValidation = {
            title: Joi.string().required(),
            description: Joi.string().required(),
        };
        const result = Joi.validate(req.body, bodyValidation);
        if (result.error) {
            return Helpers.failedResponse(res, { message: result.error.details[0].message });
        }
        const promotion = yield settings_1.default.findOne();
        ;
        if (!promotion) {
            return Helpers.failedResponse(res, { message: 'Promotion not found' });
        }
        return next();
    }
    catch (error) {
        Helpers.errorHandler(req, res, { error: error });
    }
});
