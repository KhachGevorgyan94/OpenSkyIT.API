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
const MediaServer = require("../../media-server");
const Helpers = require("../../../helpers");
//#region Models
const enums_1 = require("../enums");
const enums_2 = require("../../../helpers/enums");
//#endregion
//#region Schemas
const course_1 = require("../../../schemas/course");
const settings_1 = require("../../../schemas/settings");
//#endregion
//#region Helpers
const helper_1 = require("./helper");
const shared_service_1 = require("../../shared-service");
//#endregion
exports.createCourse = (body, user) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield course_1.default.create({
            createdBy: user._id,
            name: body.name,
            updateBy: user._id,
            description: body.description,
            duration: body.duration,
            price: body.price,
            newPrice: body.newPrice,
            start: body.start,
            tutor: body.tutor,
            introductionTitle: body.introductionTitle,
            introductionDescription: body.introductionDescription,
            introductionTitle2: body.introductionTitle2,
            introductionDescription2: body.introductionDescription2,
            introductionTitle3: body.introductionTitle3,
            introductionDescription3: body.introductionDescription3,
            slug: body.slug,
        });
        return {
            success: true,
            data: data._id,
            message: "Company successfully created",
        };
    }
    catch (error) {
        throw error;
    }
});
exports.editCompany = (body, user, id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const course = yield course_1.default.findById(id);
        (course.createdBy = user._id),
            (course.name = body.name),
            (course.updateBy = user._id),
            (course.description = body.description),
            (course.duration = body.duration),
            (course.price = body.price),
            (course.newPrice = body.newPrice);
        (course.start = body.start),
            (course.tutor = body.tutor),
            (course.introductionTitle = body.introductionTitle),
            (course.introductionDescription = body.introductionDescription),
            (course.introductionTitle2 = body.introductionTitle2),
            (course.introductionDescription2 = body.introductionDescription2),
            (course.introductionTitle3 = body.introductionTitle3),
            (course.introductionDescription3 = body.introductionDescription3),
            (course.slug = body.slug),
            course.save();
        return {
            success: true,
            data: null,
            message: "Successfully updated",
        };
    }
    catch (error) {
        throw error;
    }
});
exports.uploadCompanyImage = (companyId, imageType, files) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const company = yield course_1.default.findById(companyId);
        const imagePath = (files.imagePath && files.imagePath[0].filename) || null;
        if (+imageType === enums_1.CompanyFileEnum.coverPhoto) {
            if (company.coverPhoto) {
                MediaServer.removeFile(company.coverPhoto);
            }
            company.coverPhoto = imagePath;
        }
        yield company.save();
        return {
            success: true,
            data: null,
            message: "Successfully updated",
        };
    }
    catch (error) {
        throw error;
    }
});
exports.details = (slug) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield course_1.default.findOne()
        .where({ slug: slug })
        .select("name slug description coverPhoto logo duration price newPrice start tutor introductionTitle introductionTitle2 introductionTitle3 introductionDescription introductionDescription2 introductionDescription3")
        // .populate("tutor", 'name imagePath workingPlace workingPosition');
        .populate({
        path: "tutor",
        match: { status: enums_2.SchemaStatusEnum.published },
        select: "name imagePath workingPlace workingPosition",
    });
    return {
        success: true,
        data: data,
        message: "ok",
    };
});
exports.getMore = (query, user, body) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const nearestBranches = yield helper_1.getNearestBranches(query);
        const sortByOption = helper_1.getSortByOption(query.sortBy);
        const companyQuery = course_1.default.find({
            status: enums_2.SchemaStatusEnum.published,
        })
            .sort(sortByOption)
            .select("name description coverPhoto logo duration price start tutor slug")
            .populate("tutor");
        let companies = yield companyQuery.lean();
        companies.forEach((x) => {
            if (x.slug === body.id) {
                companies.splice(x.index, 1);
            }
        });
        shuffle(companies);
        function shuffle(array) {
            let currentIndex = array.length, temporaryValue, randomIndex;
            while (0 !== currentIndex) {
                randomIndex = Math.floor(Math.random() * currentIndex);
                currentIndex -= 1;
                temporaryValue = array[currentIndex];
                array[currentIndex] = array[randomIndex];
                array[randomIndex] = temporaryValue;
            }
            return array;
        }
        return {
            success: true,
            message: "ok",
            data: {
                itemsCount: companies.length,
                pageCount: 1,
                list: companies,
            },
        };
    }
    catch (error) {
        throw error;
    }
});
exports.getCompaniesWithDistance = (query, user) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const nearestBranches = yield helper_1.getNearestBranches(query);
        const sortByOption = helper_1.getSortByOption(query.sortBy);
        const companyQuery = course_1.default.find({
            status: enums_2.SchemaStatusEnum.published,
        })
            .sort(sortByOption)
            .select("name description coverPhoto logo duration price newPrice start tutor slug")
            .populate("tutor", "name imagePath workingPlace workingPosition");
        let companies = yield companyQuery.lean();
        return {
            success: true,
            message: "ok",
            data: {
                itemsCount: companies.length,
                pageCount: 1,
                list: companies,
            },
        };
    }
    catch (error) {
        throw error;
    }
});
exports.getTopCompanies = (query, user, nearestBranches) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const companies = course_1.default.find()
            .where({ showOnTop: 1 })
            .where({ status: enums_2.SchemaStatusEnum.published })
            .select("name description coverPhoto logo isClosed isFullTime showOnTop")
            // .select({ workingHours: { $slice: [getWeekDay(), 1] } })
            .populate("categories", "name imagePath")
            .populate({
            path: "branches",
            match: { status: enums_2.SchemaStatusEnum.published },
            select: "country address name latitude isClosed longitude city isFullTime workingHours phoneNumber1 phoneNumber2 phoneNumber3",
        });
        if (query.subcategoryId)
            companies.where({ categories: { $in: [query.subcategoryId] } });
        let list = yield companies.lean();
        list = list.map((item) => {
            if (nearestBranches) {
                const branch = nearestBranches.find((x) => x.mainCompany._id.toString() === item._id.toString());
                if (branch) {
                    item.distance = branch.distance;
                }
            }
            item.distance = item.distance || 0;
            return item;
        });
        const page = query.page;
        query.count = +query.count || 20;
        query.page = +query.page;
        if (!query.page)
            query.page = 1;
        query.page = query.page - 1 < 0 ? 0 : query.page - 1;
        const itemsCount = list.length;
        const pageCount = Helpers.getMaxPageCount(itemsCount, query.count);
        shuffle(list);
        function shuffle(array) {
            let currentIndex = array.length, temporaryValue, randomIndex;
            while (0 !== currentIndex) {
                randomIndex = Math.floor(Math.random() * currentIndex);
                currentIndex -= 1;
                temporaryValue = array[currentIndex];
                array[currentIndex] = array[randomIndex];
                array[randomIndex] = temporaryValue;
            }
            return array;
        }
        return {
            success: true,
            data: {
                pageCount,
                list,
                itemsCount,
            },
            message: "ok",
        };
    }
    catch (error) {
        throw error;
    }
});
exports.getCompanies = (query, nearestBranches) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const sortByOption = helper_1.getSortByOption(query.sortBy);
        const companies = course_1.default.find()
            .sort({ showOnTop: -1 })
            .where({ status: enums_2.SchemaStatusEnum.published })
            .where({ mainCategories: { $in: [query.mainCategoryId] } })
            .sort(sortByOption)
            .select("name description coverPhoto logo isClosed isFullTime workingHours showOnTop isFavorite")
            .populate("branches", "country address name latitude isClosed longitude city workingHours phoneNumber1 phoneNumber2 phoneNumber3")
            .select({ workingHours: { $slice: [helper_1.getWeekDay(), 1] } })
            .populate("categories", "name imagePath");
        // const page = query.page;
        if (query.subcategoryId)
            companies.where({ categories: { $in: [query.subcategoryId] } });
        let list = yield companies.lean();
        list = list.map((item) => {
            if (nearestBranches) {
                const branch = nearestBranches.find((x) => x.mainCompany._id.toString() === item._id.toString());
                if (branch) {
                    item.distance = branch.distance;
                }
            }
            item.distance = item.distance || 0;
            return item;
        });
        const page = query.page;
        query.count = +query.count || 20;
        query.page = +query.page;
        if (!query.page)
            query.page = 1;
        query.page = query.page - 1 < 0 ? 0 : query.page - 1;
        const itemsCount = list.length;
        const pageCount = Helpers.getMaxPageCount(itemsCount, query.count);
        // const data = await Helpers.pagination(query, companies);
        if (!query.subcategoryId && page == 1) {
            const item = yield course_1.default.findById("5e382554e0673103279de57f")
                .where({ status: enums_2.SchemaStatusEnum.published })
                .where({ mainCategories: { $in: [query.mainCategoryId] } })
                .select("name coverPhoto logo isClosed isFullTime workingHours")
                .select({ workingHours: { $slice: [helper_1.getWeekDay(), 1] } })
                .populate("categories", "name imagePath");
            if (item) {
                const index = list.findIndex((x) => x._id.toString() === item._id.toString());
                if (index === -1) {
                    list.splice(list.length - 1);
                }
                else {
                    list.splice(index, 1);
                }
                list.unshift(item);
            }
        }
        list = list
            .filter((item) => item.distance < 20000000)
            .map((item) => {
            // item.deliveryFee += getDistanceFee(item.distance);
            item.workingHoursStart = item.workingHours.length
                ? item.workingHours[0].workingHoursStart
                : null;
            item.workingHoursEnd = item.workingHours.length
                ? item.workingHours[0].workingHoursEnd
                : null;
            delete item.workingHours;
            return item;
        });
        return {
            success: true,
            data: {
                pageCount,
                list,
                itemsCount,
            },
            message: "ok",
        };
    }
    catch (error) {
        throw error;
    }
});
exports.getSalesCompanies = (query) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const settings = yield settings_1.default.findOne();
        let nearestBranches = [];
        if (query.latitude && query.longitude) {
            nearestBranches = yield helper_1.getNearestBranches(query);
        }
        const sortByOption = helper_1.getSortByOption(query.sortBy);
        const companies = course_1.default.find({
            $or: [{ isSale: true }, { partnerSale: true }],
        })
            .where({ status: enums_2.SchemaStatusEnum.published })
            .sort(sortByOption)
            .select("name coverPhoto logo deliveryFee rating isClosed isSale partnerSale isFullTime workingHours serviceFee isAdultFor isSmokingFor")
            .select({ workingHours: { $slice: [helper_1.getWeekDay(), 1] } })
            .populate("categories", "name imagePath");
        const data = yield Helpers.pagination(query, companies);
        data.list = data.list.map((item) => {
            item = item.toObject();
            if (nearestBranches && nearestBranches.length) {
                const branch = nearestBranches.find((x) => x.mainCompany._id.toString() === item._id.toString());
                if (branch) {
                    item.distance = branch.distance;
                }
            }
            item.distance = item.distance || 0;
            // item.deliveryFee += getDistanceFee(item.distance);
            item.workingHoursStart = item.workingHours.length
                ? item.workingHours[0].workingHoursStart
                : null;
            item.workingHoursEnd = item.workingHours.length
                ? item.workingHours[0].workingHoursEnd
                : null;
            // item.deliveryFee = item.deliveryFee * settings.deliveryFee.tariff;
            delete item.workingHours;
            return item;
        });
        return {
            success: true,
            data: data,
            message: "ok",
        };
    }
    catch (error) {
        throw error;
    }
});
exports.getCompaniesByFilter = (body) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const settings = yield settings_1.default.findOne();
        const filter = Object.assign({ mainCategories: [body.mainCategoryId], status: [enums_2.SchemaStatusEnum.published] }, body);
        const sortByOption = helper_1.getSortByOption(body.sortBy);
        const companies = shared_service_1.companyFilter(filter)
            .sort({ showOnTop: -1 })
            .sort(sortByOption)
            .select("name coverPhoto logo deliveryFee rating isClosed isSale partnerSale isFullTime workingHours isAdultFor showOnTop isSmokingFor")
            .select({ workingHours: { $slice: [helper_1.getWeekDay(), 1] } })
            .populate("categories", "name imagePath");
        const data = yield Helpers.pagination(body, companies);
        data.list = data.list.map((item) => {
            item = item.toObject();
            item.workingHoursStart = item.workingHours.length
                ? item.workingHours[0].workingHoursStart
                : null;
            item.workingHoursEnd = item.workingHours.length
                ? item.workingHours[0].workingHoursEnd
                : null;
            // item.deliveryFee = item.deliveryFee * settings.deliveryFee.tariff;
            delete item.workingHours;
            return item;
        });
        // const item = await Company
        //   .find()
        //   .sort(sortByOption)
        //   .where({ showOnTop: true })
        //   .where({ mainCategories: { $in: [body.mainCategoryId] } })
        //   .where({ status: SchemaStatusEnum.published })
        //   .select({ workingHours: { $slice: [getWeekDay(), 1] } })
        //   .select('name coverPhoto logo deliveryFee rating isClosed isSale partnerSale isFullTime workingHours isAdultFor showOnTop')
        //   .populate('categories', 'name imagePath');
        // if (item) {
        //   data.list.unshift(item);
        // }
        return {
            success: true,
            data: data,
            message: "ok",
        };
    }
    catch (error) {
        throw error;
    }
});
exports.getCompaniesForAdmin = (query, body) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const companies = course_1.default.find()
            .where({ status: { $ne: enums_2.SchemaStatusEnum.deleted } })
            .populate("createdBy", "firstName lastName")
            // .populate('tutor')
            .sort("positionList")
            .select({
            coverPhoto: 1,
            createdAt: 1,
            createdBy: 1,
            name: 1,
            description: 1,
            positionList: 1,
            status: 1,
            start: 1,
            tutor: 1,
            duration: 1,
            price: 1,
            newPrice: 1,
            introductionTitle: 1,
            introductionDescription: 1,
            introductionTitle2: 1,
            introductionDescription2: 1,
            introductionTitle3: 1,
            introductionDescription3: 1,
            slug: 1,
        });
        if (body.status || body.status === 0)
            companies.where({ status: body.status });
        if (body.ratingFrom)
            companies.where({ rating: { $gte: body.ratingFrom } });
        if (body.ratingTo)
            companies.where({ rating: { $lte: body.ratingTo } });
        if (body.deliveryFeeFrom)
            companies.where({ deliveryFee: { $gte: body.deliveryFeeFrom } });
        if (body.deliveryFeeTo)
            companies.where({ deliveryFee: { $lte: body.deliveryFeeTo } });
        if (body.name) {
            body.name = body.name
                .replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, "")
                .trim();
            companies.where({
                $or: [
                    { "name.hy": new RegExp(body.name, "i") },
                    { "name.ru": new RegExp(body.name, "i") },
                    { "name.en": new RegExp(body.name, "i") },
                ],
            });
        }
        const data = yield Helpers.pagination(query, companies);
        return {
            success: true,
            data: data,
            message: "ok",
        };
    }
    catch (error) {
        throw error;
    }
});
exports.getShortListByFilter = (body) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const _body = body;
        // For add MP and RP orders
        _body.status = [enums_2.SchemaStatusEnum.published];
        const data = yield shared_service_1.companyFilter({
            name: body.name,
            description: body.name,
            count: 10,
            status: [enums_2.SchemaStatusEnum.published],
            mainCategories: body.mainCategories,
        }).select("name");
        // const data = await companyFilter(body).select("name");
        return {
            success: true,
            data: data,
            message: "ok",
        };
    }
    catch (error) {
        throw error;
    }
});
exports.changeStatus = (body, user, id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield course_1.default.findById(id);
        data.status = body.status;
        data.updateBy = user._id;
        yield data.save();
        return {
            success: true,
            data: null,
            message: "ok",
        };
    }
    catch (error) {
        throw error;
    }
});
exports.changePosition = (body, user) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let filter;
        if (body.from < body.to)
            filter = { $gte: body.from, $lte: body.to };
        else
            filter = { $gte: body.to, $lte: body.from };
        const items = yield course_1.default.find({ positionList: filter }).select("_id positionList");
        yield Promise.all(items.map((item) => __awaiter(void 0, void 0, void 0, function* () {
            if (item.positionList === body.from) {
                item.positionList = body.to;
            }
            else {
                if (body.from < body.to)
                    item.positionList = item.positionList - 1;
                else
                    item.positionList = item.positionList + 1;
            }
            item.updateBy = user._id;
            return item.save();
        })));
        return {
            success: true,
            data: null,
            message: "ok",
        };
    }
    catch (error) {
        throw error;
    }
});
exports.searchCompany = (searchText) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const companies = course_1.default.find().where({
            status: enums_2.SchemaStatusEnum.published,
        });
        if (searchText) {
            searchText = searchText
                .replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, "")
                .trim();
            companies.where({
                $or: [
                    { "name.hy": new RegExp(searchText, "i") },
                    { "name.ru": new RegExp(searchText, "i") },
                    { "name.en": new RegExp(searchText, "i") },
                ],
            });
        }
        const data = yield companies;
        return {
            success: true,
            data: data,
            message: "ok",
        };
    }
    catch (error) {
        throw error;
    }
});
