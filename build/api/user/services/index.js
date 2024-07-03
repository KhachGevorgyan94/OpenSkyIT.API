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
const excel_service_1 = require("./../../excel-service");
const pdf_1 = require("./../../../helpers/services/pdf");
const shared_service_1 = require("./../../shared-service");
const mailer_1 = require("../../../helpers/services/mailer");
const user_1 = require("../../../schemas/user");
const Helper = require("../../../helpers");
exports.myApi = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        mailer_1.sendVerification(data.name, data.phone, data.lesson, data.email);
        return {
            success: true,
            data: data,
            message: "Successfully created",
        };
    }
    catch (error) {
        throw error;
    }
});
exports.downloadExcelFile = (body) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const createUsersExcel = yield excel_service_1.handlerUsersExcelFile(body);
        return {
            success: true,
            data: createUsersExcel,
            message: 'Successfully'
        };
    }
    catch (error) {
        throw error;
    }
});
exports.sendEmailToUser = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        mailer_1.sendEmailUser(data.name, data.phone, data.lesson, data.email);
        return {
            success: true,
            data: data,
            message: "Successfully created",
        };
    }
    catch (error) {
        throw error;
    }
});
exports.createCV = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log('11111111111');
        const path = yield pdf_1.generateExport(data);
        // generateCVHtml(data);
        return {
            success: true,
            data: path,
            message: "Successfully created",
        };
    }
    catch (error) {
        throw error;
    }
});
exports.instaServiceApply = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        mailer_1.sendAppliement(data.name, data.phoneNumber, data.city, data.comment, data.category, data.companyName);
        return {
            success: true,
            data: data,
            message: "Successfully created",
        };
    }
    catch (error) {
        throw error;
    }
});
exports.applyHybrid = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        mailer_1.sendHybrid(data.name, data.email, data.message);
        return {
            success: true,
            data: data,
            message: "Successfully created",
        };
    }
    catch (error) {
        throw error;
    }
});
exports.fda = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        mailer_1.sendFDA(data.name, data.email, data.message);
        return {
            success: true,
            data: data,
            message: "Successfully created",
        };
    }
    catch (error) {
        throw error;
    }
});
exports.createUser = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (data.phone[0] === "+")
            data.phone = data.phone.slice(1, data.phone.length);
        const user = yield new user_1.default({
            firstName: data.name,
            email: data.email,
            phone: data.phone,
            lesson: data.lesson,
        }).save();
        return {
            success: true,
            data: null,
            message: "Successfully created",
        };
    }
    catch (error) {
        throw error;
    }
});
exports.sendResume = (files) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(files);
        return {
            success: true,
            data: null,
            message: "Successfully created",
        };
    }
    catch (error) {
        throw error;
    }
});
exports.getListWithPaging = (body) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = shared_service_1.usersFilter(body)
            .where({ deleted: false })
            .sort({ createdAt: -1 })
            .select({
            deleted: 0,
            password: 0,
            addresses: 0,
            __v: 0,
            forgotKey: 0,
        })
            .lean();
        const data = yield Helper.pagination(body, users);
        return {
            success: true,
            data: data,
            message: "ok",
        };
    }
    catch (error) {
        throw error;
    }
});
