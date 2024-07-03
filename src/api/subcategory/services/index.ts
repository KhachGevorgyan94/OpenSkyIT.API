import * as MediaServer from '../../media-server';

//#region Models

import { IAddSubcategoryBodyModel, IChangePositionBodyModel, IChangeStatusBodyModel } from '../models';
import {
  IResponseObjectViewModel,
  IPersonBaseModel,
  IObjectId
} from '../../../helpers/models';
import {partnersCount}  			 					from '../../category/services'

//#endregion

//#region Enums

import { SchemaStatusEnum } from '../../../helpers/enums';

//#endregion

//#region Schemas

import Subcategory from '../../../schemas/subcategory';

//#endregion

export const addSubcategory = async (body: IAddSubcategoryBodyModel, user: IPersonBaseModel): Promise<IResponseObjectViewModel> => {
  try {
    const count = await Subcategory
      .find()
      .where({ mainCategory : body.mainCategoryId })
      .count();
    const data = await Subcategory.create({
      name         : body.name,
      mainCategory : body.mainCategoryId,
      positionList : count + 1,
      createdBy    : user._id,
      updateBy     : user._id
    });

    return {
      success : true,
      data    : data._id,
      message : 'ok'
    };
  } catch (error) { throw error; }
};

export const editSubcategory = async (body: IAddSubcategoryBodyModel, user: IPersonBaseModel, id: IObjectId): Promise<IResponseObjectViewModel> => {
  try {
    const data = await Subcategory.findById(id);
    data.name = body.name;
    data.updateBy = user._id;
    await data.save();
    return {
      success : true,
      data    : null,
      message : 'ok'
    };
  } catch (error) { throw error; }
};

export const changeStatus = async (body: IChangeStatusBodyModel, user: IPersonBaseModel, id: IObjectId): Promise<IResponseObjectViewModel> => {
  try {
    const data = await Subcategory.findById(id);
    data.status = body.status;
    data.updateBy = user._id;
    await data.save();
    return {
      success : true,
      data    : null,
      message : 'ok'
    };
  } catch (error) { throw error; }
};

export const changePosition = async (body: IChangePositionBodyModel, user: IPersonBaseModel): Promise<IResponseObjectViewModel> => {
  try {
    let filter;
    if (body.from < body.to) filter = { $gte: body.from, $lte: body.to };
    else filter = { $gte: body.to, $lte: body.from };
    const items = await Subcategory.find({ positionList: filter, mainCategory : body.mainCategoryId }).select('_id positionList');
    await Promise.all(
      items.map(async item => {
        item.updateBy = user._id;
        if (item.positionList === body.from) {
          item.positionList = body.to;
        } else {
          if (body.from < body.to) item.positionList = item.positionList - 1;
          else item.positionList = item.positionList + 1;
        }
        return item.save();
      }),
    );
    return {
      success : true,
      data    : null,
      message : 'ok'
    };
  } catch (error) { throw error; }
};

export const subcategoryList = async (mainCategoryId: IObjectId): Promise<IResponseObjectViewModel> => {
  try {
    let categoryList: any[] = await Subcategory
      .find()
      .where({ status : SchemaStatusEnum.published })
      .where({ mainCategory : mainCategoryId})
      .select('name mainCategory imagePath')
      .sort('positionList')
      .populate({
        path: 'count',
        match: { status: SchemaStatusEnum.published },
        select: '_id',
      });

      categoryList = categoryList.map((item: any) => {
        item = item.toObject({ virtuals: true });
        item.count = item.count.length;
        return item;
      });

    if (categoryList.length > 1) categoryList.unshift({
      mainCategory : mainCategoryId,
      name         : {
        en: 'All',
        hy: 'Բոլորը',
        ru: 'Все',
      },
      count : await partnersCount(mainCategoryId)
    });
    return {
      success : true,
      data    : categoryList,
      message : 'ok'
    };
  } catch (error) { throw error; }
};

export const subcategoryShortList = async (mainCategoryId: IObjectId): Promise<IResponseObjectViewModel> => {
  try {
    const categoryList = await Subcategory
      .find()
      .where({ status : SchemaStatusEnum.published })
      .where({ mainCategory : mainCategoryId})
      .select('_id name imagePath')
      .sort('positionList');
    return {
      success : true,
      data    : categoryList,
      message : 'ok'
    };
  } catch (error) { throw error; }
};

export const subcategoryListForAdmin = async (mainCategoryId: IObjectId): Promise<IResponseObjectViewModel> => {
  try {
    const categoryList = await Subcategory
      .find()
      .where({ mainCategory : mainCategoryId})
      .populate('createdBy', 'firstName lastName')
      .populate('mainCategory', 'name')
      .sort('positionList')
      .select({
        name         : 1,
        createdBy    : 1,
        createdAt    : 1,
        status       : 1,
        positionList : 1,
        mainCategory : 1,
        imagePath    : 1,
      });
    return {
      success : true,
      data    : categoryList,
      message : 'ok'
    };
  } catch (error) { throw error; }
};

export const upload = async (id: IObjectId, files: any, user: IPersonBaseModel): Promise<IResponseObjectViewModel> => {
  try {
    const subcategory = await Subcategory.findById(id);

    const imagePath: string = files.imagePath && files.imagePath[0].filename;

    if (subcategory.imagePath) MediaServer.removeFile(subcategory.imagePath);
    subcategory.imagePath = imagePath;

    subcategory.updateBy = user._id;
    await subcategory.save();
    return {
      success: true,
      data: null,
      message: 'ok'
    };
  } catch (error) { throw error; }
};