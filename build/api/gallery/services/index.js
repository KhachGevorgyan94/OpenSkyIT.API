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
const MediaServer = require("../../media-server");
const gallery_1 = require("../../../schemas/gallery");
const enums_1 = require("../../category/enums");
exports.categoryList = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let categoryList = yield gallery_1.default.find().select("src width height");
        return {
            success: true,
            data: categoryList,
            message: "ok",
        };
    }
    catch (error) {
        throw error;
    }
});
exports.editCategory = (user, id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield gallery_1.default.findById({ _id: id });
        data.updateBy = user._id;
        yield data.save();
        return {
            success: true,
            data: null,
            message: "ok",
        };
    }
    catch (error) {
        throw error;
    }
});
exports.categoryListForAdmin = () => __awaiter(void 0, void 0, void 0, function* () {
    let data = yield gallery_1.default.find().select({
        createdBy: 1,
        createdAt: 1,
        src: 1,
        width: 1,
        height: 1,
    });
    return {
        success: true,
        data: data,
        message: "ok",
    };
});
exports.create = (user, body) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield gallery_1.default.create({
            createdBy: user._id,
            updateBy: user._id,
            width: body.width,
            height: body.height,
        });
        return {
            success: true,
            data: data._id,
            message: "ok",
        };
    }
    catch (error) {
        throw error;
    }
});
exports.upload = (id, imageType, files, user) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const category = yield gallery_1.default.findById(id);
        const imagePath = (files.imagePath && files.imagePath[0].filename) || null;
        if (+imageType === enums_1.CategoryFileEnum.image) {
            if (category.src)
                MediaServer.removeFile(category.src);
            category.src = imagePath;
        }
        category.updateBy = user._id;
        category.save();
        return {
            success: true,
            data: null,
            message: "ok",
        };
    }
    catch (error) {
        throw error;
    }
});
//#endregion
