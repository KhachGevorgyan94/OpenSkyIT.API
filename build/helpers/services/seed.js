"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.runSeed = () => __awaiter(void 0, void 0, void 0, function* () {
    // setTimeout(async () => {
    //   console.log('SEED START ***********************************************************************');
    //   const companies = await CompanyRating
    //   .find()
    //   // .where({ company : '5bbdf334e534351df2bb33fe' })
    //   .where({ company : '5bbdf2fae534351df2bb33fd' });
    //   companies.forEach(x => {
    //       x.rating = 5;
    //       x.save();
    //   });
    //   console.log(companies);
    //   .populate('balance')
    //   .populate({
    //     path: 'transactionFrom',
    //     match: {
    //       type: TransactionTypeEnum.driverToPlatform
    //     },
    //     select: {
    //       createdAt: 1,
    //       totalPrice: 1,
    //     },
    //   })
    //   .populate({
    //     path: 'transactionTo',
    //     match: {
    //       type: TransactionTypeEnum.platformToDriver
    //     },
    //     select: {
    //       createdAt: 1,
    //       totalPrice: 1
    //     }
    //   })
    //   .populate({
    //     path: 'orders',
    //     match: {
    //       status: OrderStatusEnum.finished
    //     },
    //     select: {
    //       totalPrice: 1,
    //       usedBalance: 1,
    //       paymentMethod: 1,
    //       discountPrice: 1,
    //       createdAt: 1,
    //       status: 1,
    //     }
    //   });
    //    drivers.map(async   (item: any) => {
    //       item.balance.noChangeDebt = 0;
    //       item.balance.todayBalance = 0;
    //       item.balance.salary = 0;
    //       item.balance.debt = 0;
    //       item.balance.companyDebt = 0;
    //       item.balance.totalOrderPrice = 0;
    //       item.balance.cash = 0;
    //       item.balance.online = 0;
    //       item.balance.other = 0;
    //       item.balance.orderUsedBalance = 0;
    //       item.balance.petrol = 0;
    //       item.balance.orderCount = 0;
    //       item.balance.promoCode = 0;
    //       item.balance.totalDebt = 0;
    //       item.balance.cashOut = 0;
    //       item.transactionFrom.forEach((from: any) => {
    //         item.balance.cashOut += from.totalPrice;
    //       });
    //       item.transactionTo.forEach((to: any) => {
    //         item.balance.companyDebt += to.totalPrice;
    //       });
    //       item.orders.forEach((orders: any) => {
    //         if (orders.paymentMethod === PaymentMethod.ameria || orders.paymentMethod === PaymentMethod.iDram || orders.paymentMethod === PaymentMethod.partner && orders.status === OrderStatusEnum.finished) {
    //           item.balance.online += orders.discountPrice ? orders.discountPrice : orders.totalPrice;
    //         } else if (orders.status === OrderStatusEnum.finished) {
    //           item.balance.cash += orders.discountPrice || orders.totalPrice;
    //         }
    //         item.balance.totalOrderPrice += orders.totalPrice;
    //         item.balance.discountPrice += orders.discountPrice;
    //         item.balance.orderUsedBalance += orders.usedBalance;
    //         item.balance.promoCode += orders.discountPrice ? orders.totalPrice - orders.discountPrice - orders.usedBalance : 0;
    //       });
    //       item.balance.orderCount = item.orders.length || 0;
    //       item.balance.totalDebt = item.balance.cash + item.balance.companyDebt + item.balance.other - item.balance.cashOut;
    //       item.balance.noChangeDebt = item.balance.totalDebt;
    //       await item.balance.save();
    //   });
    // console.log('SEED FINISH ***********************************************************************');
    // Admin.create({
    //   firstName : 'Areg',
    //   lastName  : 'Nikoghosyan',
    //   email     : 'admin@gmail.com',
    //   password  : '135246asd',
    //   phone     : '135246asd',
    //   role      : UserRole.admin,
    // });
    // await new Settings({
    //   homeBanner : []
    // }).save();
    //   const users = await User
    //     .find()
    //     .where({ deleted: false })
    //     // .where({ phone: '096151311' })
    //     .select({
    //       _id: 1,
    //       totalOrdersPrice: 1,
    //       ordersCount: 1,
    //       canceledOrdersCount: 1,
    //       finishedOrdersCount: 1,
    //       phone: 1,
    //     })
    //     .populate({
    //       path: 'orders',
    //       select: {
    //         _id: 1,
    //         status: 1,
    //         totalPrice: 1
    //       }
    //     });
    //   await Promise.all(users.map(x => {
    //     x.totalOrdersPrice = 0;
    //     x.ordersCount = x.orders.length;
    //     x.canceledOrdersCount = 0;
    //     x.finishedOrdersCount = 0;
    //     x.orders.forEach(y => {
    //       if (y.status === OrderStatusEnum.canceled) {
    //         x.canceledOrdersCount++;
    //       } else if (y.status === OrderStatusEnum.finished) {
    //         x.finishedOrdersCount++;
    //         x.totalOrdersPrice += (+y.totalPrice) || 0;
    //       }
    //     });
    //     return x.save();
    //   }));
    //   console.timeEnd('Seed');
    //   console.log('Seed finished');
    // }, 10000);
    // const u = await User.find({});
    // u.forEach(async (user, index) => {
    //   const finishedCount = await Order.find({ createdBy: user._id, status: OrderStatusEnum.finished }).countDocuments();
    //   user.finishedOrdersCount = finishedCount;
    //   // const canceledCount = await Order.find({ createdBy: user._id, status: OrderStatusEnum.inProgress }).countDocuments();
    //   // user.canceledOrdersCount = canceledCount;
    //   // user.ordersCount = finishedCount + canceledCount;
    //   // console.log(finishedCount, user.phone, index);
    //   await user.save();
    // });
});
