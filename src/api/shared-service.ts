import User from "../schemas/user";
import SubscribedUser from "../schemas/subscribedUsers";
import Company from "../schemas/course";
import { IUsersFilterModel, ICompanyFilterModel, ISubscribedUsersFilterModel } from "../helpers/models";
import { SchemaStatusEnum } from "../helpers/enums";

export const subscribedUsersFilter = (body: ISubscribedUsersFilterModel) => {
  const users = SubscribedUser.find();

  if (body.email) {
    body.email = body.email
      .replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, "")
      .trim();
    users.where({ email: new RegExp(body.email, "i") });
  }

  if (body.registrationDateStart) {
    users.where({ createdAt: { $gte: body.registrationDateStart } });
  }

  if (body.registrationDateEnd) {
    users.where({ createdAt: { $lte: body.registrationDateEnd } });
  }

  return users;
};

export const usersFilter = (body: IUsersFilterModel) => {
  const users = User.find();

  if (body.blocked !== null) users.where({ blocked: body.blocked });

  if (body.activityFromDate)
    users.where({ updatedAt: { $gte: body.activityFromDate } });
  if (body.activityToDate)
    users.where({ updatedAt: { $lte: body.activityToDate } });

  if (body.email) {
    body.email = body.email
      .replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, "")
      .trim();
    users.where({ email: new RegExp(body.email, "i") });
  }

  if (body.phone) {
    body.phone = body.phone
      .replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, "")
      .trim();
    users.where({ phone: new RegExp(body.phone, "i") });
  }

  if (body.firstName) {
    body.firstName = body.firstName
      .replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, "")
      .trim();
    users.where({ firstName: new RegExp(body.firstName, "i") });
  }

  if (body.lastName) {
    body.lastName = body.lastName
      .replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, "")
      .trim();
    users.where({ lastName: new RegExp(body.lastName, "i") });
  }

  if (body.registrationDateStart) {
    users.where({ createdAt: { $gte: body.registrationDateStart } });
  }

  if (body.registrationDateEnd) {
    users.where({ createdAt: { $lte: body.registrationDateEnd } });
  }

  // if (body.emails.length || body.phones.length) {
  //   const query = [];

  //   if (body.emails.length) {
  //     body.emails = body.emails.map((item: any) => {
  //       item = item.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '').trim();
  //       item = new RegExp(item, 'i');
  //       return item;
  //     });
  //     query.push({ email: { $in: body.emails } });
  //   }

  //   if (body.phones.length) {
  //     body.phones = body.phones.map((item: any) => {
  //       item = item.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '').trim();
  //       item = new RegExp(item, 'i');
  //       return item;
  //     });
  //     query.push({ phone: { $in: body.phones } });
  //   }

  //   users.where({ $or: query });
  // }

  return users;
};

export const companyFilter = (body: ICompanyFilterModel) => {
  const companies = Company.find().where({
    status: { $ne: SchemaStatusEnum.deleted },
  });

  if (body.status) companies.where({ status: { $in: body.status } });
  if (body.mainCategories && body.mainCategories.length)
    companies.where({ mainCategories: { $in: body.mainCategories } });
  if (body.count) companies.limit(body.count);
  if (body.name) {
    body.name = body.name
      .replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, "")
      .trim();
    if (body.description) {
      body.description = body.description
        .replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, "")
        .trim();
    }
    companies.where({
      $or: [
        { "name.hy": new RegExp(body.name, "i") },
        { "name.ru": new RegExp(body.name, "i") },
        { "name.en": new RegExp(body.name, "i") },
        { "description.hy": new RegExp(body.description, "i") },
        { "description.ru": new RegExp(body.description, "i") },
        { "description.en": new RegExp(body.description, "i") },
        { tags: new RegExp(body.name, "i") },
        { tags: new RegExp(body.description, "i") },
      ],
    });
  }
  return companies;
};
