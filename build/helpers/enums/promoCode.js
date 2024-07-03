"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AmountTypeEnum;
(function (AmountTypeEnum) {
    AmountTypeEnum[AmountTypeEnum["percentage"] = 1] = "percentage";
    AmountTypeEnum[AmountTypeEnum["static"] = 2] = "static";
    AmountTypeEnum[AmountTypeEnum["cashback"] = 3] = "cashback";
})(AmountTypeEnum = exports.AmountTypeEnum || (exports.AmountTypeEnum = {}));
var PromoCodeStatusEnum;
(function (PromoCodeStatusEnum) {
    PromoCodeStatusEnum[PromoCodeStatusEnum["pending"] = 1] = "pending";
    PromoCodeStatusEnum[PromoCodeStatusEnum["active"] = 2] = "active";
    PromoCodeStatusEnum[PromoCodeStatusEnum["stopped"] = 3] = "stopped";
    PromoCodeStatusEnum[PromoCodeStatusEnum["expired"] = 4] = "expired";
})(PromoCodeStatusEnum = exports.PromoCodeStatusEnum || (exports.PromoCodeStatusEnum = {}));
var PromoCodeUsageTypeEnum;
(function (PromoCodeUsageTypeEnum) {
    PromoCodeUsageTypeEnum[PromoCodeUsageTypeEnum["single"] = 1] = "single";
    PromoCodeUsageTypeEnum[PromoCodeUsageTypeEnum["group"] = 2] = "group";
})(PromoCodeUsageTypeEnum = exports.PromoCodeUsageTypeEnum || (exports.PromoCodeUsageTypeEnum = {}));
var PromoCodeTypeEnum;
(function (PromoCodeTypeEnum) {
    PromoCodeTypeEnum[PromoCodeTypeEnum["generateCode"] = 1] = "generateCode";
    PromoCodeTypeEnum[PromoCodeTypeEnum["customCode"] = 2] = "customCode";
})(PromoCodeTypeEnum = exports.PromoCodeTypeEnum || (exports.PromoCodeTypeEnum = {}));
var UserPromoCodeBonusTypeEnum;
(function (UserPromoCodeBonusTypeEnum) {
    UserPromoCodeBonusTypeEnum[UserPromoCodeBonusTypeEnum["firstLogin"] = 1] = "firstLogin";
})(UserPromoCodeBonusTypeEnum = exports.UserPromoCodeBonusTypeEnum || (exports.UserPromoCodeBonusTypeEnum = {}));
var BonusTypeEnum;
(function (BonusTypeEnum) {
    BonusTypeEnum[BonusTypeEnum["firstLogin"] = 1] = "firstLogin";
})(BonusTypeEnum = exports.BonusTypeEnum || (exports.BonusTypeEnum = {}));
