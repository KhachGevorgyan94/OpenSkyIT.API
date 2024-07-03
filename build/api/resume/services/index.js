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
const enums_1 = require("../enums");
const resume_1 = require("../../../schemas/resume");
exports.createCompany = (body, user) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield resume_1.default.create({
            name: body.name,
            phoneNumber: body.phoneNumber,
            email: body.email,
        });
        return {
            success: true,
            data: data._id,
            message: "Company successfully created",
        };
    }
    catch (error) {
        throw error;
    }
});
exports.uploadCompanyImage = (companyId, imageType, files) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(files);
    try {
        const company = yield resume_1.default.findById(companyId);
        const imagePath = (files.imagePath && files.imagePath[0].filename) || null;
        if (+imageType === enums_1.CompanyFileEnum.coverPhoto) {
            company.imagePath = imagePath;
        }
        yield company.save();
        return {
            success: true,
            data: null,
            message: "Successfully updated",
        };
    }
    catch (error) {
        throw error;
    }
});
