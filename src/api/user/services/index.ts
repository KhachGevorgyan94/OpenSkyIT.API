import { handlerUsersExcelFile } from './../../excel-service';
import {  generateExport } from "./../../../helpers/services/pdf";
import { usersFilter } from "./../../shared-service";
import { ICreateCV, IGetUsersBodyModel } from "./../models/index";
import { IResponseObjectViewModel } from "../../../helpers/models";
import {
  sendVerification,
  sendAppliement,
  sendHybrid,
  sendEmailUser,
  sendFDA,
} from "../../../helpers/services/mailer";
import * as fs from "fs";
import { ICreateUser } from "../models";
import User from "../../../schemas/user";
import * as Helper from "../../../helpers";
import config from "../../../config";

export const myApi = async (data: {
  lesson: string;
  phone: string;
  name: string;
  email: string;
}): Promise<IResponseObjectViewModel> => {
  try {
    sendVerification(data.name, data.phone, data.lesson, data.email);
    return {
      success: true,
      data: data,
      message: "Successfully created",
    };
  } catch (error) {
    throw error;
  }
};

export const downloadExcelFile = async (body: IGetUsersBodyModel): Promise<IResponseObjectViewModel> => {
  try {
    const createUsersExcel = await handlerUsersExcelFile(body);
    return {
      success: true,
      data: createUsersExcel,
      message: 'Successfully'
    };
  } catch (error) {
    throw error;
  }
};

export const sendEmailToUser = async (data: {
  lesson: string;
  phone: string;
  name: string;
  email: string;
}): Promise<IResponseObjectViewModel> => {
  try {
    sendEmailUser(data.name, data.phone, data.lesson, data.email);
    return {
      success: true,
      data: data,
      message: "Successfully created",
    };
  } catch (error) {
    throw error;
  }
};

export const createCV = async (
  data: ICreateCV
): Promise<IResponseObjectViewModel> => {
  try {
    console.log('11111111111')
    const path = await generateExport(data);
    // generateCVHtml(data);
    return {
      success: true,
      data: path,
      message: "Successfully created",
    };
  } catch (error) {
    throw error;
  }
};

export const instaServiceApply = async (data: {
  name: string;
  phoneNumber: string;
  city: string;
  companyName: string;
  category: string;
  comment: string;
}): Promise<IResponseObjectViewModel> => {
  try {
    sendAppliement(
      data.name,
      data.phoneNumber,
      data.city,
      data.comment,
      data.category,
      data.companyName
    );
    return {
      success: true,
      data: data,
      message: "Successfully created",
    };
  } catch (error) {
    throw error;
  }
};

export const applyHybrid = async (data: {
  name: string;
  email: string;
  message: string;
}): Promise<IResponseObjectViewModel> => {
  try {
    sendHybrid(data.name, data.email, data.message);
    return {
      success: true,
      data: data,
      message: "Successfully created",
    };
  } catch (error) {
    throw error;
  }
};

export const fda = async (data: {
  name: string;
  email: string;
  message: string;
}): Promise<IResponseObjectViewModel> => {
  try {
    sendFDA(data.name, data.email, data.message);
    return {
      success: true,
      data: data,
      message: "Successfully created",
    };
  } catch (error) {
    throw error;
  }
};

export const createUser = async (
  data: ICreateUser
): Promise<IResponseObjectViewModel> => {
  try {
    if (data.phone[0] === "+")
      data.phone = data.phone.slice(1, data.phone.length);
    const user = await new User({
      firstName: data.name,
      email: data.email,
      phone: data.phone,
      lesson: data.lesson,
    }).save();

    return {
      success: true,
      data: null,
      message: "Successfully created",
    };
  } catch (error) {
    throw error;
  }
};

export const sendResume = async (
  files: any
): Promise<IResponseObjectViewModel> => {
  try {
    console.log(files);
    
    return {
      success: true,
      data: null,
      message: "Successfully created",
    };
  } catch (error) {
    throw error;
  }
};


export const getListWithPaging = async (
  body: IGetUsersBodyModel
): Promise<IResponseObjectViewModel> => {
  try {
    const users = usersFilter(body)
      .where({ deleted: false })
      .sort({ createdAt: -1 })
      .select({
        deleted: 0,
        password: 0,
        addresses: 0,
        __v: 0,
        forgotKey: 0,
      })
      .lean();

    const data = await Helper.pagination(body, users);

    return {
      success: true,
      data: data,
      message: "ok",
    };
  } catch (error) {
    throw error;
  }
};
