import { IGetSubscribedUsersBodyModel, ISubscribe } from "./../models/index";
import { IResponseObjectViewModel } from "../../../helpers/models";
import SubscribedUser from "../../../schemas/subscribedUsers";
import * as Helper from "../../../helpers";
import { subscribedUsersFilter } from "./../../shared-service";
import { handlerSubscribedUsersExcelFile } from "../../excel-service";

export const subscribe = async (
  data: ISubscribe
): Promise<IResponseObjectViewModel> => {
  try {
    const alreadySubscribed = await SubscribedUser.findOne({
      $or: [{ email: data.email }],
    });
    if (!alreadySubscribed) {
      if (data.email)
        await new SubscribedUser({
          email: data.email,
        }).save();
      return {
        success: true,
        data: null,
        message: "Դուք հաջողությամբ բաժանորդագրվել եք",
      };
    } else {
      return {
        success: false,
        data: null,
        message: "Դուք արդեն բաժանորդագրված եք",
      };
    }
  } catch (error) {
    throw error;
  }
};

export const getListWithPaging = async (
  body: IGetSubscribedUsersBodyModel
): Promise<IResponseObjectViewModel> => {
  try {
    const users = subscribedUsersFilter(body)
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

export const downloadExcelFile = async (
  body: IGetSubscribedUsersBodyModel
): Promise<IResponseObjectViewModel> => {
  try {
    const createUsersExcel = await handlerSubscribedUsersExcelFile(body);
    return {
      success: true,
      data: createUsersExcel,
      message: "Successfully",
    };
  } catch (error) {
    throw error;
  }
};
