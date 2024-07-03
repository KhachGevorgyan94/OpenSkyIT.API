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
const jwt_validation_1 = require("./../jwt-validation");
const express_1 = require("express");
const Services = require("./services");
const Validations = require("./services/validations");
const MediaServer = require("../media-server");
const jwt_validation_2 = require("../jwt-validation");
const Helpers = require("../../helpers");
const enums_1 = require("../../helpers/enums");
class Controller {
    constructor() {
        this.routes = () => {
            //#region GET
            this.router.get('/Details/:id', Validations.details, this.getDetails);
            this.router.get('/', Validations.getCompanies, jwt_validation_1.isAuthenticatedOrGuest([enums_1.UserRole.customer, enums_1.UserRole.guest]), this.getTopCompanies);
            this.router.get('/WithDistance', Validations.getCompaniesWithDistance, jwt_validation_1.isAuthenticatedOrGuest([enums_1.UserRole.customer, enums_1.UserRole.guest]), this.getCompaniesWithDistance);
            this.router.post('/GetMore', jwt_validation_1.isAuthenticatedOrGuest([enums_1.UserRole.customer, enums_1.UserRole.guest]), this.getMore);
            this.router.get('/Sales', this.getSalesCompanies);
            this.router.get('/:companyName', jwt_validation_2.isAuthenticated([enums_1.UserRole.admin]), this.search);
            //#endregion
            //#region POST
            this.router.post('/GetByFilter', Validations.getCompaniesByFilter, this.getCompaniesByFilter);
            this.router.post('/ForAdmin', jwt_validation_2.isAuthenticated([enums_1.UserRole.admin]), Validations.getCompaniesForAdmin, this.getCompaniesForAdmin);
            this.router.post('/ShortListByFilter', jwt_validation_2.isAuthenticated([enums_1.UserRole.admin, enums_1.UserRole.operator]), Validations.getShortList, this.getShortListByFilter);
            this.router.post('/Create', jwt_validation_2.isAuthenticated([enums_1.UserRole.admin]), Validations.createCompany, this.create);
            //#endregion
            //#region PUT
            this.router.put('/Upload', jwt_validation_2.isAuthenticated([enums_1.UserRole.admin]), MediaServer.handleUpload, Validations.upload, this.upload);
            this.router.put('/Edit/:id', jwt_validation_2.isAuthenticated([enums_1.UserRole.admin]), Validations.editCompany, this.editCompany);
            this.router.put('/Status/:id', jwt_validation_2.isAuthenticated([enums_1.UserRole.admin]), Validations.changeStatus, this.changeStatus);
            this.router.put('/Position', jwt_validation_2.isAuthenticated([enums_1.UserRole.admin]), Validations.changePosition, this.changePosition);
            //#endregion
        };
        this.create = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield Services.createCourse(req.body, req.user);
                Helpers.responseHandler(res, data);
            }
            catch (error) {
                Helpers.errorHandler(req, res, { error: error });
            }
        });
        this.upload = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield Services.uploadCompanyImage(req.query.companyId, req.query.imageType, req.files);
                Helpers.responseHandler(res, data);
            }
            catch (error) {
                Helpers.errorHandler(req, res, { error: error });
            }
        });
        this.editCompany = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield Services.editCompany(req.body, req.user, req.params.id);
                Helpers.responseHandler(res, data);
            }
            catch (error) {
                Helpers.errorHandler(req, res, { error: error });
            }
        });
        /**
         * This function is edit company status
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
        this.changePosition = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield Services.changePosition(req.body, req.user);
                Helpers.responseHandler(res, data);
            }
            catch (error) {
                Helpers.errorHandler(req, res, { error: error });
            }
        });
        this.getDetails = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield Services.details(req.params.id);
                Helpers.responseHandler(res, data);
            }
            catch (error) {
                Helpers.errorHandler(req, res, { error: error });
            }
        });
        this.getMore = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                req.query.sortBy = +(req.query.sortBy);
                const data = yield Services.getMore(req.query, req.user, req.body);
                Helpers.responseHandler(res, data);
            }
            catch (error) {
                Helpers.errorHandler(req, res, { error: error });
            }
        });
        this.getCompaniesWithDistance = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                req.query.sortBy = +(req.query.sortBy);
                const data = yield Services.getCompaniesWithDistance(req.query, req.user);
                Helpers.responseHandler(res, data);
            }
            catch (error) {
                Helpers.errorHandler(req, res, { error: error });
            }
        });
        this.getTopCompanies = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                req.query.sortBy = +(req.query.sortBy);
                const data = yield Services.getTopCompanies(req.query, req.user);
                Helpers.responseHandler(res, data);
            }
            catch (error) {
                Helpers.errorHandler(req, res, { error: error });
            }
        });
        this.getCompanies = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                req.query.sortBy = +(req.query.sortBy);
                const data = yield Services.getCompanies(req.query);
                Helpers.responseHandler(res, data);
            }
            catch (error) {
                Helpers.errorHandler(req, res, { error: error });
            }
        });
        this.getSalesCompanies = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                req.query.sortBy = +(req.query.sortBy);
                const data = yield Services.getSalesCompanies(req.query);
                Helpers.responseHandler(res, data);
            }
            catch (error) {
                Helpers.errorHandler(req, res, { error: error });
            }
        });
        this.getCompaniesByFilter = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                req.body.sortBy = +(req.body.sortBy);
                const data = yield Services.getCompaniesByFilter(req.body);
                Helpers.responseHandler(res, data);
            }
            catch (error) {
                Helpers.errorHandler(req, res, { error: error });
            }
        });
        this.getCompaniesForAdmin = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield Services.getCompaniesForAdmin(req.query, req.body);
                Helpers.responseHandler(res, data);
            }
            catch (error) {
                Helpers.errorHandler(req, res, { error: error });
            }
        });
        this.getShortListByFilter = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield Services.getShortListByFilter(req.body);
                Helpers.responseHandler(res, data);
            }
            catch (error) {
                Helpers.errorHandler(req, res, { error: error });
            }
        });
        this.search = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield Services.searchCompany(req.params.companyName);
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
