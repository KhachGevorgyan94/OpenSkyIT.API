"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const schema = new mongoose_1.Schema({
    email: {
        type: String,
        default: "",
        set: function (value) {
            return value ? value.toLowerCase() : "";
        },
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});
exports.subscribedUser = mongoose_1.model("SubscribedUser", schema);
exports.default = exports.subscribedUser;
