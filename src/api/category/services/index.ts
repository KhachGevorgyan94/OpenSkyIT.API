import * as MediaServer from '../../media-server';

//#region Models

import { IAddCategoryBodyModel, IChangeStatusBodyModel, IChangePositionBodyModel } from '../models';
import {
  IResponseObjectViewModel,
  IPersonBaseModel,
  IObjectId
} from '../../../helpers/models';

//#endregion

//#region Enum

import { SchemaStatusEnum } from '../../../helpers/enums';

//#endregion

//#region Schemas

import MainCategory from '../../../schemas/tutor';
import { CategoryFileEnum } from '../enums';

//#endregion

//#region Additional Services


//#endregion


export const categoryList = async (): Promise<IResponseObjectViewModel> => {
  try {
    let categoryList = await MainCategory
      .find()
      .where({ status: SchemaStatusEnum.published })
      .select('imagePath name workingPlace workingPosition')
      .sort('positionList');

    return {
      success: true,
      data: categoryList,
      message: 'ok'
    };
  } catch (error) { throw error; }
};

export const details = async (id: IObjectId): Promise<IResponseObjectViewModel> => {
  try {
    const category = await MainCategory
      .findById(id)
      .select('imagePath name description webImagePath onlineShopPermissions iconPath');

    return {
      success: true,
      data: category,
      message: 'ok'
    };
  } catch (error) { throw error; }
};

export const partnersCount = async (id: IObjectId): Promise<IResponseObjectViewModel> => {
  try {
    let mainCategory = await MainCategory
      .findById(id)
      .select('count').populate({
        path: 'count',
        match: { status: SchemaStatusEnum.published },
        select: '_id',
      });

    let partners: any = mainCategory.toObject({ virtuals: true });
    mainCategory.count = partners.count.length;

    return partners.count.length;

  } catch (error) { throw error; }
};

//#region Only for Admin

export const categoryListForAdmin = async (): Promise<IResponseObjectViewModel> => {
  let data = await MainCategory
    .find()
    .populate('createdBy', 'firstName lastName')
    .sort('positionList')
    .select({
      name: 1,
      createdBy: 1,
      createdAt: 1,
      status: 1,
      positionList: 1,
      imagePath: 1,
      iconPath: 1,
      webImagePath: 1,
      workingPlace : 1,
      workingPosition : 1
    });
  return {
    success: true,
    data: data,
    message: 'ok'
  };
};

export const create = async (body: IAddCategoryBodyModel, user: IPersonBaseModel): Promise<IResponseObjectViewModel> => {
  try {
    const data = await MainCategory.create({
      name: body.name,
      createdBy: user._id,
      updateBy: user._id,
      workingPlace : body.workingPlace,
      workingPosition : body.workingPosition
    });
    return {
      success: true,
      data: data._id,
      message: 'ok'
    };
  } catch (error) { throw error; }
};

export const editCategory = async (body: IAddCategoryBodyModel, user: IPersonBaseModel, id: IObjectId): Promise<IResponseObjectViewModel> => {
  try {
    const data = await MainCategory.findById({ _id: id });
    data.name = body.name;
    data.updateBy = user._id;
    data.workingPlace = body.workingPlace,
    data.workingPosition = body.workingPosition;
    await data.save();
    return {
      success: true,
      data: null,
      message: 'ok'
    };
  } catch (error) { throw error; }
};

export const changeStatus = async (body: IChangeStatusBodyModel, user: IPersonBaseModel, id: IObjectId): Promise<IResponseObjectViewModel> => {
  try {
    const data = await MainCategory.findById(id);
    data.status = body.status;
    data.updateBy = user._id;
    await data.save();
    return {
      success: true,
      data: null,
      message: 'ok'
    };
  } catch (error) { throw error; }
};

export const changePosition = async (body: IChangePositionBodyModel, user: IPersonBaseModel): Promise<IResponseObjectViewModel> => {
  try {
    let filter;
    if (body.from < body.to) filter = { $gte: body.from, $lte: body.to };
    else filter = { $gte: body.to, $lte: body.from };
    const items = await MainCategory.find({ positionList: filter }).select('_id positionList');
    await Promise.all(
      items.map(async item => {
        if (item.positionList === body.from) {
          item.positionList = body.to;
        } else {
          if (body.from < body.to) item.positionList = item.positionList - 1;
          else item.positionList = item.positionList + 1;
        }
        item.updateBy = user._id;
        return item.save();
      }),
    );
    return {
      success: true,
      data: null,
      message: 'ok'
    };
  } catch (error) { throw error; }
};

export const upload = async (id: IObjectId, imageType: CategoryFileEnum, files: any, user: IPersonBaseModel): Promise<IResponseObjectViewModel> => {
  try {
    const category = await MainCategory.findById(id);

    const imagePath: string | null = (files.imagePath && files.imagePath[0].filename) || null;

    if (+(imageType) === CategoryFileEnum.image) {
      if (category.imagePath) MediaServer.removeFile(category.imagePath);
      category.imagePath = imagePath;
    }

    category.updateBy = user._id;
    category.save();
    return {
      success: true,
      data: null,
      message: 'ok'
    };
  } catch (error) { throw error; }
};

//#endregion