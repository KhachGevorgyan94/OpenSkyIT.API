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
const Helpers = require("../../helpers");
const enums_1 = require("../../helpers/enums");
const jwt_validation_1 = require("../jwt-validation");
const MediaServer = require("../media-server");
const Services = require("./services");
const Validations = require("./services/validations");
class Controller {
    constructor() {
        this.routes = () => {
            this.router.get('/All', jwt_validation_1.isAuthenticatedOrGuest([enums_1.UserRole.admin, enums_1.UserRole.customer, enums_1.UserRole.guest]), this.all);
            this.router.put('/UploadBanner', jwt_validation_1.isAuthenticated([enums_1.UserRole.admin]), MediaServer.multyUpload, this.uploadBanner);
            this.router.post('/Info', jwt_validation_1.isAuthenticated([enums_1.UserRole.admin]), Validations.Info, this.info);
        };
        this.uploadBanner = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield Services.uploadImages(req.files, req.body.oldFiles);
                Helpers.responseHandler(res, data);
            }
            catch (error) {
                Helpers.errorHandler(req, res, { error });
            }
        });
        this.all = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield Services.all();
                Helpers.responseHandler(res, data);
            }
            catch (error) {
                Helpers.errorHandler(req, res, { error });
            }
        });
        this.info = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield Services.info(req.body);
                Helpers.responseHandler(res, data);
            }
            catch (error) {
                Helpers.errorHandler(req, res, { error });
            }
        });
        this.router = express_1.Router();
        this.routes();
    }
}
exports.default = new Controller().router;
