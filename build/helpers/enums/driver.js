"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var DriverStatusEnum;
(function (DriverStatusEnum) {
    DriverStatusEnum[DriverStatusEnum["free"] = 1] = "free";
    DriverStatusEnum[DriverStatusEnum["busy"] = 2] = "busy";
})(DriverStatusEnum = exports.DriverStatusEnum || (exports.DriverStatusEnum = {}));
var DriverVehicleEnum;
(function (DriverVehicleEnum) {
    DriverVehicleEnum[DriverVehicleEnum["car"] = 1] = "car";
    DriverVehicleEnum[DriverVehicleEnum["bike"] = 2] = "bike";
    DriverVehicleEnum[DriverVehicleEnum["scooter"] = 3] = "scooter";
    DriverVehicleEnum[DriverVehicleEnum["foot"] = 4] = "foot";
})(DriverVehicleEnum = exports.DriverVehicleEnum || (exports.DriverVehicleEnum = {}));
var WorkingStatusEnum;
(function (WorkingStatusEnum) {
    WorkingStatusEnum[WorkingStatusEnum["start"] = 1] = "start";
    WorkingStatusEnum[WorkingStatusEnum["finish"] = 2] = "finish";
})(WorkingStatusEnum = exports.WorkingStatusEnum || (exports.WorkingStatusEnum = {}));
