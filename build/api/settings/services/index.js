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
//#endregion
//#region Schemas
const settings_1 = require("../../../schemas/settings");
//#endregion
exports.uploadImages = (files, oldFiles) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        oldFiles = oldFiles || [];
        const data = yield settings_1.default.findOne();
        const newFiles = (files.files || []).map(x => x.filename);
        // MediaServer.compareAndRemove(data.homeBanner, oldFiles || []);
        data.homeBanner = newFiles;
        yield data.save();
        return {
            success: true,
            data: null,
            message: 'ok'
        };
    }
    catch (error) {
        throw error;
    }
});
exports.all = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield settings_1.default.findOne();
        return {
            success: true,
            data,
            message: 'ok'
        };
    }
    catch (error) {
        throw error;
    }
});
exports.info = (body) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield settings_1.default.findOne();
        data.title = body.title;
        data.description = body.description;
        yield data.save();
        return {
            success: true,
            data,
            message: 'ok'
        };
    }
    catch (error) {
        throw error;
    }
});
