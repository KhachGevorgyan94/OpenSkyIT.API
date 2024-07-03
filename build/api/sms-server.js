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
const request = require("request");
const config_1 = require("../config");
exports.sendSMS = (message, number) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve, reject) => {
        process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
        request
            .post({
            url: 'https://msg.am/Xml_Api/index.php',
            body: '<?xml version="1.0" encoding="UTF-8" ?>' +
                '<xml_request name="sms_send">' +
                '<xml_user lgn="' + config_1.default.sms.login + '" pwd="' + config_1.default.sms.password + '"/>' +
                '<sms sms_id="' + exports.getRandomInt(10000000000000, 100000000000000 /* one zero more :D*/) + '" number="' + number + '" source_number="' + config_1.default.sms.title + '" ttl="1">' + message + '</sms>' +
                '</xml_request>'
        }, (err, response, body) => {
            process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
            if (err)
                return reject(err);
            return resolve({
                response,
                body
            });
        });
    });
});
exports.sendUniqueIdViaSMS = (uniqueId, number) => __awaiter(void 0, void 0, void 0, function* () {
    const message = `Your order uniqueId is ${uniqueId} .`;
    return exports.sendSMS(message, number);
});
exports.getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min)) + min;
};
