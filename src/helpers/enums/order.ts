export enum TakeOrderStatusEnum {
  pending = 1,
  start,
  arrived,
  finish,
}

export enum TakeOrderStatusViewEnum {
  pending = TakeOrderStatusEnum.pending,
  'started his trip to',
  'arrived to',
  'finished',
}

export enum DriverNotificationTypeEnum {
  global = 1,
  newOrder,
  changeOrder,
  cancelOrder
}

export enum UserNotificationTypeEnum {
  global = 1,
  newPromoCode,
  acceptedOrder,
  startOrder,
  driverOnTheWay,
  driverArrived,
  finishOrder,
  canceled,
  newMessage,
  newBalance
}

export enum OrderStatusEnum {
  canceled = 1,
  notTaken = 2,
  operatorAccept = 3,
  userAccept = 4,
  operatorFinish = 5,
  dispatcherAccept = 6,
  driverAttached = 7,
  driverAccept = 8,
  inProgress = 9,
  shipped = 10,
  delivered = 11,
  finished = 12,
  createdProgress
}

export enum OrderStatusViewEnum {
  'Canceled' = OrderStatusEnum.canceled,
  'New order',
  'Operator Accept',
  'Manage Branches',
  'Operator Finish',
  'Dispatcher Accept',
  'Driver Attached',
  'Driver Accept',
  'In Progress',
  'On The Way',
  'Delivered',
  'Finished',
}

export enum UserOrderStatusEnum {
  canceled = 1,
  finished = 13,
}

export enum DriverOrderStatusEnum {
  notTaken = 7,
  accept = 8,
  start = 9,
  shipped = 10,
  delivered = 11,
  finish = 12,
}

export enum PaymentMethod {
  cash = 1,
  ameria,
  iDram,
  partner
}

export enum PaymentMethodViewEnum {
  'Cash' = PaymentMethod.cash,
  'Ameria' = PaymentMethod.ameria,
  'iDram' = PaymentMethod.iDram,
  'Partner' = PaymentMethod.partner
}

export enum OrderTypeEnum {
  ourOrder = 1,
  companyOrder,
}

export enum OrderTypeViewEnum {
  'Our order (MP)' = OrderTypeEnum.ourOrder,
  'Company order (RP)' = OrderTypeEnum.companyOrder,
}


export enum OrderCounterTypeEnum {
  percentage = 1,
  static,
}

export enum CreditPaymentMethodEnum {
  ameria = 1
}

export enum PaidStatusEnum {
  paid = 1,
  notPaid
}