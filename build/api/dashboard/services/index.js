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
const user_1 = require("../../../schemas/user");
//#endregion
exports.newUsersCount = (body) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = user_1.default.find()
            .where({ deleted: false });
        if (body.dateFrom) {
            users.where({ createdAt: { $gte: body.dateFrom } });
        }
        if (body.dateTo) {
            users.where({ createdAt: { $lte: body.dateTo } });
        }
        const usersCount = yield users.countDocuments();
        return {
            success: true,
            data: usersCount,
            message: 'ok'
        };
    }
    catch (error) {
        throw error;
    }
});
