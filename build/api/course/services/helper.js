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
const enums_1 = require("../enums");
const enums_2 = require("../../../helpers/enums");
const Helpers = require("../../../helpers");
const branch_1 = require("../../../schemas/branch");
exports.getSortByOption = (sort) => {
    switch (sort) {
        case enums_1.SortBy.opening:
            return { isClosed: 1 };
        case enums_1.SortBy.position:
            return { positionList: 1 };
        default:
            return { positionList: 1 };
    }
};
/**
 * Todays day of the week
 */
exports.getWeekDay = () => {
    const date = new Date();
    return date.getDay() - 1;
};
exports.getNearestBranches = (query) => __awaiter(void 0, void 0, void 0, function* () {
    let branches = yield branch_1.default.find()
        .where({ status: enums_2.SchemaStatusEnum.published })
        .populate('mainCompany', 'mainCategories categories status')
        .select({
        mainCompany: 1,
        latitude: 1,
        longitude: 1,
        nearest: 1
    })
        .lean();
    branches = branches
        .filter(x => x.mainCompany.status === enums_2.SchemaStatusEnum.published)
        .map(x => {
        return Object.assign(Object.assign({}, x), { distance: Helpers.getDistance({
                latitude: +query.latitude,
                longitude: +query.longitude,
            }, {
                latitude: x.latitude,
                longitude: x.longitude,
            }) });
    })
        .sort((a, b) => a.distance - b.distance);
    const nearestBranches = [];
    branches.forEach(x => {
        if (!nearestBranches.some(y => y.mainCompany._id.toString() === x.mainCompany._id.toString())) {
            nearestBranches.push(x);
        }
    });
    return nearestBranches;
});
exports.getCompanyNearestBranch = (data) => __awaiter(void 0, void 0, void 0, function* () {
    let branches = yield branch_1.default.find()
        .where({ mainCompany: data.companyId })
        .where({ status: enums_2.SchemaStatusEnum.published })
        .lean();
    branches = branches
        .map(x => {
        return Object.assign(Object.assign({}, x), { distance: Helpers.getDistance({
                latitude: +data.lat,
                longitude: +data.lng,
            }, {
                latitude: x.latitude,
                longitude: x.longitude,
            }) });
    })
        .sort((a, b) => a.distance - b.distance);
    return branches[0];
});
exports.arrayMove = (arr, oldIndex, newIndex) => {
    arr.splice(newIndex, 0, arr.splice(oldIndex, 1)[0]);
    return arr;
};
