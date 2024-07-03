"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config = {
    port: (+process.env.PORT) || 5003,
    schedulerBaseUrl: 'http://localhost:5007/api/',
};
exports.default = config;
