"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const schema = new mongoose_1.Schema({
    homeBanner: [String],
    title: {
        type: String,
        default: null,
    },
    description: {
        type: String,
        default: null,
    },
});
exports.subCategory = mongoose_1.model("Settings", schema);
exports.default = exports.subCategory;
