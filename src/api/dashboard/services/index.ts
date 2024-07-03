import { IOrderCountFilter } from '../models';
import { IResponseObjectViewModel } from '../../../helpers/models';

import User from '../../../schemas/user';

//#endregion

export const newUsersCount = async (body: IOrderCountFilter): Promise<IResponseObjectViewModel> => {
  try {
    const users = User.find()
      .where({ deleted: false });

    if (body.dateFrom) {
      users.where({ createdAt: { $gte: body.dateFrom } });
    }

    if (body.dateTo) {
      users.where({ createdAt: { $lte: body.dateTo } });
    }

    const usersCount: number = await users.countDocuments();
    return {
      success: true,
      data: usersCount,
      message: 'ok'
    };
  } catch (error) { throw error; }
};

