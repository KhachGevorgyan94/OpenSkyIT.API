import { MonthEnum } from '../../../helpers/enums';

export interface ICreateDevice {
  token: string;
  osType: string;
  deviceId: string;
  language: string;
  userId?: string;
}

export interface IChangeLanguage {
  code: string;
  deviceId: string;
}

export interface IOrderCountFilter {
  dateFrom: Date;
  dateTo: Date;
}

export interface IGetMonthDaysModel {
  month: MonthEnum;
}