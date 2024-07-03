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
const express_1 = require("express");
const Services = require("./services");
const Validations = require("./services/validations");
const jwt_validation_1 = require("../jwt-validation");
const Helpers = require("../../helpers");
const enums_1 = require("../../helpers/enums");
class Controller {
    constructor() {
        this.routes = () => {
            //#region POST
            this.router.post('/Token', Validations.token, this.token);
            this.router.post('/Token/ByVC', jwt_validation_1.checkAuthenticated(), Validations.tokenByVC, this.tokenByVC);
            this.router.post('/Token/Admin', Validations.adminToken, this.adminToken);
            this.router.post('/SendForgotKey', Validations.forgotKey, this.sendForgotKey);
            this.router.post('/CheckForgotKey', Validations.checkForgotKey, this.checkForgotKey);
            this.router.post('/ResetPassword', Validations.resetPassword, this.resetPassword);
            this.router.post('/Logout', jwt_validation_1.isAuthenticated([enums_1.UserRole.customer, enums_1.UserRole.driver]), Validations.logout, this.logout);
            //#endregion
        };
        this.token = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield Services.token(req.body);
                Helpers.responseHandler(res, data);
            }
            catch (error) {
                Helpers.errorHandler(req, res, { error: error });
            }
        });
        this.tokenByVC = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield Services.tokenByVC(req.body, req.user);
                Helpers.responseHandler(res, data);
            }
            catch (error) {
                Helpers.errorHandler(req, res, { error: error });
            }
        });
        this.adminToken = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield Services.adminToken(req.body);
                Helpers.responseHandler(res, data);
            }
            catch (error) {
                Helpers.errorHandler(req, res, { error: error });
            }
        });
        this.sendForgotKey = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                yield Services.forgotKey(res, req.body.email);
            }
            catch (error) {
                Helpers.errorHandler(req, res, { error: error });
            }
        });
        this.checkForgotKey = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield Services.checkForgotKey(req.body);
                Helpers.responseHandler(res, data);
            }
            catch (error) {
                Helpers.errorHandler(req, res, { error: error });
            }
        });
        this.resetPassword = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield Services.resetPassword(req.body);
                Helpers.responseHandler(res, data);
            }
            catch (error) {
                Helpers.errorHandler(req, res, { error: error });
            }
        });
        this.logout = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield Services.logout(req.body);
                Helpers.responseHandler(res, data);
            }
            catch (error) {
                Helpers.errorHandler(req, res, { error: error });
            }
        });
        this.router = express_1.Router();
        this.routes();
    }
}
exports.default = new Controller().router;
