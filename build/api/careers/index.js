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
            this.router.get('/ForAdmin', jwt_validation_1.isAuthenticated([enums_1.UserRole.admin]), this.careersListForAdmin);
            this.router.get('/Details/:id', Validations.details, this.details);
            this.router.get('/', this.careersList);
            //#endregion
            //#region POST
            this.router.post('/Create', jwt_validation_1.isAuthenticated([enums_1.UserRole.admin]), Validations.create, this.create);
            //#endregion
            //#region PUT
            this.router.put('/Status/:id', jwt_validation_1.isAuthenticated([enums_1.UserRole.admin]), Validations.changeStatus, this.changeStatus);
            this.router.put('/Upload', jwt_validation_1.isAuthenticated([enums_1.UserRole.admin]), MediaServer.handleUpload, Validations.upload, this.upload);
            this.router.put('/Edit/:id', jwt_validation_1.isAuthenticated([enums_1.UserRole.admin]), MediaServer.handleUpload, Validations.editPromotion, this.editCategory);
            //#endregion
        };
        this.careersList = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield Services.careersList();
                Helpers.responseHandler(res, data);
            }
            catch (error) {
                Helpers.errorHandler(req, res, { error: error });
            }
        });
        this.details = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield Services.details(req.params.id);
                Helpers.responseHandler(res, data);
            }
            catch (error) {
                Helpers.errorHandler(req, res, { error: error });
            }
        });
        //#region Only for Admin
        this.careersListForAdmin = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield Services.careersListForAdmin();
                Helpers.responseHandler(res, data);
            }
            catch (error) {
                Helpers.errorHandler(req, res, { error: error });
            }
        });
        /**
         * This function is create careers
         */
        this.create = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield Services.create(req.body, req.user);
                Helpers.responseHandler(res, data);
            }
            catch (error) {
                Helpers.errorHandler(req, res, { error: error });
            }
        });
        /**
         * This function is edit careers
         */
        this.editCategory = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield Services.editCareers(req.body, req.user, req.params.id);
                Helpers.responseHandler(res, data);
            }
            catch (error) {
                Helpers.errorHandler(req, res, { error: error });
            }
        });
        /**
         * This function is edit main careers status
         */
        this.changeStatus = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield Services.changeStatus(req.body, req.user, req.params.id);
                Helpers.responseHandler(res, data);
            }
            catch (error) {
                Helpers.errorHandler(req, res, { error: error });
            }
        });
        /**
         * This function is add image to careers
         */
        this.upload = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield Services.upload(req.query.id, req.query.imageType, req.files, req.user);
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
