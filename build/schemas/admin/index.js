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
const bcrypt = require("bcrypt");
const enums_1 = require("../../helpers/enums");
const schema = new mongoose_1.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        set: function (value) {
            return value ? value.toLowerCase() : '';
        }
    },
    image: {
        type: String,
    },
    password: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    role: {
        type: Number,
        enum: [enums_1.UserRole.admin, enums_1.UserRole.dispatcher, enums_1.UserRole.operator, enums_1.UserRole.dispatcherAdmin],
        default: enums_1.UserRole.customer,
    },
    deleted: {
        type: Boolean,
        default: false,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});
schema.pre('validate', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const _this = this;
        _this.updatedAt = new Date();
        if (this.isModified('password') || this.isNew) {
            if (this.isNew)
                _this.createdAt = new Date();
            _this.password = yield bcrypt.hash(_this.password, 12);
        }
        next();
    });
});
schema.methods.short = function () {
    return {
        _id: this._id,
        email: this.email,
        firstName: this.firstName,
        lastName: this.lastName,
        phone: this.phone,
        role: this.role,
        image: this.image,
    };
};
exports.admin = mongoose_1.model('Admin', schema);
exports.default = exports.admin;
