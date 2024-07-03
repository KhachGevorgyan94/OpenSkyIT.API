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
const promotion_1 = require("../../../schemas/promotion");
const enums_2 = require("../enums");
//#endregion
exports.promotionsList = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let promotionsList = yield promotion_1.default.find()
            .where({ status: enums_1.SchemaStatusEnum.published })
            .select("imagePath name description createdAt slug")
            .sort({ createdAt: -1 });
        return {
            success: true,
            data: promotionsList,
            message: "ok",
        };
    }
    catch (error) {
        throw error;
    }
});
exports.details = (slug) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const promotion = yield promotion_1.default.findOne()
            .where({ slug: slug })
            .select("imagePath name description createdAt slug subtitle");
        return {
            success: true,
            data: promotion,
            message: "ok",
        };
    }
    catch (error) {
        throw error;
    }
});
exports.partnersCount = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let promotion = yield promotion_1.default.findById(id)
            .select("count")
            .populate({
            path: "count",
            match: { status: enums_1.SchemaStatusEnum.published },
            select: "_id",
        });
        let partners = promotion.toObject({ virtuals: true });
        promotion.count = partners.count.length;
        return partners.count.length;
    }
    catch (error) {
        throw error;
    }
});
//#region Only for Admin
exports.promotionListForAdmin = () => __awaiter(void 0, void 0, void 0, function* () {
    let data = yield promotion_1.default.find()
        .populate("createdBy", "firstName lastName")
        .populate({
        path: "count",
        match: { status: enums_1.SchemaStatusEnum.published },
        select: "_id",
    })
        .sort("positionList")
        .select({
        name: 1,
        description: 1,
        subtitle: 1,
        createdBy: 1,
        createdAt: 1,
        status: 1,
        positionList: 1,
        imagePath: 1,
        webImagePath: 1,
        count: 1,
        slug: 1,
    });
    return {
        success: true,
        data: data,
        message: "ok",
    };
});
exports.create = (body, user) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield promotion_1.default.create({
            name: body.name,
            description: body.description,
            subtitle: body.subtitle,
            createdBy: user._id,
            updateBy: user._id,
            slug: body.slug,
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
exports.editPromotion = (body, user, id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield promotion_1.default.findById({ _id: id });
        data.name = body.name;
        data.description = body.description;
        data.updateBy = user._id;
        data.subtitle = body.subtitle;
        data.slug = body.slug;
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
exports.changeStatus = (body, user, id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield promotion_1.default.findById(id);
        data.status = body.status;
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
exports.changePosition = (body, user) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let filter;
        if (body.from < body.to)
            filter = { $gte: body.from, $lte: body.to };
        else
            filter = { $gte: body.to, $lte: body.from };
        const items = yield promotion_1.default.find({ positionList: filter }).select("_id positionList");
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
            message: "ok",
        };
    }
    catch (error) {
        throw error;
    }
});
exports.upload = (id, imageType, files, user) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const promotion = yield promotion_1.default.findById(id);
        const imagePath = (files.imagePath && files.imagePath[0].filename) || null;
        if (+imageType === enums_2.CategoryFileEnum.image) {
            if (promotion.imagePath)
                MediaServer.removeFile(promotion.imagePath);
            promotion.imagePath = imagePath;
        }
        else if (+imageType === enums_2.CategoryFileEnum.webImage) {
            if (promotion.webImagePath)
                MediaServer.removeFile(promotion.webImagePath);
            promotion.webImagePath = imagePath;
        }
        promotion.updateBy = user._id;
        promotion.save();
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
exports.deleteBlog = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield promotion_1.default.findByIdAndDelete(id);
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
