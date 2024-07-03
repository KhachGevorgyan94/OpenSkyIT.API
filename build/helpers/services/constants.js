"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const objHandler = {
    get: (target, name) => {
        return target.hasOwnProperty(name) ? target[name] : target.hy;
    }
};
exports.CENTER_PRICE = 600;
exports.OUT_CENTER_PRICE = 800;
exports.YEREVAN_PRICE = 1000;
exports.verificationCodeLength = 4;
exports.errorIncorrectLogin = new Proxy({
    hy: 'Էլ. հասցեն կամ գաղտնաբառը սխալ են մուտք արված',
    ru: 'Эл. почта или пароль введены неправильно',
    en: 'Email or Password is entered wrong',
}, objHandler);
exports.errorIncorrectPassword = new Proxy({
    hy: 'Հին գաղտնաբառը սխալ է մուտք արված',
    ru: 'Старый пароль введен неправильно',
    en: 'Invalid old password',
}, objHandler);
exports.errorDoesNotMatchPassword = new Proxy({
    hy: 'Գաղտնաբառը չի համապատասխանում հաստատվող գաղտնաբառին',
    ru: 'Пароль не совпадает с подтверждением пароля',
    en: 'Password does not match the confirm password',
}, objHandler);
exports.errorWrongPassword = new Proxy({
    hy: 'Սխալ գաղտնաբառ',
    ru: 'Неправильный пароль',
    en: 'Wrong Password',
}, objHandler);
exports.errorEmailExist = new Proxy({
    hy: 'Էլ. հասցեն արդեն գոյություն ունի',
    ru: 'Эл. почта уже существует',
    en: 'Email is already exist',
}, objHandler);
exports.errorInvalidEmail = new Proxy({
    hy: 'Էլ. հասցեն սխալ է',
    ru: 'Неверный адрес электронной почты',
    en: 'Invalid email address',
}, objHandler);
exports.errorPersonNotFound = new Proxy({
    hy: 'Օգտատերը չի գտնվել',
    ru: 'Пользователь не найден',
    en: 'User not found',
}, objHandler);
exports.errorPhoneExist = new Proxy({
    hy: 'Տվյալ հեռախոսահամարը արդեն գոյություն ունի',
    ru: 'Номер телефона уже существует',
    en: 'Phone number already exists',
}, objHandler);
exports.errorPhoneInvalid = new Proxy({
    hy: 'Սխալ հեռախոսահամար',
    ru: 'Неправильный номер телефона',
    en: 'Invalid phone number',
}, objHandler);
exports.errorPromoCode = new Proxy({
    en: 'Promo code not found',
    hy: 'Պրոմո կոդը սխալ է',
    ru: 'Промо-код не существует'
}, objHandler);
exports.errorCheckOrderPaidStatus = new Proxy({
    en: 'Payment failed',
    hy: 'Վճարումը ձախողվեց',
    ru: 'Платеж не осуществился'
}, objHandler);
exports.errorPromoCodeCheckPrice = new Proxy({
    en: 'Price does not match.',
    hy: 'Գինը չի համապատասխանում:',
    ru: 'Цена не соответствует.',
}, objHandler);
exports.errorPartnerMember = new Proxy({
    en: 'Not a corporate partner member.',
    hy: 'Կորպորատիվ գործընկերոջ անդամ չէ:',
    ru: 'Не корпоративный партнер.',
}, objHandler);
exports.errorClosedCompany = new Proxy({
    en: 'Company is closed.',
    hy: 'Ընկերությունը փակ է:',
    ru: 'Компания закрыта.',
}, objHandler);
exports.errorBlockedUser = new Proxy({
    en: 'User is blocked.',
    hy: 'Օգտատերը արգելափակված է:',
    ru: 'Пользователь заблокирован.',
}, objHandler);
exports.errorOutOfRegion = new Proxy({
    en: 'It is not possible to place an order, as the restaurant is 20 km away.',
    hy: 'Հնարավոր չէ կատարել պատվերը, քանի որ ռեստորանը գտնվում է 20 կմ-ից հեռու:',
    ru: 'Невозможно сделать заказ, так как ресторан находится в 20 км.',
}, objHandler);
exports.errorPrice2000 = new Proxy({
    en: 'Price must not be lower than 2000 dram.',
    hy: 'Պատվերի արժեքը պետք է լինի առնվազն 2000 դրամ:',
    ru: 'Цена должна быть равна или больше 2000 др.',
}, objHandler);
exports.errorProductCheck = new Proxy({
    en: 'You can not pay the order because it contains medication.',
    hy: 'Դուք չեք կարող վճարել պատվերը, քանի որ այն պարունակում է դեղորայք:',
    ru: 'Вы не можете оплатить заказ из за наличия в нем медикаментов.',
}, objHandler);
exports.errorCheckPromoCode = new Proxy({
    en: 'The promo-code has been already used.',
    hy: 'Պրոմո-կոդը արդեն օգտագործվել է:',
    ru: 'Промо-код уже был использован.',
}, objHandler);
exports.errorVCRequired = new Proxy({
    hy: 'Հաստատման կոդը պարտադիր է',
    ru: 'Проверочный код обязательное поле',
    en: 'Verification code is required',
}, objHandler);
exports.errorVCInvalid = new Proxy({
    hy: 'Ստուգման կոդ սխալ է',
    ru: 'Неверный код подтверждения',
    en: 'Invalid verification code',
}, objHandler);
exports.errorFirstNameInvalid = new Proxy({
    hy: 'Անունը սխալ է մուտքագրված',
    ru: 'Неверное имя',
    en: 'Invalid first name',
}, objHandler);
exports.errorLastNameInvalid = new Proxy({
    hy: 'Ազգանունը սխալ է մուտքագրված',
    ru: 'Неверная фамилия',
    en: 'Invalid last name',
}, objHandler);
exports.orderChatMessageTemplate = new Proxy({
    hy: 'Բարև։ Ինչո՞վ կարող ենք օգնել։',
    ru: 'Здравствуйте. Как мы можем помочь?',
    en: 'Hello. How Can We Help?',
}, objHandler);
exports.supportChatMessageTemplate = new Proxy({
    hy: 'Բարև։ Ինչո՞վ կարող ենք օգնել։',
    ru: 'Здравствуйте. Как мы можем помочь?',
    en: 'Hello. How Can We Help?',
}, objHandler);
