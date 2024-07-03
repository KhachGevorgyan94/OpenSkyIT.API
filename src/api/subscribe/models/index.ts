import { IPaginationReqViewModel, ISubscribedUsersFilterModel } from "../../../helpers/models";

export interface ISubscribe {
  email: string;
}

export interface IGetSubscribedUsersBodyModel extends IPaginationReqViewModel, ISubscribedUsersFilterModel {

}