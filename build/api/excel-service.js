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
const fs = require("fs");
const xlsx = require("xlsx");
const config_1 = require("../config");
const helpers_1 = require("../helpers");
const shared_service_1 = require("./shared-service");
function emptyDir(path) {
    try {
        const files = fs.readdirSync(path);
        if (files.length > 0) {
            for (let i = 0; i < files.length; i++) {
                const filePath = path + "/" + files[i];
                if (fs.statSync(filePath).isFile()) {
                    fs.unlinkSync(filePath);
                }
            }
        }
    }
    catch (e) {
        return;
    }
}
const usersTitleRow = ["Name", "Phone", "Email", "Registration Date"];
exports.handlerUsersExcelFile = (filter = null) => __awaiter(void 0, void 0, void 0, function* () {
    if (!fs.existsSync(`${config_1.default.mediaPath}files`)) {
        fs.mkdirSync(`${config_1.default.mediaPath}files`);
    }
    emptyDir(`${config_1.default.mediaPath}files`);
    const wb = xlsx.utils.book_new();
    wb.Props = {
        Title: "User list",
        Subject: "Users",
        Author: "Open Sky IT-School",
        CreatedDate: new Date(),
    };
    wb.SheetNames.push("Users");
    const requestedRows = yield createUsersList(filter);
    const requestedWS = xlsx.utils.aoa_to_sheet(requestedRows);
    wb.Sheets.Users = requestedWS;
    // Excel file name
    const requestedPath = "users.xlsx";
    xlsx.writeFile(wb, `${config_1.default.mediaPath}files/${requestedPath}`);
    return `Files/${requestedPath}`;
});
const createUsersList = (filter) => __awaiter(void 0, void 0, void 0, function* () {
    const rows = [usersTitleRow];
    const users = yield shared_service_1.usersFilter(filter)
        .where({ deleted: false })
        .sort({ createdAt: -1 })
        .select({
        updatedAt: 0,
        deleted: 0,
        password: 0,
        __v: 0,
        forgotKey: 0,
    })
        .lean();
    users.forEach((x) => {
        const row = [
            `${x.firstName} ${x.lastName}`,
            x.phone,
            x.email,
            x.createdAt ? helpers_1.getShortDate(x.createdAt) : "-",
        ];
        rows.push(row);
    });
    return rows;
});
const subscribedUsersTitleRow = ["Email", "Registration Date"];
exports.handlerSubscribedUsersExcelFile = (filter = null) => __awaiter(void 0, void 0, void 0, function* () {
    if (!fs.existsSync(`${config_1.default.mediaPath}files`)) {
        fs.mkdirSync(`${config_1.default.mediaPath}files`);
    }
    emptyDir(`${config_1.default.mediaPath}files`);
    const wb = xlsx.utils.book_new();
    wb.Props = {
        Title: "Subscribers list",
        Subject: "Subscribed Users",
        Author: "Open Sky IT-School",
        CreatedDate: new Date(),
    };
    wb.SheetNames.push("Subscribers");
    const requestedRows = yield createSubscribeUsersList(filter);
    const requestedWS = xlsx.utils.aoa_to_sheet(requestedRows);
    wb.Sheets.Subscribers = requestedWS;
    // Excel file name
    const requestedPath = "subscribers.xlsx";
    xlsx.writeFile(wb, `${config_1.default.mediaPath}files/${requestedPath}`);
    return `Files/${requestedPath}`;
});
const createSubscribeUsersList = (filter) => __awaiter(void 0, void 0, void 0, function* () {
    const rows = [subscribedUsersTitleRow];
    const users = yield shared_service_1.subscribedUsersFilter(filter)
        .sort({ createdAt: -1 })
        .select({
        updatedAt: 0,
        deleted: 0,
        password: 0,
        __v: 0,
        forgotKey: 0,
    })
        .lean();
    users.forEach((x) => {
        const row = [
            x.email,
            x.createdAt ? helpers_1.getShortDate(x.createdAt) : "-",
        ];
        rows.push(row);
    });
    return rows;
});
