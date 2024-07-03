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
const MediaServer = require("../media-server");
const jwt_validation_1 = require("../jwt-validation");
const Helpers = require("../../helpers");
const enums_1 = require("../../helpers/enums");
class Controller {
    constructor() {
        this.routes = () => {
            //#region GET
            this.router.get('/Details', jwt_validation_1.isAuthenticated([enums_1.UserRole.admin, enums_1.UserRole.dispatcher, enums_1.UserRole.operator, enums_1.UserRole.dispatcherAdmin]), this.userDetails);
            this.router.get('/List', jwt_validation_1.isAuthenticated([enums_1.UserRole.admin, enums_1.UserRole.dispatcher, enums_1.UserRole.operator, enums_1.UserRole.dispatcherAdmin]), Validations.getList, this.getList);
            //#endregion
            this.router.post('/Create', jwt_validation_1.isAuthenticated([enums_1.UserRole.admin]), Validations.create, this.create);
            //#region PUT
            this.router.put('/Upload/:id', jwt_validation_1.isAuthenticated([enums_1.UserRole.admin]), MediaServer.handleUpload, Validations.upload, this.upload);
            this.router.put('/ChangeProfileImage', jwt_validation_1.isAuthenticated([enums_1.UserRole.dispatcher, enums_1.UserRole.operator, enums_1.UserRole.admin, enums_1.UserRole.dispatcherAdmin]), MediaServer.handleUpload, this.changeProfileImage);
            this.router.put('/ChangePassword', jwt_validation_1.isAuthenticated([enums_1.UserRole.admin, enums_1.UserRole.dispatcher, enums_1.UserRole.operator, enums_1.UserRole.dispatcherAdmin]), Validations.changePassword, this.changePassword);
            this.router.put('/ChangePassword/:id', jwt_validation_1.isAuthenticated([enums_1.UserRole.admin]), Validations.changePasswordForAdmin, this.changePasswordForAdmin);
            this.router.put('/Edit', jwt_validation_1.isAuthenticated([enums_1.UserRole.dispatcher, enums_1.UserRole.operator, enums_1.UserRole.admin, enums_1.UserRole.dispatcherAdmin]), Validations.edit, this.edit);
            this.router.put('/Edit/:id', jwt_validation_1.isAuthenticated([enums_1.UserRole.admin]), Validations.editWithAdmin, this.editWithAdmin);
            //#endregion
            this.router.delete('/Delete/:id', jwt_validation_1.isAuthenticated([enums_1.UserRole.admin]), Validations.deleteAdmin, this.delete);
        };
        this.upload = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield Services.upload(req.params.id, req.files);
                Helpers.responseHandler(res, data);
            }
            catch (error) {
                Helpers.errorHandler(req, res, { error: error });
            }
        });
        this.changeProfileImage = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield Services.upload(req.user._id, req.files);
                Helpers.responseHandler(res, data);
            }
            catch (error) {
                Helpers.errorHandler(req, res, { error: error });
            }
        });
        this.userDetails = (req, res) => __awaiter(this, void 0, void 0, function* () {
            console.log(req);
            try {
                Helpers.responseHandler(res, {
                    success: true,
                    data: req.user.short(),
                    message: 'ok'
                });
            }
            catch (error) {
                Helpers.errorHandler(req, res, { error: error });
            }
        });
        this.getList = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield Services.getList(req.query.role);
                Helpers.responseHandler(res, data);
            }
            catch (error) {
                Helpers.errorHandler(req, res, { error: error });
            }
        });
        this.changePassword = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield Services.changePassword(req.body.newPassword, req.user);
                Helpers.responseHandler(res, data);
            }
            catch (error) {
                Helpers.errorHandler(req, res, { error: error });
            }
        });
        this.changePasswordForAdmin = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield Services.changePasswordForAdmin(req.body.password, req.params.id);
                Helpers.responseHandler(res, data);
            }
            catch (error) {
                Helpers.errorHandler(req, res, { error: error });
            }
        });
        this.create = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield Services.create(req.body);
                Helpers.responseHandler(res, data);
            }
            catch (error) {
                Helpers.errorHandler(req, res, { error: error });
            }
        });
        this.edit = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield Services.edit(req.body, req.user);
                Helpers.responseHandler(res, data);
            }
            catch (error) {
                Helpers.errorHandler(req, res, { error: error });
            }
        });
        this.editWithAdmin = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield Services.editWithAdmin(req.body, req.params.id);
                Helpers.responseHandler(res, data);
            }
            catch (error) {
                Helpers.errorHandler(req, res, { error: error });
            }
        });
        this.delete = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield Services.deleteAdmin(req.params.id);
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
