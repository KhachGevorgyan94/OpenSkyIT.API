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
        default: null,
    },
    status: {
        type: Number,
        enum: [enums_1.SchemaStatusEnum.draft, enums_1.SchemaStatusEnum.published],
        default: enums_1.SchemaStatusEnum.draft,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        select: false,
    },
    name: {
        type: String,
        default: null,
    },
    phoneNumber: {
        type: String,
        default: null,
    },
    email: {
        type: String,
        default: null,
    },
});
schema.pre("validate", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const _this = this;
        if (this.isNew) {
            const ITEMS_COUNT = yield this.collection.count();
            _this.createdAt = new Date();
        }
        next();
    });
});
exports.resume = mongoose_1.model("Resume", schema);
exports.default = exports.resume;
