"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const schema = new mongoose_1.Schema({
    token: {
        type: String,
        default: null
    },
    osType: {
        type: Number,
        default: null
    },
    deviceId: {
        type: String,
        default: null,
        unique: true
    },
    language: {
        type: String,
        default: 'hy'
    },
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        refPath: 'referencePath',
        default: null
    },
    referencePath: {
        type: String,
        enum: ['User', 'Driver', null]
    }
});
exports.deviceToken = mongoose_1.model('DeviceToken', schema);
exports.default = exports.deviceToken;
