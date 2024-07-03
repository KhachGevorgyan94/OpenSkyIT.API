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
const services_1 = require("../../category/services");
//#endregion
//#region Enums
const enums_1 = require("../../../helpers/enums");
//#endregion
//#region Schemas
const subcategory_1 = require("../../../schemas/subcategory");
//#endregion
exports.addSubcategory = (body, user) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const count = yield subcategory_1.default
            .find()
            .where({ mainCategory: body.mainCategoryId })
            .count();
        const data = yield subcategory_1.default.create({
            name: body.name,
            mainCategory: body.mainCategoryId,
            positionList: count + 1,
            createdBy: user._id,
            updateBy: user._id
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
exports.editSubcategory = (body, user, id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield subcategory_1.default.findById(id);
        data.name = body.name;
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
exports.changeStatus = (body, user, id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield subcategory_1.default.findById(id);
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
        const items = yield subcategory_1.default.find({ positionList: filter, mainCategory: body.mainCategoryId }).select('_id positionList');
        yield Promise.all(items.map((item) => __awaiter(void 0, void 0, void 0, function* () {
            item.updateBy = user._id;
            if (item.positionList === body.from) {
                item.positionList = body.to;
            }
            else {
                if (body.from < body.to)
                    item.positionList = item.positionList - 1;
                else
                    item.positionList = item.positionList + 1;
            }
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
exports.subcategoryList = (mainCategoryId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let categoryList = yield subcategory_1.default
            .find()
            .where({ status: enums_1.SchemaStatusEnum.published })
            .where({ mainCategory: mainCategoryId })
            .select('name mainCategory imagePath')
            .sort('positionList')
            .populate({
            path: 'count',
            match: { status: enums_1.SchemaStatusEnum.published },
            select: '_id',
        });
        categoryList = categoryList.map((item) => {
            item = item.toObject({ virtuals: true });
            item.count = item.count.length;
            return item;
        });
        if (categoryList.length > 1)
            categoryList.unshift({
                mainCategory: mainCategoryId,
                name: {
                    en: 'All',
                    hy: 'Բոլորը',
                    ru: 'Все',
                },
                count: yield services_1.partnersCount(mainCategoryId)
            });
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
exports.subcategoryShortList = (mainCategoryId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const categoryList = yield subcategory_1.default
            .find()
            .where({ status: enums_1.SchemaStatusEnum.published })
            .where({ mainCategory: mainCategoryId })
            .select('_id name imagePath')
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
exports.subcategoryListForAdmin = (mainCategoryId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const categoryList = yield subcategory_1.default
            .find()
            .where({ mainCategory: mainCategoryId })
            .populate('createdBy', 'firstName lastName')
            .populate('mainCategory', 'name')
            .sort('positionList')
            .select({
            name: 1,
            createdBy: 1,
            createdAt: 1,
            status: 1,
            positionList: 1,
            mainCategory: 1,
            imagePath: 1,
        });
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
exports.upload = (id, files, user) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const subcategory = yield subcategory_1.default.findById(id);
        const imagePath = files.imagePath && files.imagePath[0].filename;
        if (subcategory.imagePath)
            MediaServer.removeFile(subcategory.imagePath);
        subcategory.imagePath = imagePath;
        subcategory.updateBy = user._id;
        yield subcategory.save();
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
