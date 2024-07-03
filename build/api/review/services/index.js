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
const review_1 = require("../../../schemas/review");
const enums_2 = require("../enums");
//#endregion
exports.promotionsList = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let promotionsList = yield review_1.default.find()
            .where({ status: enums_1.SchemaStatusEnum.published })
            .select("imagePath studied comment name createdAt")
            .sort({ createdAt: -1 });
        shuffle(promotionsList);
        function shuffle(array) {
            let currentIndex = array.length, temporaryValue, randomIndex;
            while (0 !== currentIndex) {
                randomIndex = Math.floor(Math.random() * currentIndex);
                currentIndex -= 1;
                temporaryValue = array[currentIndex];
                array[currentIndex] = array[randomIndex];
                array[randomIndex] = temporaryValue;
            }
            return array;
        }
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
exports.details = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const promotion = yield review_1.default.findById(id).select("imagePath name description webImagePath");
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
exports.promotionListForAdmin = () => __awaiter(void 0, void 0, void 0, function* () {
    let data = yield review_1.default.find()
        .populate("createdBy", "firstName lastName")
        .sort({ createdAt: -1 })
        .select({
        name: 1,
        createdBy: 1,
        createdAt: 1,
        status: 1,
        positionList: 1,
        imagePath: 1,
        webImagePath: 1,
        studied: 1,
        comment: 1
    });
    return {
        success: true,
        data: data,
        message: "ok",
    };
});
exports.create = (body, user) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield review_1.default.create({
            name: body.name,
            studied: body.studied,
            comment: body.comment,
            createdBy: user._id,
            updateBy: user._id,
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
        const data = yield review_1.default.findById({ _id: id });
        data.name = body.name;
        data.studied = body.studied;
        data.comment = body.comment;
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
exports.changeStatus = (body, user, id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield review_1.default.findById(id);
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
        const items = yield review_1.default.find({ positionList: filter }).select("_id positionList");
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
        const review = yield review_1.default.findById(id);
        const imagePath = (files.imagePath && files.imagePath[0].filename) || null;
        if (+imageType === enums_2.CategoryFileEnum.image) {
            if (review.imagePath)
                MediaServer.removeFile(review.imagePath);
            review.imagePath = imagePath;
        }
        else if (+imageType === enums_2.CategoryFileEnum.webImage) {
            if (review.webImagePath)
                MediaServer.removeFile(review.webImagePath);
            review.webImagePath = imagePath;
        }
        review.updateBy = user._id;
        review.save();
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
