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
//#endregion
//#region Schemas
const admin_1 = require("../../../schemas/admin");
//#endregion
exports.upload = (id, files) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const admin = yield admin_1.default.findById(id);
        admin.image = files.imagePath && files.imagePath[0].filename;
        admin.save();
        return {
            success: true,
            data: null,
            message: 'Successfully updated'
        };
    }
    catch (error) {
        throw error;
    }
});
exports.changePassword = (password, user) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const admin = yield admin_1.default.findById(user._id);
        admin.password = password;
        admin.save();
        return {
            success: true,
            data: null,
            message: 'Successfully updated'
        };
    }
    catch (error) {
        throw error;
    }
});
exports.changePasswordForAdmin = (password, id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const admin = yield admin_1.default.findById(id);
        admin.password = password;
        admin.save();
        return {
            success: true,
            data: null,
            message: 'Successfully updated'
        };
    }
    catch (error) {
        throw error;
    }
});
exports.create = (body) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const admin = yield admin_1.default.create({
            firstName: body.firstName,
            lastName: body.lastName,
            email: body.email,
            phone: body.phone,
            password: body.password,
            role: body.role,
        });
        return {
            success: true,
            data: admin._id,
            message: 'Successfully created'
        };
    }
    catch (error) {
        throw error;
    }
});
exports.edit = (body, user) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const admin = yield admin_1.default.findById(user._id);
        admin.firstName = body.firstName;
        admin.lastName = body.lastName;
        admin.email = body.email;
        admin.phone = body.phone;
        admin.save();
        return {
            success: true,
            data: null,
            message: 'Successfully updated'
        };
    }
    catch (error) {
        throw error;
    }
});
exports.editWithAdmin = (body, id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const admin = yield admin_1.default.findById(id);
        admin.firstName = body.firstName;
        admin.lastName = body.lastName;
        admin.email = body.email;
        admin.phone = body.phone;
        // admin.role = body.role;
        admin.save();
        return {
            success: true,
            data: null,
            message: 'Successfully updated'
        };
    }
    catch (error) {
        throw error;
    }
});
exports.getList = (role) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield admin_1.default
            .find()
            .where({ role: role })
            .where({ deleted: false })
            .sort('-createdAt')
            .select({
            firstName: 1,
            lastName: 1,
            email: 1,
            phone: 1,
            createdAt: 1,
            image: 1,
        });
        return {
            success: true,
            data: data,
            message: 'Successfully updated'
        };
    }
    catch (error) {
        throw error;
    }
});
exports.deleteAdmin = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const admin = yield admin_1.default.findById(id);
        admin.deleted = true;
        admin.save();
        return {
            success: true,
            data: null,
            message: 'ok'
        };
    }
    catch (error) {
        throw error;
    }
});
