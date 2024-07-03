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

import Review from "../../../schemas/review";
import { CategoryFileEnum } from "../enums";

//#endregion

export const promotionsList = async (): Promise<IResponseObjectViewModel> => {
  try {
    let promotionsList = await Review.find()
      .where({ status: SchemaStatusEnum.published })
      .select("imagePath studied comment name createdAt")
      .sort({ createdAt: -1 })

    shuffle(promotionsList);

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
      data: promotionsList,
      message: "ok",
    };
  } catch (error) {
    throw error;
  }
};

export const details = async (
  id: IObjectId
): Promise<IResponseObjectViewModel> => {
  try {
    const promotion = await Review.findById(id).select(
      "imagePath name description webImagePath"
    );

    return {
      success: true,
      data: promotion,
      message: "ok",
    };
  } catch (error) {
    throw error;
  }
};


export const promotionListForAdmin =
  async (): Promise<IResponseObjectViewModel> => {
    let data = await Review.find()
      .populate("createdBy", "firstName lastName")
      .sort({ createdAt: -1 })
      .select({
        name: 1,
        createdBy: 1,
        createdAt: 1,
        status: 1,
        positionList: 1,
        imagePath: 1,
        webImagePath: 1,
        studied : 1,
        comment : 1
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
    const data = await Review.create({
      name: body.name,
      studied: body.studied,
      comment : body.comment,
      createdBy: user._id,
      updateBy: user._id,
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
    const data = await Review.findById({ _id: id });
    data.name = body.name;
    data.studied = body.studied;
    data.comment = body.comment;
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

export const changeStatus = async (
  body: IChangeStatusBodyModel,
  user: IPersonBaseModel,
  id: IObjectId
): Promise<IResponseObjectViewModel> => {
  try {
    const data = await Review.findById(id);
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
    const items = await Review.find({ positionList: filter }).select(
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
    const review = await Review.findById(id);

    const imagePath: string | null =
      (files.imagePath && files.imagePath[0].filename) || null;

    if (+imageType === CategoryFileEnum.image) {
      if (review.imagePath) MediaServer.removeFile(review.imagePath);
      review.imagePath = imagePath;
    } else if (+imageType === CategoryFileEnum.webImage) {
      if (review.webImagePath)
        MediaServer.removeFile(review.webImagePath);
      review.webImagePath = imagePath;
    }

    review.updateBy = user._id;
    review.save();
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
