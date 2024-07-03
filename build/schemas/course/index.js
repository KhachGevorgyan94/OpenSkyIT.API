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
const SharedService = require("../../api/shared-service");
const workingHours = new mongoose_1.Schema({
    workingHoursEnd: Date,
    workingHoursStart: Date,
});
const schema = new mongoose_1.Schema({
    positionList: {
        type: Number,
        default: 1,
    },
    coverPhoto: {
        type: String,
        default: null,
    },
    status: {
        type: Number,
        enum: [
            enums_1.SchemaStatusEnum.draft,
            enums_1.SchemaStatusEnum.published,
            enums_1.SchemaStatusEnum.deleted,
        ],
        default: enums_1.SchemaStatusEnum.draft,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        select: false,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
        select: false,
    },
    slug: {
        type: String,
        default: null,
    },
    name: {
        hy: { type: String, required: true },
        en: String,
        ru: String,
    },
    description: {
        hy: { type: String, required: true },
        en: String,
        ru: String,
    },
    createdBy: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Admin",
        required: true,
        select: false,
    },
    updateBy: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Admin",
        required: true,
        select: false,
    },
    duration: {
        type: String,
        default: null,
    },
    price: {
        type: Number,
        default: null,
    },
    newPrice: {
        type: Number,
        default: null,
    },
    start: {
        type: Date,
        default: Date.now,
        select: false,
    },
    tutor: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "Tutor",
            required: true,
        },
    ],
    introductionTitle: {
        type: String,
        default: null,
    },
    introductionDescription: {
        type: String,
        default: null,
    },
    introductionTitle2: {
        type: String,
        default: null,
    },
    introductionDescription2: {
        type: String,
        default: null,
    },
    introductionTitle3: {
        type: String,
        default: null,
    },
    introductionDescription3: {
        type: String,
        default: null,
    },
});
schema.virtual("orders", {
    ref: "Order",
    localField: "_id",
    foreignField: "companies.company",
});
schema.pre("validate", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const _this = this;
        _this.updatedAt = new Date();
        if (this.isNew) {
            const ITEMS_COUNT = yield SharedService.companyFilter({}).count();
            _this.positionList = ITEMS_COUNT + 1;
        }
        if (this.isModified("status") && _this.status === enums_1.SchemaStatusEnum.deleted) {
            const items = yield SharedService.companyFilter({})
                .where({ positionList: { $gte: _this.positionList } })
                .select("_id positionList");
            yield Promise.all(items.map((item) => __awaiter(this, void 0, void 0, function* () {
                item.positionList = item.positionList - 1;
                return item.save();
            })));
            _this.positionList = null;
        }
        next();
    });
});
exports.company = mongoose_1.model("Company", schema);
exports.default = exports.company;
