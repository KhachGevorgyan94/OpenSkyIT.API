"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var UserRole;
(function (UserRole) {
    UserRole[UserRole["admin"] = 0] = "admin";
    UserRole[UserRole["customer"] = 1] = "customer";
    UserRole[UserRole["driver"] = 2] = "driver";
    UserRole[UserRole["dispatcher"] = 3] = "dispatcher";
    UserRole[UserRole["operator"] = 4] = "operator";
    UserRole[UserRole["partner"] = 5] = "partner";
    UserRole[UserRole["accountant"] = 6] = "accountant";
    UserRole[UserRole["guest"] = 7] = "guest";
    UserRole[UserRole["partnerManager"] = 8] = "partnerManager";
    UserRole[UserRole["dispatcherAdmin"] = 9] = "dispatcherAdmin";
})(UserRole = exports.UserRole || (exports.UserRole = {}));
var SchemaStatusEnum;
(function (SchemaStatusEnum) {
    SchemaStatusEnum[SchemaStatusEnum["draft"] = 0] = "draft";
    SchemaStatusEnum[SchemaStatusEnum["published"] = 1] = "published";
    SchemaStatusEnum[SchemaStatusEnum["deleted"] = 2] = "deleted";
})(SchemaStatusEnum = exports.SchemaStatusEnum || (exports.SchemaStatusEnum = {}));
var OsTypeEnum;
(function (OsTypeEnum) {
    OsTypeEnum[OsTypeEnum["android"] = 1] = "android";
    OsTypeEnum[OsTypeEnum["ios"] = 2] = "ios";
    OsTypeEnum[OsTypeEnum["web"] = 3] = "web";
})(OsTypeEnum = exports.OsTypeEnum || (exports.OsTypeEnum = {}));
var MonthEnum;
(function (MonthEnum) {
    MonthEnum[MonthEnum["January"] = 1] = "January";
    MonthEnum[MonthEnum["February"] = 2] = "February";
    MonthEnum[MonthEnum["March"] = 3] = "March";
    MonthEnum[MonthEnum["April"] = 4] = "April";
    MonthEnum[MonthEnum["May"] = 5] = "May";
    MonthEnum[MonthEnum["June"] = 6] = "June";
    MonthEnum[MonthEnum["July"] = 7] = "July";
    MonthEnum[MonthEnum["August"] = 8] = "August";
    MonthEnum[MonthEnum["September"] = 9] = "September";
    MonthEnum[MonthEnum["October"] = 10] = "October";
    MonthEnum[MonthEnum["November"] = 11] = "November";
    MonthEnum[MonthEnum["December"] = 12] = "December";
})(MonthEnum = exports.MonthEnum || (exports.MonthEnum = {}));
