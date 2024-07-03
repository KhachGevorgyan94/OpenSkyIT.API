import { IResumeViewModel } from "../../../schemas/resume/model"; 
import * as Helpers from "../../../helpers";

import { CompanyFileEnum, SortBy } from "../enums";

import {
  ICreateCompanyBodyModel,
  IGetAllCompaniesQueryModel,
} from "../models";
import {
  IResponseObjectViewModel,
  IPersonBaseModel,
  IObjectId,
} from "../../../helpers/models";

import Resume from "../../../schemas/resume";

export const createCompany = async (
  body: ICreateCompanyBodyModel,
  user: IPersonBaseModel
): Promise<IResponseObjectViewModel> => {
  try {
    const data = await Resume.create({
      name: body.name,
      phoneNumber: body.phoneNumber,
      email: body.email,
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

export const uploadCompanyImage = async (
  companyId: IObjectId,
  imageType: CompanyFileEnum,
  files: any
): Promise<IResponseObjectViewModel> => {
  console.log(files);
  
  try {
    const company: IResumeViewModel = await Resume.findById(companyId);
    const imagePath: string | null =
      (files.imagePath && files.imagePath[0].filename) || null;
    if (+imageType === CompanyFileEnum.coverPhoto) {
      company.imagePath = imagePath;
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
