import * as MediaServer from "../../media-server";

//#region Models

import {
  IAddPromotionBodyModel,
  IChangeStatusBodyModel,
  IChangePositionBodyModel,
} from "../models";
import {
  IResponseObjectViewModel,
  IPersonBaseModel,
  IObjectId,
} from "../../../helpers/models";

//#endregion

//#region Enum

import { SchemaStatusEnum } from "../../../helpers/enums";

//#endregion

//#region Schemas

import Promotion from "../../../schemas/promotion";
import { CategoryFileEnum } from "../enums";

//#endregion

export const promotionsList = async (): Promise<IResponseObjectViewModel> => {
  try {
    let promotionsList = await Promotion.find()
      .where({ status: SchemaStatusEnum.published })
      .select("imagePath name description createdAt slug")
      .sort({ createdAt: -1 });

    return {
      success: true,
      data: promotionsList,
      message: "ok",
    };
  } catch (error) {
    throw error;
  }
};

export const details = async (
  slug: string
): Promise<IResponseObjectViewModel> => {
  try {
    const promotion = await Promotion.findOne()
      .where({ slug: slug })
      .select("imagePath name description createdAt slug subtitle");

    return {
      success: true,
      data: promotion,
      message: "ok",
    };
  } catch (error) {
    throw error;
  }
};

export const partnersCount = async (
  id: IObjectId
): Promise<IResponseObjectViewModel> => {
  try {
    let promotion = await Promotion.findById(id)
      .select("count")
      .populate({
        path: "count",
        match: { status: SchemaStatusEnum.published },
        select: "_id",
      });

    let partners: any = promotion.toObject({ virtuals: true });
    promotion.count = partners.count.length;

    return partners.count.length;
  } catch (error) {
    throw error;
  }
};

//#region Only for Admin

export const promotionListForAdmin =
  async (): Promise<IResponseObjectViewModel> => {
    let data = await Promotion.find()
      .populate("createdBy", "firstName lastName")
      .populate({
        path: "count",
        match: { status: SchemaStatusEnum.published },
        select: "_id",
      })
      .sort("positionList")
      .select({
        name: 1,
        description: 1,
        subtitle : 1,
        createdBy: 1,
        createdAt: 1,
        status: 1,
        positionList: 1,
        imagePath: 1,
        webImagePath: 1,
        count: 1,
        slug: 1,
      });

    return {
      success: true,
      data: data,
      message: "ok",
    };
  };

export const create = async (
  body: IAddPromotionBodyModel,
  user: IPersonBaseModel
): Promise<IResponseObjectViewModel> => {
  try {
    const data = await Promotion.create({
      name: body.name,
      description: body.description,
      subtitle : body.subtitle,
      createdBy: user._id,
      updateBy: user._id,
      slug: body.slug,
    });
    return {
      success: true,
      data: data._id,
      message: "ok",
    };
  } catch (error) {
    throw error;
  }
};

export const editPromotion = async (
  body: IAddPromotionBodyModel,
  user: IPersonBaseModel,
  id: IObjectId
): Promise<IResponseObjectViewModel> => {
  try {
    const data = await Promotion.findById({ _id: id });
    data.name = body.name;
    data.description = body.description;
    data.updateBy = user._id;
    data.subtitle = body.subtitle;
    data.slug = body.slug;
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

export const changeStatus = async (
  body: IChangeStatusBodyModel,
  user: IPersonBaseModel,
  id: IObjectId
): Promise<IResponseObjectViewModel> => {
  try {
    const data = await Promotion.findById(id);
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
    const items = await Promotion.find({ positionList: filter }).select(
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

export const upload = async (
  id: IObjectId,
  imageType: CategoryFileEnum,
  files: any,
  user: IPersonBaseModel
): Promise<IResponseObjectViewModel> => {
  try {
    const promotion = await Promotion.findById(id);

    const imagePath: string | null =
      (files.imagePath && files.imagePath[0].filename) || null;

    if (+imageType === CategoryFileEnum.image) {
      if (promotion.imagePath) MediaServer.removeFile(promotion.imagePath);
      promotion.imagePath = imagePath;
    } else if (+imageType === CategoryFileEnum.webImage) {
      if (promotion.webImagePath)
        MediaServer.removeFile(promotion.webImagePath);
      promotion.webImagePath = imagePath;
    }

    promotion.updateBy = user._id;
    promotion.save();
    return {
      success: true,
      data: null,
      message: "ok",
    };
  } catch (error) {
    throw error;
  }
};

//#endregion
export const deleteBlog = async (
  id: IObjectId
): Promise<IResponseObjectViewModel> => {
  try {
    await Promotion.findByIdAndDelete(id);
    return {
      success: true,
      data: null,
      message: "ok",
    };
  } catch (error) {
    throw error;
  }
};
