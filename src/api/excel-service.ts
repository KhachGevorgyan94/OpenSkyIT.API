import { IUser } from "./../schemas/user/model";
import * as fs from "fs";
import * as xlsx from "xlsx";

import Config from "../config";
import { getShortDate } from "../helpers";

import {
  ISubscribedUsersFilterModel,
  IUsersFilterModel,
} from "../helpers/models";
import { subscribedUsersFilter, usersFilter } from "./shared-service";

function emptyDir(path: fs.PathLike) {
  try {
    const files = fs.readdirSync(path);
    if (files.length > 0) {
      for (let i = 0; i < files.length; i++) {
        const filePath = path + "/" + files[i];
        if (fs.statSync(filePath).isFile()) {
          fs.unlinkSync(filePath);
        }
      }
    }
  } catch (e) {
    return;
  }
}

const usersTitleRow: string[] = ["Name", "Phone", "Email", "Registration Date"];

export const handlerUsersExcelFile = async (
  filter: IUsersFilterModel = null
) => {
  if (!fs.existsSync(`${Config.mediaPath}files`)) {
    fs.mkdirSync(`${Config.mediaPath}files`);
  }
  emptyDir(`${Config.mediaPath}files`);

  const wb = xlsx.utils.book_new();

  wb.Props = {
    Title: "User list",
    Subject: "Users",
    Author: "Open Sky IT-School",
    CreatedDate: new Date(),
  };

  wb.SheetNames.push("Users");
  const requestedRows = await createUsersList(filter);

  const requestedWS = xlsx.utils.aoa_to_sheet(requestedRows);
  wb.Sheets.Users = requestedWS;

  // Excel file name
  const requestedPath: string = "users.xlsx";

  xlsx.writeFile(wb, `${Config.mediaPath}files/${requestedPath}`);
  return `Files/${requestedPath}`;
};

const createUsersList = async (
  filter: IUsersFilterModel
): Promise<Array<Array<string | number>>> => {
  const rows: Array<Array<string | number>> = [usersTitleRow];

  const users: Array<IUser> = await usersFilter(filter)
    .where({ deleted: false })
    .sort({ createdAt: -1 })
    .select({
      updatedAt: 0,
      deleted: 0,
      password: 0,
      __v: 0,
      forgotKey: 0,
    })
    .lean();

  users.forEach((x) => {
    const row = [
      `${x.firstName} ${x.lastName}`,
      x.phone,
      x.email,
      x.createdAt ? getShortDate(x.createdAt) : "-",
    ];
    rows.push(row);
  });

  return rows;
};

const subscribedUsersTitleRow: string[] = ["Email", "Registration Date"];

export const handlerSubscribedUsersExcelFile = async (
  filter: ISubscribedUsersFilterModel = null
) => {
  if (!fs.existsSync(`${Config.mediaPath}files`)) {
    fs.mkdirSync(`${Config.mediaPath}files`);
  }
  emptyDir(`${Config.mediaPath}files`);

  const wb = xlsx.utils.book_new();

  wb.Props = {
    Title: "Subscribers list",
    Subject: "Subscribed Users",
    Author: "Open Sky IT-School",
    CreatedDate: new Date(),
  };

  wb.SheetNames.push("Subscribers");
  const requestedRows = await createSubscribeUsersList(filter);

  const requestedWS = xlsx.utils.aoa_to_sheet(requestedRows);
  wb.Sheets.Subscribers = requestedWS;

  // Excel file name
  const requestedPath: string = "subscribers.xlsx";

  xlsx.writeFile(wb, `${Config.mediaPath}files/${requestedPath}`);
  return `Files/${requestedPath}`;
};

const createSubscribeUsersList = async (
  filter: ISubscribedUsersFilterModel
): Promise<Array<Array<string | number>>> => {
  const rows: Array<Array<string | number>> = [subscribedUsersTitleRow];

  const users: Array<IUser> = await subscribedUsersFilter(filter)
    .sort({ createdAt: -1 })
    .select({
      updatedAt: 0,
      deleted: 0,
      password: 0,
      __v: 0,
      forgotKey: 0,
    })
    .lean();

  users.forEach((x) => {
    const row = [
      x.email,
      x.createdAt ? getShortDate(x.createdAt) : "-",
    ];
    rows.push(row);
  });

  return rows;
};