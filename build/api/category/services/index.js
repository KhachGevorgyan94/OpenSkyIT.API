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
//#endregion
//#region Enum
const enums_1 = require("../../../helpers/enums");
//#endregion
//#region Schemas
const tutor_1 = require("../../../schemas/tutor");
const enums_2 = require("../enums");
//#endregion
//#region Additional Services
//#endregion
exports.categoryList = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let categoryList = yield tutor_1.default
            .find()
            .where({ status: enums_1.SchemaStatusEnum.published })
            .select('imagePath name workingPlace workingPosition')
            .sort('positionList');
        return {
            success: true,
            data: categoryList,
            message: 'ok'
        };
    }
    catch (error) {
        throw error;
    }
});
exports.details = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const category = yield tutor_1.default
            .findById(id)
            .select('imagePath name description webImagePath onlineShopPermissions iconPath');
        return {
            success: true,
            data: category,
            message: 'ok'
        };
    }
    catch (error) {
        throw error;
    }
});
exports.partnersCount = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let mainCategory = yield tutor_1.default
            .findById(id)
            .select('count').populate({
            path: 'count',
            match: { status: enums_1.SchemaStatusEnum.published },
            select: '_id',
        });
        let partners = mainCategory.toObject({ virtuals: true });
        mainCategory.count = partners.count.length;
        return partners.count.length;
    }
    catch (error) {
        throw error;
    }
});
//#region Only for Admin
exports.categoryListForAdmin = () => __awaiter(void 0, void 0, void 0, function* () {
    let data = yield tutor_1.default
        .find()
        .populate('createdBy', 'firstName lastName')
        .sort('positionList')
        .select({
        name: 1,
        createdBy: 1,
        createdAt: 1,
        status: 1,
        positionList: 1,
        imagePath: 1,
        iconPath: 1,
        webImagePath: 1,
        workingPlace: 1,
        workingPosition: 1
    });
    return {
        success: true,
        data: data,
        message: 'ok'
    };
});
exports.create = (body, user) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield tutor_1.default.create({
            name: body.name,
            createdBy: user._id,
            updateBy: user._id,
            workingPlace: body.workingPlace,
            workingPosition: body.workingPosition
        });
        return {
            success: true,
            data: data._id,
            message: 'ok'
        };
    }
    catch (error) {
        throw error;
    }
});
exports.editCategory = (body, user, id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield tutor_1.default.findById({ _id: id });
        data.name = body.name;
        data.updateBy = user._id;
        data.workingPlace = body.workingPlace,
            data.workingPosition = body.workingPosition;
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
exports.changeStatus = (body, user, id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield tutor_1.default.findById(id);
        data.status = body.status;
        data.updateBy = user._id;
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
exports.changePosition = (body, user) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let filter;
        if (body.from < body.to)
            filter = { $gte: body.from, $lte: body.to };
        else
            filter = { $gte: body.to, $lte: body.from };
        const items = yield tutor_1.default.find({ positionList: filter }).select('_id positionList');
        yield Promise.all(items.map((item) => __awaiter(void 0, void 0, void 0, function* () {
            if (item.positionList === body.from) {
                item.positionList = body.to;
            }
            else {
                if (body.from < body.to)
                    item.positionList = item.positionList - 1;
                else
                    item.positionList = item.positionList + 1;
            }
            item.updateBy = user._id;
            return item.save();
        })));
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
exports.upload = (id, imageType, files, user) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const category = yield tutor_1.default.findById(id);
        const imagePath = (files.imagePath && files.imagePath[0].filename) || null;
        if (+(imageType) === enums_2.CategoryFileEnum.image) {
            if (category.imagePath)
                MediaServer.removeFile(category.imagePath);
            category.imagePath = imagePath;
        }
        category.updateBy = user._id;
        category.save();
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
//#endregion
