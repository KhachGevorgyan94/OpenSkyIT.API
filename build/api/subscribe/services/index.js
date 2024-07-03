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
const subscribedUsers_1 = require("../../../schemas/subscribedUsers");
const Helper = require("../../../helpers");
const shared_service_1 = require("./../../shared-service");
const excel_service_1 = require("../../excel-service");
exports.subscribe = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const alreadySubscribed = yield subscribedUsers_1.default.findOne({
            $or: [{ email: data.email }],
        });
        if (!alreadySubscribed) {
            if (data.email)
                yield new subscribedUsers_1.default({
                    email: data.email,
                }).save();
            return {
                success: true,
                data: null,
                message: "Դուք հաջողությամբ բաժանորդագրվել եք",
            };
        }
        else {
            return {
                success: false,
                data: null,
                message: "Դուք արդեն բաժանորդագրված եք",
            };
        }
    }
    catch (error) {
        throw error;
    }
});
exports.getListWithPaging = (body) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = shared_service_1.subscribedUsersFilter(body)
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
exports.downloadExcelFile = (body) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const createUsersExcel = yield excel_service_1.handlerSubscribedUsersExcelFile(body);
        return {
            success: true,
            data: createUsersExcel,
            message: "Successfully",
        };
    }
    catch (error) {
        throw error;
    }
});
