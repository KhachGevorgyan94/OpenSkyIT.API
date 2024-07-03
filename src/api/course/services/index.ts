import * as MediaServer from "../../media-server";
import * as Helpers from "../../../helpers";
import { ICompanyFilterModel } from "../../../helpers/models/index";

//#region Models

import { CompanyFileEnum, SortBy } from "../enums";
import { SchemaStatusEnum } from "../../../helpers/enums";
import { ICompanyViewModel, ICompany } from "../../../schemas/course/model";
import {
  ICreateCompanyBodyModel,
  IEditCompanyBodyModel,
  IGetCompaniesQueryModel,
  IChangeStatusBodyModel,
  IGetCompanyBodyModel,
  IGetCompaniesByFilterBodyModel,
  IChangePositionBodyModel,
  IAddCompanyCashOut,
} from "../models";
import {
  IResponseObjectViewModel,
  IPersonBaseModel,
  IObjectId,
  IPaginationReqViewModel,
} from "../../../helpers/models";

//#endregion

//#region Schemas

import Course from "../../../schemas/course";
import Settings from "../../../schemas/settings";

//#endregion

//#region Helpers

import {
  arrayMove,
  getSortByOption,
  getWeekDay,
  getNearestBranches,
} from "./helper";
import { companyFilter } from "../../shared-service";
import { IBranch } from "../../../schemas/branch/model";
// import { getDistanceFee } from '../../settings/services';
import { ObjectID, ObjectId } from "mongodb";

//#endregion

