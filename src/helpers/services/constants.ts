const objHandler = {
  get: (target, name) => {
    return target.hasOwnProperty(name) ? target[name] : target.hy;
  }
};

export const CENTER_PRICE = 600;
export const OUT_CENTER_PRICE = 800;
export const YEREVAN_PRICE = 1000;

export const verificationCodeLength = 4;

export const errorIncorrectLogin = new Proxy({
  hy: 'Էլ. հասցեն կամ գաղտնաբառը սխալ են մուտք արված',
  ru: 'Эл. почта или пароль введены неправильно',
  en: 'Email or Password is entered wrong',
}, objHandler);

export const errorIncorrectPassword = new Proxy({
  hy: 'Հին գաղտնաբառը սխալ է մուտք արված',
  ru: 'Старый пароль введен неправильно',
  en: 'Invalid old password',
}, objHandler);

export const errorDoesNotMatchPassword = new Proxy({
  hy: 'Գաղտնաբառը չի համապատասխանում հաստատվող գաղտնաբառին',
  ru: 'Пароль не совпадает с подтверждением пароля',
  en: 'Password does not match the confirm password',
}, objHandler);

export const errorWrongPassword = new Proxy({
  hy: 'Սխալ գաղտնաբառ',
  ru: 'Неправильный пароль',
  en: 'Wrong Password',
}, objHandler);

export const errorEmailExist = new Proxy({
  hy: 'Էլ. հասցեն արդեն գոյություն ունի',
  ru: 'Эл. почта уже существует',
  en: 'Email is already exist',
}, objHandler);

export const errorInvalidEmail = new Proxy({
  hy: 'Էլ. հասցեն սխալ է',
  ru: 'Неверный адрес электронной почты',
  en: 'Invalid email address',
}, objHandler);

export const errorPersonNotFound = new Proxy({
  hy: 'Օգտատերը չի գտնվել',
  ru: 'Пользователь не найден',
  en: 'User not found',
}, objHandler);

export const errorPhoneExist = new Proxy({
  hy: 'Տվյալ հեռախոսահամարը արդեն գոյություն ունի',
  ru: 'Номер телефона уже существует',
  en: 'Phone number already exists',
}, objHandler);

export const errorPhoneInvalid = new Proxy({
  hy: 'Սխալ հեռախոսահամար',
  ru: 'Неправильный номер телефона',
  en: 'Invalid phone number',
}, objHandler);

export const errorPromoCode = new Proxy({
  en: 'Promo code not found',
  hy: 'Պրոմո կոդը սխալ է',
  ru: 'Промо-код не существует'
}, objHandler);

export const errorCheckOrderPaidStatus = new Proxy({
  en: 'Payment failed',
  hy: 'Վճարումը ձախողվեց',
  ru: 'Платеж не осуществился'
}, objHandler);

export const errorPromoCodeCheckPrice = new Proxy({
  en: 'Price does not match.',
  hy: 'Գինը չի համապատասխանում:',
  ru: 'Цена не соответствует.',
}, objHandler);

export const errorPartnerMember = new Proxy({
  en: 'Not a corporate partner member.',
  hy: 'Կորպորատիվ գործընկերոջ անդամ չէ:',
  ru: 'Не корпоративный партнер.',
}, objHandler);

export const errorClosedCompany = new Proxy({
  en: 'Company is closed.',
  hy: 'Ընկերությունը փակ է:',
  ru: 'Компания закрыта.',
}, objHandler);

export const errorBlockedUser = new Proxy({
  en: 'User is blocked.',
  hy: 'Օգտատերը արգելափակված է:',
  ru: 'Пользователь заблокирован.',
}, objHandler);

export const errorOutOfRegion = new Proxy({
  en: 'It is not possible to place an order, as the restaurant is 20 km away.',
  hy: 'Հնարավոր չէ կատարել պատվերը, քանի որ ռեստորանը գտնվում է 20 կմ-ից հեռու:',
  ru: 'Невозможно сделать заказ, так как ресторан находится в 20 км.',
}, objHandler);

export const errorPrice2000 = new Proxy({
  en: 'Price must not be lower than 2000 dram.',
  hy: 'Պատվերի արժեքը պետք է լինի առնվազն 2000 դրամ:',
  ru: 'Цена должна быть равна или больше 2000 др.',
}, objHandler);

export const errorProductCheck = new Proxy({
  en: 'You can not pay the order because it contains medication.',
  hy: 'Դուք չեք կարող վճարել պատվերը, քանի որ այն պարունակում է դեղորայք:',
  ru: 'Вы не можете оплатить заказ из за наличия в нем медикаментов.',
}, objHandler);

export const errorCheckPromoCode = new Proxy({
  en: 'The promo-code has been already used.',
  hy: 'Պրոմո-կոդը արդեն օգտագործվել է:',
  ru: 'Промо-код уже был использован.',
}, objHandler);

export const errorVCRequired = new Proxy({
  hy: 'Հաստատման կոդը պարտադիր է',
  ru: 'Проверочный код обязательное поле',
  en: 'Verification code is required',
}, objHandler);

export const errorVCInvalid = new Proxy({
  hy: 'Ստուգման կոդ սխալ է',
  ru: 'Неверный код подтверждения',
  en: 'Invalid verification code',
}, objHandler);

export const errorFirstNameInvalid = new Proxy({
  hy: 'Անունը սխալ է մուտքագրված',
  ru: 'Неверное имя',
  en: 'Invalid first name',
}, objHandler);

export const errorLastNameInvalid = new Proxy({
  hy: 'Ազգանունը սխալ է մուտքագրված',
  ru: 'Неверная фамилия',
  en: 'Invalid last name',
}, objHandler);

export const orderChatMessageTemplate = new Proxy({
  hy: 'Բարև։ Ինչո՞վ կարող ենք օգնել։',
  ru: 'Здравствуйте. Как мы можем помочь?',
  en: 'Hello. How Can We Help?',
}, objHandler);

export const supportChatMessageTemplate = new Proxy({
  hy: 'Բարև։ Ինչո՞վ կարող ենք օգնել։',
  ru: 'Здравствуйте. Как мы можем помочь?',
  en: 'Hello. How Can We Help?',
}, objHandler);