"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var TransactionTypeEnum;
(function (TransactionTypeEnum) {
    TransactionTypeEnum[TransactionTypeEnum["userToDriver"] = 1] = "userToDriver";
    TransactionTypeEnum[TransactionTypeEnum["userToPlatform"] = 2] = "userToPlatform";
    TransactionTypeEnum[TransactionTypeEnum["platformToDriver"] = 3] = "platformToDriver";
    TransactionTypeEnum[TransactionTypeEnum["platformToDriverForFuel"] = 4] = "platformToDriverForFuel";
    TransactionTypeEnum[TransactionTypeEnum["platformToUser"] = 5] = "platformToUser";
    TransactionTypeEnum[TransactionTypeEnum["platformToCompany"] = 6] = "platformToCompany";
    TransactionTypeEnum[TransactionTypeEnum["driverToPlatform"] = 7] = "driverToPlatform";
    TransactionTypeEnum[TransactionTypeEnum["guestToDriver"] = 8] = "guestToDriver";
    TransactionTypeEnum[TransactionTypeEnum["guestToPlatform"] = 9] = "guestToPlatform";
    TransactionTypeEnum[TransactionTypeEnum["platformToGuest"] = 10] = "platformToGuest";
})(TransactionTypeEnum = exports.TransactionTypeEnum || (exports.TransactionTypeEnum = {}));
