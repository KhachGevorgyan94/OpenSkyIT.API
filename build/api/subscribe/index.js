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
const Validations = require("./services/validations");
const Services = require("./services");
const enums_1 = require("../../helpers/enums");
const jwt_validation_1 = require("../jwt-validation");
class Controller {
    constructor() {
        this.routes = () => {
            this.router.post("/Subscribe", Validations.subscribe, this.subscribe);
            this.router.post("/GetListWithPaging", jwt_validation_1.isAuthenticated([enums_1.UserRole.admin]), Validations.getListWithPaging, this.getListWithPaging);
            this.router.post('/DownloadExcel', jwt_validation_1.isAuthenticated([enums_1.UserRole.admin]), this.downloadExcel);
        };
        this.subscribe = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield Services.subscribe(req.body);
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
        this.downloadExcel = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield Services.downloadExcelFile(req.body);
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
