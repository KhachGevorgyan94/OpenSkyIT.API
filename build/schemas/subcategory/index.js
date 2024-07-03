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
const mongoose_1 = require("mongoose");
const enums_1 = require("../../helpers/enums");
const schema = new mongoose_1.Schema({
    imagePath: {
        type: String,
        default: null
    },
    positionList: {
        type: Number,
        default: 0
    },
    status: {
        type: Number,
        enum: [enums_1.SchemaStatusEnum.draft, enums_1.SchemaStatusEnum.published],
        default: enums_1.SchemaStatusEnum.draft,
    },
    name: {
        hy: { type: String, required: true, },
        en: String,
        ru: String,
    },
    mainCategory: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'MainCategory',
        required: true
    },
    createdBy: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Admin',
        required: true,
        select: false
    },
    updateBy: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Admin',
        required: true,
        select: false
    },
    createdAt: {
        type: Date,
        default: Date.now,
        select: false
    },
    updatedAt: {
        type: Date,
        default: Date.now,
        select: false
    }
});
schema.virtual('count', {
    ref: 'Company',
    localField: '_id',
    foreignField: 'categories',
});
schema.pre('validate', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const _this = this;
        _this.updatedAt = new Date();
        if (this.isNew) {
            _this.createdAt = new Date();
        }
        next();
    });
});
exports.subCategory = mongoose_1.model('Subcategory', schema);
exports.default = exports.subCategory;
