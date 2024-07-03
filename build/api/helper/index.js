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
const node_fetch_1 = require("node-fetch");
const Helpers = require("../../helpers");
class Controller {
    constructor() {
        this.routes = () => {
            //#region POST
            this.router.post('/MakeRequest', this.request);
            //#endregion
        };
        this.request = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield node_fetch_1.default(`${req.body.requestUrl}`, {
                    method: 'Get',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                const data = yield response.json();
                Helpers.responseHandler(res, {
                    success: true,
                    data,
                    message: 'ok'
                });
            }
            catch (error) {
                Helpers.failedResponse(res);
            }
        });
        this.router = express_1.Router();
        this.routes();
    }
}
exports.default = new Controller().router;
