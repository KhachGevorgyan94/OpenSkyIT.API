import { OrderStatusEnum } from '../../../helpers/enums/order';

export interface IEditOrderStatusMinutesBodyModel {
  minutes: number;
  status: OrderStatusEnum;
  firstDeliveryFee: number;
  eachNextDeliveryFee: number;
}

export interface IEditOrderDeliveryTariff {
  tariff: number;
}

export interface IAddSettingsInfoBodyModel {
  title: string;
  description : string;
}