export const createCourse = async (
  body: ICreateCompanyBodyModel,
  user: IPersonBaseModel
): Promise<IResponseObjectViewModel> => {
  try {
    const data = await Course.create({
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
  } catch (error) {
    throw error;
  }
};

export const editCompany = async (
  body: IEditCompanyBodyModel,
  user: IPersonBaseModel,
  id: IObjectId
): Promise<IResponseObjectViewModel> => {
  try {
    const course = await Course.findById(id);

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
  } catch (error) {
    throw error;
  }
};

export const uploadCompanyImage = async (
  companyId: IObjectId,
  imageType: CompanyFileEnum,
  files: any
): Promise<IResponseObjectViewModel> => {
  try {
    const company: ICompanyViewModel = await Course.findById(companyId);
    const imagePath: string | null =
      (files.imagePath && files.imagePath[0].filename) || null;
    if (+imageType === CompanyFileEnum.coverPhoto) {
      if (company.coverPhoto) {
        MediaServer.removeFile(company.coverPhoto);
      }
      company.coverPhoto = imagePath;
    }
    await company.save();
    return {
      success: true,
      data: null,
      message: "Successfully updated",
    };
  } catch (error) {
    throw error;
  }
};

export const details = async (
  slug: string
): Promise<IResponseObjectViewModel> => {
  const data = await Course.findOne()
    .where({ slug: slug })
    .select(
      "name slug description coverPhoto logo duration price newPrice start tutor introductionTitle introductionTitle2 introductionTitle3 introductionDescription introductionDescription2 introductionDescription3"
    )
    // .populate("tutor", 'name imagePath workingPlace workingPosition');
    .populate({
      path: "tutor",
      match: { status: SchemaStatusEnum.published },
      select: "name imagePath workingPlace workingPosition",
    });
  return {
    success: true,
    data: data,
    message: "ok",
  };
};

export const getMore = async (
  query: IGetCompaniesQueryModel,
  user?: IPersonBaseModel,
  body?: any
) => {
  try {
    const nearestBranches = await getNearestBranches(query);
    const sortByOption: object = getSortByOption(query.sortBy);

    const companyQuery = Course.find({
      status: SchemaStatusEnum.published,
    })
      .sort(sortByOption)
      .select(
        "name description coverPhoto logo duration price start tutor slug"
      )
      .populate("tutor");
    let companies = await companyQuery.lean();

    companies.forEach((x) => {
      if (x.slug === body.id) {
        companies.splice(x.index, 1);
      }
    });

    shuffle(companies);

    function shuffle(array: any[]) {
      let currentIndex = array.length,
        temporaryValue,
        randomIndex;

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
  } catch (error) {
    throw error;
  }
};

export const getCompaniesWithDistance = async (
  query: IGetCompaniesQueryModel,
  user?: IPersonBaseModel
) => {
  try {
    const nearestBranches = await getNearestBranches(query);
    const sortByOption: object = getSortByOption(query.sortBy);

    const companyQuery = Course.find({
      status: SchemaStatusEnum.published,
    })
      .sort(sortByOption)
      .select(
        "name description coverPhoto logo duration price newPrice start tutor slug"
      )
      .populate("tutor", "name imagePath workingPlace workingPosition");
    let companies = await companyQuery.lean();

    return {
      success: true,
      message: "ok",
      data: {
        itemsCount: companies.length,
        pageCount: 1,
        list: companies,
      },
    };
  } catch (error) {
    throw error;
  }
};

export const getTopCompanies = async (
  query: IGetCompaniesQueryModel,
  user?: IPersonBaseModel,
  nearestBranches?: IBranch<ICompany>[]
): Promise<IResponseObjectViewModel> => {
  try {
    const companies = Course.find()
      .where({ showOnTop: 1 })
      .where({ status: SchemaStatusEnum.published })
      .select("name description coverPhoto logo isClosed isFullTime showOnTop")
      // .select({ workingHours: { $slice: [getWeekDay(), 1] } })
      .populate("categories", "name imagePath")
      .populate({
        path: "branches",
        match: { status: SchemaStatusEnum.published },
        select:
          "country address name latitude isClosed longitude city isFullTime workingHours phoneNumber1 phoneNumber2 phoneNumber3",
      });

    if (query.subcategoryId)
      companies.where({ categories: { $in: [query.subcategoryId] } });
    let list = await companies.lean();
    list = list.map((item: any) => {
      if (nearestBranches) {
        const branch = nearestBranches.find(
          (x) => x.mainCompany._id.toString() === item._id.toString()
        );
        if (branch) {
          item.distance = (<any>branch).distance;
        }
      }
      item.distance = item.distance || 0;
      return item;
    });
    const page = query.page;
    query.count = +query.count || 20;
    query.page = +query.page;
    if (!query.page) query.page = 1;
    query.page = query.page - 1 < 0 ? 0 : query.page - 1;
    const itemsCount = list.length;
    const pageCount = Helpers.getMaxPageCount(itemsCount, query.count);

    shuffle(list);

    function shuffle(array: any[]) {
      let currentIndex = array.length,
        temporaryValue,
        randomIndex;

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
  } catch (error) {
    throw error;
  }
};

export const getCompanies = async (
  query: IGetCompaniesQueryModel,
  nearestBranches?: IBranch<ICompany>[]
): Promise<IResponseObjectViewModel> => {
  try {
    const sortByOption: Object = getSortByOption(query.sortBy);
    const companies = Course.find()
      .sort({ showOnTop: -1 })
      .where({ status: SchemaStatusEnum.published })
      .where({ mainCategories: { $in: [query.mainCategoryId] } })
      .sort(sortByOption)
      .select(
        "name description coverPhoto logo isClosed isFullTime workingHours showOnTop isFavorite"
      )
      .populate(
        "branches",
        "country address name latitude isClosed longitude city workingHours phoneNumber1 phoneNumber2 phoneNumber3"
      )
      .select({ workingHours: { $slice: [getWeekDay(), 1] } })
      .populate("categories", "name imagePath");

    // const page = query.page;

    if (query.subcategoryId)
      companies.where({ categories: { $in: [query.subcategoryId] } });
    let list = await companies.lean();
    list = list.map((item: any) => {
      if (nearestBranches) {
        const branch = nearestBranches.find(
          (x) => x.mainCompany._id.toString() === item._id.toString()
        );
        if (branch) {
          item.distance = (<any>branch).distance;
        }
      }
      item.distance = item.distance || 0;
      return item;
    });
    const page = query.page;
    query.count = +query.count || 20;
    query.page = +query.page;
    if (!query.page) query.page = 1;
    query.page = query.page - 1 < 0 ? 0 : query.page - 1;
    const itemsCount = list.length;
    const pageCount = Helpers.getMaxPageCount(itemsCount, query.count);

    // const data = await Helpers.pagination(query, companies);

    if (!query.subcategoryId && page == 1) {
      const item = await Course.findById("5e382554e0673103279de57f")
        .where({ status: SchemaStatusEnum.published })
        .where({ mainCategories: { $in: [query.mainCategoryId] } })
        .select("name coverPhoto logo isClosed isFullTime workingHours")
        .select({ workingHours: { $slice: [getWeekDay(), 1] } })
        .populate("categories", "name imagePath");
      if (item) {
        const index = list.findIndex(
          (x) => x._id.toString() === item._id.toString()
        );
        if (index === -1) {
          list.splice(list.length - 1);
        } else {
          list.splice(index, 1);
        }
        list.unshift(item);
      }
    }
    list = list
      .filter((item: any) => item.distance < 20000000)
      .map((item: any) => {
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
  } catch (error) {
    throw error;
  }
};
export const getSalesCompanies = async (
  query: IGetCompaniesQueryModel
): Promise<IResponseObjectViewModel> => {
  try {
    const settings = await Settings.findOne();

    let nearestBranches = [];

    if (query.latitude && query.longitude) {
      nearestBranches = await getNearestBranches(query);
    }

    const sortByOption: Object = getSortByOption(query.sortBy);
    const companies = Course.find({
      $or: [{ isSale: true }, { partnerSale: true }],
    })
      .where({ status: SchemaStatusEnum.published })
      .sort(sortByOption)
      .select(
        "name coverPhoto logo deliveryFee rating isClosed isSale partnerSale isFullTime workingHours serviceFee isAdultFor isSmokingFor"
      )
      .select({ workingHours: { $slice: [getWeekDay(), 1] } })
      .populate("categories", "name imagePath");

    const data = await Helpers.pagination(query, companies);
    data.list = data.list.map((item) => {
      item = item.toObject();
      if (nearestBranches && nearestBranches.length) {
        const branch = nearestBranches.find(
          (x) => x.mainCompany._id.toString() === item._id.toString()
        );
        if (branch) {
          item.distance = (<any>branch).distance;
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
  } catch (error) {
    throw error;
  }
};

export const getCompaniesByFilter = async (
  body: IGetCompaniesByFilterBodyModel
): Promise<IResponseObjectViewModel> => {
  try {
    const settings = await Settings.findOne();
    const filter = {
      mainCategories: [body.mainCategoryId],
      status: [SchemaStatusEnum.published],
      ...body,
    };
    const sortByOption: Object = getSortByOption(body.sortBy);
    const companies = companyFilter(filter)
      .sort({ showOnTop: -1 })
      .sort(sortByOption)
      .select(
        "name coverPhoto logo deliveryFee rating isClosed isSale partnerSale isFullTime workingHours isAdultFor showOnTop isSmokingFor"
      )
      .select({ workingHours: { $slice: [getWeekDay(), 1] } })
      .populate("categories", "name imagePath");

    const data = await Helpers.pagination(body, companies);

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
  } catch (error) {
    throw error;
  }
};

export const getCompaniesForAdmin = async (
  query: IPaginationReqViewModel,
  body: IGetCompanyBodyModel
): Promise<IResponseObjectViewModel> => {
  try {
    const companies = Course.find()
      .where({ status: { $ne: SchemaStatusEnum.deleted } })
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
    if (body.ratingFrom) companies.where({ rating: { $gte: body.ratingFrom } });
    if (body.ratingTo) companies.where({ rating: { $lte: body.ratingTo } });
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

    const data = await Helpers.pagination(query, companies);
    return {
      success: true,
      data: data,
      message: "ok",
    };
  } catch (error) {
    throw error;
  }
};

export const getShortListByFilter = async (
  body: ICompanyFilterModel
): Promise<IResponseObjectViewModel> => {
  try {
    const _body: ICompanyFilterModel = body;
    // For add MP and RP orders
    _body.status = [SchemaStatusEnum.published];
    const data = await companyFilter({
      name: body.name,
      description: body.name,
      count: 10,
      status: [SchemaStatusEnum.published],
      mainCategories: body.mainCategories,
    }).select("name");
    // const data = await companyFilter(body).select("name");
    return {
      success: true,
      data: data,
      message: "ok",
    };
  } catch (error) {
    throw error;
  }
};

export const changeStatus = async (
  body: IChangeStatusBodyModel,
  user: IPersonBaseModel,
  id: IObjectId
): Promise<IResponseObjectViewModel> => {
  try {
    const data = await Course.findById(id);
    data.status = body.status;
    data.updateBy = user._id;
    await data.save();

    return {
      success: true,
      data: null,
      message: "ok",
    };
  } catch (error) {
    throw error;
  }
};

export const changePosition = async (
  body: IChangePositionBodyModel,
  user: IPersonBaseModel
): Promise<IResponseObjectViewModel> => {
  try {
    let filter;
    if (body.from < body.to) filter = { $gte: body.from, $lte: body.to };
    else filter = { $gte: body.to, $lte: body.from };
    const items = await Course.find({ positionList: filter }).select(
      "_id positionList"
    );
    await Promise.all(
      items.map(async (item) => {
        if (item.positionList === body.from) {
          item.positionList = body.to;
        } else {
          if (body.from < body.to) item.positionList = item.positionList - 1;
          else item.positionList = item.positionList + 1;
        }
        item.updateBy = user._id;
        return item.save();
      })
    );
    return {
      success: true,
      data: null,
      message: "ok",
    };
  } catch (error) {
    throw error;
  }
};

export const searchCompany = async (
  searchText: string
): Promise<IResponseObjectViewModel> => {
  try {
    const companies = Course.find().where({
      status: SchemaStatusEnum.published,
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
    const data = await companies;
    return {
      success: true,
      data: data,
      message: "ok",
    };
  } catch (error) {
    throw error;
  }
};
