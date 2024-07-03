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
    firstName: {
        type: String,
        default: '',
    },
    lastName: {
        type: String,
        default: '',
    },
    email: {
        type: String,
        default: '',
        set: function (value) {
            return value ? value.toLowerCase() : '';
        }
    },
    lesson: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    role: {
        type: Number,
        default: enums_1.UserRole.customer,
    },
    deleted: {
        type: Boolean,
        default: false,
    },
    blocked: {
        type: Boolean,
        default: false
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    forgotKey: {
        type: String,
        default: null,
    },
});
schema.methods.shortDescription = function () {
    return {
        _id: this._id,
        email: this.email,
        firstName: this.firstName,
        phone: this.phone,
        role: this.role,
    };
};
schema.statics.getIdListBySearch = function (search) {
    return __awaiter(this, void 0, void 0, function* () {
        const key = search.toString().replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '').trim();
        const _this = this;
        const aggregation = [
            {
                $match: {
                    deleted: false,
                    role: enums_1.UserRole.customer,
                    blocked: false
                }
            },
            {
                $project: {
                    _id: 1,
                    name: { $concat: ['$firstName', ' ', '$lastName'] },
                    phone: 1
                }
            },
            {
                $match: {
                    $or: [
                        { name: new RegExp(key, 'i') },
                        { phone: new RegExp(key, 'i') }
                    ]
                }
            }
        ];
        const list = yield _this.aggregate(aggregation);
        return list.map(item => item._id);
    });
};
exports.user = mongoose_1.model('User', schema);
exports.default = exports.user;
