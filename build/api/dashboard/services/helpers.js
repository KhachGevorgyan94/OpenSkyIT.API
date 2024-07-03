"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const order_1 = require("../../../helpers/enums/order");
exports.handlerAggregateOptions = (endDate, startDate) => {
    return [
        {
            '$addFields': {
                createdAt: {
                    $dateFromParts: {
                        year: { $year: '$createdAt' },
                        month: { $month: '$createdAt' },
                        day: { $dayOfMonth: '$createdAt' }
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
                status: { $in: [order_1.OrderStatusEnum.finished] }
            }
        },
        {
            $group: {
                _id: { date: '$dateRange' },
                count: { $sum: { $cond: [{ $eq: ['$dateRange', '$createdAt'] }, 1, 0] } }
            }
        },
        { $sort: { _id: 1 } },
        {
            $group: {
                _id: '$_id.date',
                total: { $sum: '$count' },
                byBrand: { $push: { v: { $sum: '$count' } } }
            }
        },
        {
            $project: {
                _id: 0,
                orderCreationDate: '$_id',
                ordersCount: '$total'
            }
        },
        { $sort: { orderCreationDate: 1 } },
    ];
};
exports.handlerAggregateOptionsForBest = (endDate, startDate) => {
    return [
        {
            $match: {
                'createdAt': { $gte: startDate, $lte: endDate }
            }
        },
        { $unwind: '$createdBy' },
        {
            $group: {
                _id: '$createdBy',
                count: { $sum: 1 }
            },
        },
        { $sort: { count: -1 } },
    ];
};
