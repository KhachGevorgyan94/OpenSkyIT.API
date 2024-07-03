import * as MediaServer from "../../media-server";

//#region Models

import {
  IAddCareersBodyModel,
  IChangeStatusBodyModel,
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

import Careers from "../../../schemas/careers";
import { CategoryFileEnum } from "../enums";

//#endregion

export const careersList = async (): Promise<IResponseObjectViewModel> => {
  try {
    let careersList = await Careers.find()
      .where({ status: SchemaStatusEnum.published })
      .select("imagePath name description createdAt slug")
      .sort({ createdAt: -1 })

    return {
      success: true,
      data: careersList,
      message: "ok",
    };
  } catch (error) {
    throw error;
  }
};

export const details = async (
  slug : string
): Promise<IResponseObjectViewModel> => {
  try {
    const careers = await Careers.findOne().where({ slug : slug }).select("imagePath name description createdAt slug")

    return {
      success: true,
      data: careers,
      message: "ok",
    };
  } catch (error) {
    throw error;
  }
};
//#region Only for Admin

export const careersListForAdmin =
  async (): Promise<IResponseObjectViewModel> => {
    let data = await Careers.find()
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
  body: IAddCareersBodyModel,
  user: IPersonBaseModel
): Promise<IResponseObjectViewModel> => {
  try {
    const data = await Careers.create({
      name: body.name,
      description: body.description,
      createdBy: user._id,
      updateBy: user._id,
      slug : body.slug
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

export const editCareers = async (
  body: IAddCareersBodyModel,
  user: IPersonBaseModel,
  id: IObjectId
): Promise<IResponseObjectViewModel> => {
  try {
    const data = await Careers.findById({ _id: id });
    data.name = body.name;
    data.description = body.description;
    data.updateBy = user._id;
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
    const data = await Careers.findById(id);
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

export const upload = async (
  id: IObjectId,
  imageType: CategoryFileEnum,
  files: any,
  user: IPersonBaseModel
): Promise<IResponseObjectViewModel> => {
  try {
    const careers = await Careers.findById(id);

    const imagePath: string | null =
      (files.imagePath && files.imagePath[0].filename) || null;

    if (+imageType === CategoryFileEnum.image) {
      if (careers.imagePath) MediaServer.removeFile(careers.imagePath);
      careers.imagePath = imagePath;
    } else if (+imageType === CategoryFileEnum.webImage) {
      if (careers.webImagePath)
        MediaServer.removeFile(careers.webImagePath);
      careers.webImagePath = imagePath;
    }

    careers.updateBy = user._id;
    careers.save();
    return {
      success: true,
      data: null,
      message: "ok",
    };
  } catch (error) {
    throw error;
  }
};