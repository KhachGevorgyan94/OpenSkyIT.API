import { IAddGalleryBodyModel } from "./../models/index";
import * as MediaServer from "../../media-server";

import {
  IResponseObjectViewModel,
  IPersonBaseModel,
  IObjectId,
} from "../../../helpers/models";

import Gallery from "../../../schemas/gallery";
import { CategoryFileEnum } from "../../category/enums";

export const categoryList = async (): Promise<IResponseObjectViewModel> => {
  try {
    let categoryList = await Gallery.find().select("src width height");
    return {
      success: true,
      data: categoryList,
      message: "ok",
    };
  } catch (error) {
    throw error;
  }
};

export const editCategory = async (
  user: IPersonBaseModel,
  id: IObjectId
): Promise<IResponseObjectViewModel> => {
  try {
    const data = await Gallery.findById({ _id: id });
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

export const categoryListForAdmin =
  async (): Promise<IResponseObjectViewModel> => {
    let data = await Gallery.find().select({
      createdBy: 1,
      createdAt: 1,
      src: 1,
      width: 1,
      height: 1,
    });
    return {
      success: true,
      data: data,
      message: "ok",
    };
  };

export const create = async (
  user: IPersonBaseModel,
  body: IAddGalleryBodyModel
): Promise<IResponseObjectViewModel> => {
  try {
    const data = await Gallery.create({
      createdBy: user._id,
      updateBy: user._id,
      width: body.width,
      height: body.height,
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

export const upload = async (
  id: IObjectId,
  imageType: CategoryFileEnum,
  files: any,
  user: IPersonBaseModel
): Promise<IResponseObjectViewModel> => {
  try {
    const category = await Gallery.findById(id);

    const imagePath: string | null =
      (files.imagePath && files.imagePath[0].filename) || null;

    if (+imageType === CategoryFileEnum.image) {
      if (category.src) MediaServer.removeFile(category.src);
      category.src = imagePath;
    }

    category.updateBy = user._id;
    category.save();
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
