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
const index_1 = require("./../../helpers/enums/index");
const jwt_validation_1 = require("./../jwt-validation");
const express_1 = require("express");
const Services = require("./services");
const Helpers = require("../../helpers");
const Validations = require("./services/validations");
class Controller {
    constructor() {
        this.routes = () => {
            this.router.post('/info', this.myApi);
            this.router.post('/apply', Validations.instaServiceApply, this.instaServiceApply);
            this.router.post('/hybrid', Validations.hybrid, this.applyHybrid);
            this.router.post('/fda', Validations.fda, this.fda);
            this.router.post("/Register", Validations.register, this.register);
            this.router.post("/GetListWithPaging", jwt_validation_1.isAuthenticated([index_1.UserRole.admin]), Validations.getListWithPaging, this.getListWithPaging);
            this.router.post("/SendEmailToUser", Validations.sendEmailToUser, this.sendEmailToUser);
            this.router.post("/SendResume", this.sendResume);
            this.router.post("/CreateCV", Validations.createCV, this.createCV);
            this.router.post('/DownloadExcel', jwt_validation_1.isAuthenticated([index_1.UserRole.admin]), this.downloadExcel);
        };
        this.createCV = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield Services.createCV(req.body);
                Helpers.responseHandler(res, data);
            }
            catch (error) {
                Helpers.errorHandler(req, res, { error: error });
            }
        });
        this.fda = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield Services.fda(req.body);
                Helpers.responseHandler(res, data);
            }
            catch (error) {
                Helpers.errorHandler(req, res, { error: error });
            }
        });
        this.downloadExcel = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield Services.downloadExcelFile(req.body);
                Helpers.responseHandler(res, data);
            }
            catch (error) {
                Helpers.errorHandler(req, res, { error });
            }
        });
        this.sendEmailToUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield Services.sendEmailToUser(req.body);
                Helpers.responseHandler(res, data);
            }
            catch (error) {
                Helpers.errorHandler(req, res, { error: error });
            }
        });
        this.sendResume = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield Services.sendResume(req.files);
                Helpers.responseHandler(res, data);
            }
            catch (error) {
                Helpers.errorHandler(req, res, { error: error });
            }
        });
        this.myApi = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield Services.myApi(req.body);
                Helpers.responseHandler(res, data);
            }
            catch (error) {
                Helpers.errorHandler(req, res, { error: error });
            }
        });
        this.instaServiceApply = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield Services.instaServiceApply(req.body);
                Helpers.responseHandler(res, data);
            }
            catch (error) {
                Helpers.errorHandler(req, res, { error: error });
            }
        });
        this.applyHybrid = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield Services.applyHybrid(req.body);
                Helpers.responseHandler(res, data);
            }
            catch (error) {
                Helpers.errorHandler(req, res, { error: error });
            }
        });
        this.register = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield Services.createUser(req.body);
                Helpers.responseHandler(res, data);
            }
            catch (error) {
                Helpers.errorHandler(req, res, { error: error });
            }
        });
        this.getListWithPaging = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield Services.getListWithPaging(req.body);
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
