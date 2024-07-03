import { SortBy } from '../enums';
import { IBranch } from '../../../schemas/branch/model';
import { ICompany } from '../../../schemas/course/model';
import { SchemaStatusEnum } from '../../../helpers/enums';
import * as Helpers from '../../../helpers';
import Branch from '../../../schemas/branch';
import { IGetCompaniesQueryBaseModel } from '../models';

export const getSortByOption = (sort: SortBy): Object => {
  switch (sort) {
    case SortBy.opening:
      return { isClosed: 1 };
    case SortBy.position:
      return { positionList: 1 };
    default:
      return { positionList: 1 };
  }
};

/**
 * Todays day of the week
 */
export const getWeekDay = (): number => {
  const date = new Date();
  return date.getDay() - 1;
};

export const getNearestBranches = async(query: IGetCompaniesQueryBaseModel) => {
  let branches: IBranch<ICompany>[] = await Branch.find()
    .where({ status : SchemaStatusEnum.published })
    .populate('mainCompany', 'mainCategories categories status')
    .select({
      mainCompany : 1,
      latitude    : 1,
      longitude   : 1,
      nearest     : 1
    })
    .lean();

  branches = branches
    .filter(x =>
      x.mainCompany.status === SchemaStatusEnum.published 
    )
    .map(x => {
      return <any>{
        ...x,
        distance: Helpers.getDistance({
          latitude: +query.latitude,
          longitude: +query.longitude,
        },
        {
          latitude: x.latitude,
          longitude: x.longitude,
        }),
      };
    })
    .sort((a, b) => a.distance - b.distance);

  const nearestBranches: IBranch<ICompany>[] = [];

  branches.forEach(x => {
    if (!nearestBranches.some(y => y.mainCompany._id.toString() === x.mainCompany._id.toString())) {
      nearestBranches.push(x);
    }
  });

  return nearestBranches;
};

export const getCompanyNearestBranch = async(data: { companyId: string, lat: number, lng: number }) => {
  let branches: IBranch<ICompany>[] = await Branch.find()
    .where({ mainCompany : data.companyId })
    .where({ status : SchemaStatusEnum.published })
    .lean();

  branches = branches
    .map(x => {
      return <any>{
        ...x,
        distance: Helpers.getDistance({
          latitude: +data.lat,
          longitude: +data.lng,
        },
        {
          latitude: x.latitude,
          longitude: x.longitude,
        }),
      };
    })
    .sort((a, b) => a.distance - b.distance);

  return branches[0];
};

export const arrayMove = (arr: any[], oldIndex: number, newIndex: number) => {
  arr.splice(newIndex, 0, arr.splice(oldIndex, 1)[0]);
  return arr;
};