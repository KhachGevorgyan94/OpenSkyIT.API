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
const jwt = require("jsonwebtoken");
const config_1 = require("../config");
const Helpers = require("../helpers");
const enums_1 = require("../helpers/enums");
const user_1 = require("../schemas/user");
const admin_1 = require("../schemas/admin");
exports.checkUser = (id, role) => {
    if (role === enums_1.UserRole.customer) {
        return user_1.default.findById(id).populate('addresses');
    }
    else if (role === enums_1.UserRole.admin || role === enums_1.UserRole.operator || role === enums_1.UserRole.dispatcher || role === enums_1.UserRole.dispatcherAdmin) {
        return admin_1.default.findById(id);
    }
};
const checkToken = (token) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userInfo = jwt.verify(token, config_1.default.secretKey);
        const user = yield exports.checkUser(userInfo['_id'], userInfo['role']);
        if (!user.blocked && !user.deleted) {
            return {
                user,
                success: true
            };
        }
        else {
            return {
                success: false,
                statusCode: 401,
                message: user.blocked ? 'User is blocked' : 'User not found',
            };
        }
    }
    catch (error) {
        return {
            success: false,
            statusCode: 401,
            message: 'Invalid or missing authorization token',
        };
    }
});
const checkRoles = (user, roles) => {
    let check = false;
    roles.forEach(role => {
        if (user.role == role)
            check = true;
    });
    return check;
};
exports.isAuthenticated = (roles) => {
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        if (req.headers && req.headers.authorization) {
            const token = req.headers.authorization.toString();
            const data = yield checkToken(token);
            if (data.success) {
                req.user = data.user;
                if (!roles)
                    return next();
                if (checkRoles(req.user, roles))
                    return next();
            }
            else {
                return Helpers.failedResponse(res, {
                    statusCode: data.statusCode,
                    message: data.message,
                });
            }
        }
        return Helpers.failedResponse(res, {
            statusCode: 401,
            message: 'Unauthorized'
        });
    });
};
exports.isAuthenticatedOrGuest = (roles) => {
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        if (req.headers && req.headers.authorization && req.headers.authorization !== 'null' && req.headers.authorization !== 'undefined') {
            const token = req.headers.authorization.toString();
            const data = yield checkToken(token);
            if (data.success) {
                req.user = data.user;
                if (!roles)
                    return next();
                if (checkRoles(req.user, roles))
                    return next();
            }
            else {
                return Helpers.failedResponse(res, {
                    statusCode: data.statusCode,
                    message: data.message,
                });
            }
        }
        return next();
    });
};
exports.checkAuthenticated = () => {
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        if (req.headers && req.headers.authorization) {
            const token = req.headers.authorization.toString();
            const data = yield checkToken(token);
            if (data.success) {
                req.user = data.user;
            }
            return next();
        }
        return next();
    });
};
