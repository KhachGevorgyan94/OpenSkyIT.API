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
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const RandomString = require("randomstring");
const nodemailer = require('nodemailer');
const SMS = require("../../sms-server");
const Helpers = require("../../../helpers");
const config_1 = require("../../../config");
//#endregion
//#region Schemas
const admin_1 = require("../../../schemas/admin");
const deviceToken_1 = require("../../../schemas/deviceToken");
const user_1 = require("../../../schemas/user");
//#endregion
exports.generateVerificationCode = (length) => __awaiter(void 0, void 0, void 0, function* () {
    const charset = '0123456789';
    let text = '';
    for (let i = 0; i < length; i++) {
        const char = charset.charAt(Math.ceil(Math.random() * (charset.length - 1)));
        text += char;
    }
    return text;
});
exports.token = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_1.default.findOne({
            $or: [
                { email: data.email.toLowerCase() },
                { phone: data.email },
            ]
        });
        const token = jwt.sign({ _id: user._id, role: user.role }, config_1.default.secretKey, {
            expiresIn: 60 * 60 * 24 * 365
        });
        return {
            success: true,
            data: { token },
            message: 'ok'
        };
    }
    catch (error) {
        throw error;
    }
});
exports.tokenByVC = (data, registeredUser) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let user = registeredUser || (yield user_1.default.findOne({ phone: data.phone }));
        if (!user) {
            const newUser = new user_1.default();
            const password = RandomString.generate({
                length: 8,
                charset: 'alphanumeric',
                capitalization: 'uppercase',
            });
            newUser.password = password;
            newUser.phone = data.phone;
            user = yield newUser.save();
            SMS.sendSMS(`Your password is ${password}`, data.phone);
        }
        const token = jwt.sign({ _id: user._id, role: user.role }, config_1.default.secretKey, {
            expiresIn: 60 * 60 * 24 * 365
        });
        return {
            success: true,
            data: token,
            message: 'ok'
        };
    }
    catch (error) {
        throw error;
    }
});
exports.logout = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deviceToken = yield deviceToken_1.default.findOne({ deviceId: data.deviceId });
        deviceToken.user = null;
        deviceToken.referencePath = null;
        deviceToken.save();
        return {
            success: true,
            data: { token: exports.token },
            message: 'ok'
        };
    }
    catch (error) {
        throw error;
    }
});
exports.adminToken = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const admin = yield admin_1.default.findOne({ email: data.email.toLowerCase() });
        const token = jwt.sign({ _id: admin._id, role: admin.role }, config_1.default.secretKey, {
            expiresIn: 60 * 60 * 24 * 365
        });
        return {
            success: true,
            data: { token },
            message: 'ok'
        };
    }
    catch (error) {
        throw error;
    }
});
exports.forgotKey = (res, email) => __awaiter(void 0, void 0, void 0, function* () {
    const code = Math.floor(1000 + Math.random() * 9000);
    const isEmail = email.includes('@');
    if (isEmail) {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'armboldmind2018@gmail.com',
                pass: 'Password1/'
            }
        });
        const mailOptions = {
            from: 'armboldmind2018@gmail.com',
            to: email,
            html: `${code}`,
            subject: 'sovats.am'
        };
        return transporter.sendMail(mailOptions, (error) => {
            let data;
            if (error) {
                data = {
                    success: false,
                    data: null,
                    message: 'Something went wrong'
                };
            }
            else {
                bcrypt.hash(`${code}`, 12, (err, hash) => __awaiter(void 0, void 0, void 0, function* () {
                    if (hash) {
                        yield user_1.default.findOneAndUpdate({ email: email.toLowerCase() }, { forgotKey: hash });
                    }
                    else {
                        throw (err);
                    }
                }));
                data = {
                    success: true,
                    data: null,
                    message: 'Email send successfully'
                };
            }
            return Helpers.responseHandler(res, data);
        });
    }
    else {
        bcrypt.hash(`${code}`, 12, (err, hash) => __awaiter(void 0, void 0, void 0, function* () {
            if (hash) {
                yield user_1.default
                    .findOneAndUpdate({
                    $or: [
                        { email: email.toLowerCase() },
                        { phone: email },
                    ]
                }, { forgotKey: hash });
                SMS.sendSMS(`Your verification code is ${code}`, email);
            }
            else {
                throw (err);
            }
        }));
        const data = {
            success: true,
            data: null,
            message: 'SMS send successfully'
        };
        return Helpers.responseHandler(res, data);
    }
});
exports.checkForgotKey = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_1.default.findOne({
        $or: [
            { email: data.email.toLowerCase() },
            { phone: data.email },
        ]
    });
    const isValid = yield bcrypt.compare(data.forgotKey, user.forgotKey);
    if (isValid) {
        return {
            success: true,
            data: null,
            message: 'ok'
        };
    }
    else {
        return {
            success: false,
            data: null,
            message: 'Forgot key is wrong'
        };
    }
});
exports.resetPassword = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_1.default.findOne({
        $or: [
            { email: data.email.toLowerCase() },
            { phone: data.email },
        ]
    });
    if (user.forgotKey) {
        const isValid = yield bcrypt.compare(data.forgotKey, user.forgotKey);
        if (isValid) {
            user.password = data.newPassword;
            user.forgotKey = null;
            yield user.save();
            return {
                success: true,
                data: null,
                message: 'Password reset done successfully'
            };
        }
    }
    return {
        success: false,
        data: null,
        message: 'Forgot key is wrong'
    };
});
