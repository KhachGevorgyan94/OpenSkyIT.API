"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var TakeOrderStatusEnum;
(function (TakeOrderStatusEnum) {
    TakeOrderStatusEnum[TakeOrderStatusEnum["pending"] = 1] = "pending";
    TakeOrderStatusEnum[TakeOrderStatusEnum["start"] = 2] = "start";
    TakeOrderStatusEnum[TakeOrderStatusEnum["arrived"] = 3] = "arrived";
    TakeOrderStatusEnum[TakeOrderStatusEnum["finish"] = 4] = "finish";
})(TakeOrderStatusEnum = exports.TakeOrderStatusEnum || (exports.TakeOrderStatusEnum = {}));
var TakeOrderStatusViewEnum;
(function (TakeOrderStatusViewEnum) {
    TakeOrderStatusViewEnum[TakeOrderStatusViewEnum["pending"] = 1] = "pending";
    TakeOrderStatusViewEnum[TakeOrderStatusViewEnum["started his trip to"] = 2] = "started his trip to";
    TakeOrderStatusViewEnum[TakeOrderStatusViewEnum["arrived to"] = 3] = "arrived to";
    TakeOrderStatusViewEnum[TakeOrderStatusViewEnum["finished"] = 4] = "finished";
})(TakeOrderStatusViewEnum = exports.TakeOrderStatusViewEnum || (exports.TakeOrderStatusViewEnum = {}));
var DriverNotificationTypeEnum;
(function (DriverNotificationTypeEnum) {
    DriverNotificationTypeEnum[DriverNotificationTypeEnum["global"] = 1] = "global";
    DriverNotificationTypeEnum[DriverNotificationTypeEnum["newOrder"] = 2] = "newOrder";
    DriverNotificationTypeEnum[DriverNotificationTypeEnum["changeOrder"] = 3] = "changeOrder";
    DriverNotificationTypeEnum[DriverNotificationTypeEnum["cancelOrder"] = 4] = "cancelOrder";
})(DriverNotificationTypeEnum = exports.DriverNotificationTypeEnum || (exports.DriverNotificationTypeEnum = {}));
var UserNotificationTypeEnum;
(function (UserNotificationTypeEnum) {
    UserNotificationTypeEnum[UserNotificationTypeEnum["global"] = 1] = "global";
    UserNotificationTypeEnum[UserNotificationTypeEnum["newPromoCode"] = 2] = "newPromoCode";
    UserNotificationTypeEnum[UserNotificationTypeEnum["acceptedOrder"] = 3] = "acceptedOrder";
    UserNotificationTypeEnum[UserNotificationTypeEnum["startOrder"] = 4] = "startOrder";
    UserNotificationTypeEnum[UserNotificationTypeEnum["driverOnTheWay"] = 5] = "driverOnTheWay";
    UserNotificationTypeEnum[UserNotificationTypeEnum["driverArrived"] = 6] = "driverArrived";
    UserNotificationTypeEnum[UserNotificationTypeEnum["finishOrder"] = 7] = "finishOrder";
    UserNotificationTypeEnum[UserNotificationTypeEnum["canceled"] = 8] = "canceled";
    UserNotificationTypeEnum[UserNotificationTypeEnum["newMessage"] = 9] = "newMessage";
    UserNotificationTypeEnum[UserNotificationTypeEnum["newBalance"] = 10] = "newBalance";
})(UserNotificationTypeEnum = exports.UserNotificationTypeEnum || (exports.UserNotificationTypeEnum = {}));
var OrderStatusEnum;
(function (OrderStatusEnum) {
    OrderStatusEnum[OrderStatusEnum["canceled"] = 1] = "canceled";
    OrderStatusEnum[OrderStatusEnum["notTaken"] = 2] = "notTaken";
    OrderStatusEnum[OrderStatusEnum["operatorAccept"] = 3] = "operatorAccept";
    OrderStatusEnum[OrderStatusEnum["userAccept"] = 4] = "userAccept";
    OrderStatusEnum[OrderStatusEnum["operatorFinish"] = 5] = "operatorFinish";
    OrderStatusEnum[OrderStatusEnum["dispatcherAccept"] = 6] = "dispatcherAccept";
    OrderStatusEnum[OrderStatusEnum["driverAttached"] = 7] = "driverAttached";
    OrderStatusEnum[OrderStatusEnum["driverAccept"] = 8] = "driverAccept";
    OrderStatusEnum[OrderStatusEnum["inProgress"] = 9] = "inProgress";
    OrderStatusEnum[OrderStatusEnum["shipped"] = 10] = "shipped";
    OrderStatusEnum[OrderStatusEnum["delivered"] = 11] = "delivered";
    OrderStatusEnum[OrderStatusEnum["finished"] = 12] = "finished";
    OrderStatusEnum[OrderStatusEnum["createdProgress"] = 13] = "createdProgress";
})(OrderStatusEnum = exports.OrderStatusEnum || (exports.OrderStatusEnum = {}));
var OrderStatusViewEnum;
(function (OrderStatusViewEnum) {
    OrderStatusViewEnum[OrderStatusViewEnum["Canceled"] = 1] = "Canceled";
    OrderStatusViewEnum[OrderStatusViewEnum["New order"] = 2] = "New order";
    OrderStatusViewEnum[OrderStatusViewEnum["Operator Accept"] = 3] = "Operator Accept";
    OrderStatusViewEnum[OrderStatusViewEnum["Manage Branches"] = 4] = "Manage Branches";
    OrderStatusViewEnum[OrderStatusViewEnum["Operator Finish"] = 5] = "Operator Finish";
    OrderStatusViewEnum[OrderStatusViewEnum["Dispatcher Accept"] = 6] = "Dispatcher Accept";
    OrderStatusViewEnum[OrderStatusViewEnum["Driver Attached"] = 7] = "Driver Attached";
    OrderStatusViewEnum[OrderStatusViewEnum["Driver Accept"] = 8] = "Driver Accept";
    OrderStatusViewEnum[OrderStatusViewEnum["In Progress"] = 9] = "In Progress";
    OrderStatusViewEnum[OrderStatusViewEnum["On The Way"] = 10] = "On The Way";
    OrderStatusViewEnum[OrderStatusViewEnum["Delivered"] = 11] = "Delivered";
    OrderStatusViewEnum[OrderStatusViewEnum["Finished"] = 12] = "Finished";
})(OrderStatusViewEnum = exports.OrderStatusViewEnum || (exports.OrderStatusViewEnum = {}));
var UserOrderStatusEnum;
(function (UserOrderStatusEnum) {
    UserOrderStatusEnum[UserOrderStatusEnum["canceled"] = 1] = "canceled";
    UserOrderStatusEnum[UserOrderStatusEnum["finished"] = 13] = "finished";
})(UserOrderStatusEnum = exports.UserOrderStatusEnum || (exports.UserOrderStatusEnum = {}));
var DriverOrderStatusEnum;
(function (DriverOrderStatusEnum) {
    DriverOrderStatusEnum[DriverOrderStatusEnum["notTaken"] = 7] = "notTaken";
    DriverOrderStatusEnum[DriverOrderStatusEnum["accept"] = 8] = "accept";
    DriverOrderStatusEnum[DriverOrderStatusEnum["start"] = 9] = "start";
    DriverOrderStatusEnum[DriverOrderStatusEnum["shipped"] = 10] = "shipped";
    DriverOrderStatusEnum[DriverOrderStatusEnum["delivered"] = 11] = "delivered";
    DriverOrderStatusEnum[DriverOrderStatusEnum["finish"] = 12] = "finish";
})(DriverOrderStatusEnum = exports.DriverOrderStatusEnum || (exports.DriverOrderStatusEnum = {}));
var PaymentMethod;
(function (PaymentMethod) {
    PaymentMethod[PaymentMethod["cash"] = 1] = "cash";
    PaymentMethod[PaymentMethod["ameria"] = 2] = "ameria";
    PaymentMethod[PaymentMethod["iDram"] = 3] = "iDram";
    PaymentMethod[PaymentMethod["partner"] = 4] = "partner";
})(PaymentMethod = exports.PaymentMethod || (exports.PaymentMethod = {}));
var PaymentMethodViewEnum;
(function (PaymentMethodViewEnum) {
    PaymentMethodViewEnum[PaymentMethodViewEnum["Cash"] = 1] = "Cash";
    PaymentMethodViewEnum[PaymentMethodViewEnum["Ameria"] = 2] = "Ameria";
    PaymentMethodViewEnum[PaymentMethodViewEnum["iDram"] = 3] = "iDram";
    PaymentMethodViewEnum[PaymentMethodViewEnum["Partner"] = 4] = "Partner";
})(PaymentMethodViewEnum = exports.PaymentMethodViewEnum || (exports.PaymentMethodViewEnum = {}));
var OrderTypeEnum;
(function (OrderTypeEnum) {
    OrderTypeEnum[OrderTypeEnum["ourOrder"] = 1] = "ourOrder";
    OrderTypeEnum[OrderTypeEnum["companyOrder"] = 2] = "companyOrder";
})(OrderTypeEnum = exports.OrderTypeEnum || (exports.OrderTypeEnum = {}));
var OrderTypeViewEnum;
(function (OrderTypeViewEnum) {
    OrderTypeViewEnum[OrderTypeViewEnum["Our order (MP)"] = 1] = "Our order (MP)";
    OrderTypeViewEnum[OrderTypeViewEnum["Company order (RP)"] = 2] = "Company order (RP)";
})(OrderTypeViewEnum = exports.OrderTypeViewEnum || (exports.OrderTypeViewEnum = {}));
var OrderCounterTypeEnum;
(function (OrderCounterTypeEnum) {
    OrderCounterTypeEnum[OrderCounterTypeEnum["percentage"] = 1] = "percentage";
    OrderCounterTypeEnum[OrderCounterTypeEnum["static"] = 2] = "static";
})(OrderCounterTypeEnum = exports.OrderCounterTypeEnum || (exports.OrderCounterTypeEnum = {}));
var CreditPaymentMethodEnum;
(function (CreditPaymentMethodEnum) {
    CreditPaymentMethodEnum[CreditPaymentMethodEnum["ameria"] = 1] = "ameria";
})(CreditPaymentMethodEnum = exports.CreditPaymentMethodEnum || (exports.CreditPaymentMethodEnum = {}));
var PaidStatusEnum;
(function (PaidStatusEnum) {
    PaidStatusEnum[PaidStatusEnum["paid"] = 1] = "paid";
    PaidStatusEnum[PaidStatusEnum["notPaid"] = 2] = "notPaid";
})(PaidStatusEnum = exports.PaidStatusEnum || (exports.PaidStatusEnum = {}));
