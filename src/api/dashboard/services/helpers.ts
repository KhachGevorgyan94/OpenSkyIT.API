import { OrderStatusEnum } from "../../../helpers/enums/order";

export const handlerAggregateOptions = (endDate: Date, startDate: Date): Array<any> => {
  return [
    {
      '$addFields': {
        createdAt: {
          $dateFromParts: {
            year  : { $year: '$createdAt' },
            month : { $month: '$createdAt' },
            day   : { $dayOfMonth: '$createdAt' }
          }
        },
        dateRange: {
          $map: {
            input: {
              $range: [
                0,
                { $subtract: [endDate, startDate] },
                1000 * 60 * 60 * 24
              ]
            },
            in: { $add: [startDate, '$$this'] }
          }
        }
      }
    },
    { $unwind: '$dateRange' },
    {
      $match: {
        status: { $in: [  OrderStatusEnum.finished ] }
      }
    },
    {
      $group: {
        _id   : { date: '$dateRange' },
        count : { $sum: { $cond: [{ $eq: ['$dateRange', '$createdAt'] }, 1, 0] } }
      }
    },
    { $sort: { _id: 1 } },
    {
      $group: {
        _id     : '$_id.date',
        total   : { $sum: '$count' },
        byBrand : { $push: { v: { $sum: '$count' } } }
      }
    },
    {
      $project: {
        _id               : 0,
        orderCreationDate : '$_id',
        ordersCount       : '$total'
      }
    },
    { $sort: { orderCreationDate: 1 } },
  ];
};

export const handlerAggregateOptionsForBest = (endDate: Date, startDate: Date): Array<any> => {
  return [
    {
      $match: {
        'createdAt': { $gte: startDate, $lte: endDate }
      }
    },
    { $unwind: '$createdBy' },
    {
      $group : {
        _id   : '$createdBy',
        count : { $sum : 1 }
      },
    },
    { $sort: { count: -1 } },
  ];
};