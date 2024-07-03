"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const enums_1 = require("../../helpers/enums");
const workingHours = new mongoose_1.Schema({
    workingHoursEnd: Date,
    workingHoursStart: Date,
});
const schema = new mongoose_1.Schema({
    isFullTime: {
        type: Boolean,
        default: false,
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
    natDbId: {
        type: Number,
        default: null,
    },
    mainCompany: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Company",
        required: true,
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
    isClosed: {
        type: Boolean,
        default: true,
    },
    address: {
        type: String,
        required: true,
    },
    name: {
        hy: String,
        en: String,
        ru: String,
    },
    addressArm: {
        type: String,
        required: false,
    },
    addressRu: {
        type: String,
        required: false,
    },
    latitude: {
        type: Number,
        default: null,
    },
    longitude: {
        type: Number,
        default: null,
    },
    country: {
        type: String,
        default: null,
    },
    phoneNumber1: {
        type: String,
        default: null,
    },
    phoneNumber2: {
        type: String,
        default: null,
    },
    phoneNumber3: {
        type: String,
        default: null,
    },
    city: {
        type: String,
        default: null,
    },
    workingHours: [workingHours],
});
schema.pre("validate", function (next) {
    const _this = this;
    _this.updatedAt = new Date();
    if (this.isModified("workingHours") || this.isNew) {
        if (this.isNew)
            _this.createdAt = new Date();
        const newArray = [];
        _this.workingHours.forEach((element) => {
            const day = element.workingHoursStart && element.workingHoursStart.getHours() >
                element.workingHoursEnd.getHours()
                ? 2
                : 1;
            const start = element.workingHoursStart ? new Date(2000, 1, 1, element.workingHoursStart && element.workingHoursStart.getHours(), element.workingHoursStart && element.workingHoursStart.getMinutes(), 0) : null;
            const end = element.workingHoursStart ? new Date(2000, 1, day, element.workingHoursEnd && element.workingHoursEnd.getHours(), element.workingHoursEnd && element.workingHoursEnd.getMinutes(), 0) : null;
            newArray.push({
                workingHoursStart: start,
                workingHoursEnd: end,
            });
        });
        _this.workingHours = newArray;
    }
    _this.name.en = _this.address;
    _this.name.ru = _this.addressRu;
    _this.name.hy = _this.addressArm;
    next();
});
exports.branch = mongoose_1.model("Branch", schema);
exports.default = exports.branch;
