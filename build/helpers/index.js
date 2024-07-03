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
const GeoLib = require("geolib");
const node_fetch_1 = require("node-fetch");
const config_1 = require("../config");
const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
exports.getDistance = (from, to) => {
    const distance = GeoLib.getDistance(from, to);
    return Math.round(distance + ((distance * 10) / 100));
};
exports.errorHandler = (req, res, err) => {
    const code = err.statusCode || 200;
    const message = err.error._message || 'Something went wrong';
    if (config_1.default.env !== 'development' && !process.env.DUMMY) {
    }
    else {
        console.log(err.error);
    }
    this.failedResponse(res, {
        statusCode: code,
        message: message
    });
};
exports.responseHandler = (res, data = { success: false, data: null, message: 'Something went wrong' }, statusCode = 200) => {
    res.status(statusCode).send(data);
};
exports.failedResponse = (res, data = {}) => {
    const resObj = {
        success: false,
        data: null,
        message: data.message || 'Something went wrong'
    };
    res.status(data.statusCode || 200).send(resObj);
};
exports.successResponse = (res, data = {}) => {
    const resObj = {
        success: true,
        data: data.body || null,
        message: 'ok'
    };
    res.status(200).send(resObj);
};
exports.isValidPhoneNumber = (phoneNumber) => {
    let isValid = false;
    const code = phoneNumber.slice(1, 3);
    switch (code) {
        case '41': {
            isValid = true;
            break;
        }
        case '43': {
            isValid = true;
            break;
        }
        case '44': {
            isValid = true;
            break;
        }
        case '55': {
            isValid = true;
            break;
        }
        case '77': {
            isValid = true;
            break;
        }
        case '91': {
            isValid = true;
            break;
        }
        case '93': {
            isValid = true;
            break;
        }
        case '94': {
            isValid = true;
            break;
        }
        case '95': {
            isValid = true;
            break;
        }
        case '96': {
            isValid = true;
            break;
        }
        case '98': {
            isValid = true;
            break;
        }
        case '99': {
            isValid = true;
            break;
        }
        default: {
            isValid = false;
            break;
        }
    }
    return isValid;
};
exports.isJson = (str) => {
    try {
        JSON.parse(str);
    }
    catch (e) {
        return false;
    }
    return true;
};
exports.checkLanguage = (l) => {
    const languages = ['en', 'hy', 'ru'];
    return (languages.indexOf(l) >= 0) ? l : 'en';
};
exports.httpRequest = (data) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(data);
    const res = yield node_fetch_1.default(`${config_1.default.schedulerBaseUrl}${data.controllerName}/${data.actionName}`, {
        method: data.method,
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data.body)
    });
    return res.json();
});
exports.getMaxPageCount = (listCount, count) => {
    let paginationLimit = 1;
    if (listCount > count) {
        paginationLimit = listCount / count;
        const limit = `${paginationLimit}`.split('.');
        if (limit.length > 1) {
            paginationLimit = +(limit[0]);
            return Math.ceil(paginationLimit) + 1;
        }
    }
    return Math.ceil(paginationLimit);
};
const getCount = (object) => {
    return object
        .skip(0)
        .limit(0)
        .count()
        .exec();
};
exports.pagination = (filters, obj) => __awaiter(void 0, void 0, void 0, function* () {
    filters.count = +filters.count || 20;
    filters.page = +filters.page;
    if (!filters.page)
        filters.page = 1;
    filters.page = (filters.page - 1 < 0) ? 0 : (filters.page - 1);
    const [data, elemCount] = yield Promise.all([
        yield obj.skip(filters.page * filters.count).limit(filters.count),
        yield getCount(obj)
    ]);
    const pageCount = exports.getMaxPageCount(elemCount, filters.count);
    return {
        pageCount: pageCount,
        list: data,
        itemsCount: elemCount,
    };
});
exports.shortDate = date => {
    if (date) {
        const localDate = new Date(date);
        return `${addZero(localDate.getDate())} ${monthNames[localDate.getMonth()]}`;
    }
};
const addZero = i => {
    if (i < 10) {
        i = '0' + i;
    }
    return i;
};
exports.hoursDate = date => {
    if (date) {
        const d = new Date(date);
        const h = addZero(d.getHours());
        const m = addZero(d.getMinutes());
        return h + ':' + m;
    }
};
exports.getShortDate = (date, zoneOffsetMinutes) => {
    let newDate = new Date(date);
    if (zoneOffsetMinutes) {
        newDate = new Date(newDate.setMinutes(newDate.getMinutes() + (-(zoneOffsetMinutes))));
    }
    return `${addZero(newDate.getDate())} ${monthNames[newDate.getMonth()]} ${newDate.getFullYear()} ${exports.hoursDate(newDate)}`;
};
