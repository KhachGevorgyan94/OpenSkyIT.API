import { Response } from 'express';
import * as GeoLib from 'geolib';
import fetch        from 'node-fetch';

import * as Models       from './models';
import config            from '../config';
import { DocumentQuery } from 'mongoose';
import { GeolibInputCoordinates } from 'geolib/es/types';


const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export const getDistance = (from: GeolibInputCoordinates, to: GeolibInputCoordinates) => {
  const distance = GeoLib.getDistance(from, to);
  return Math.round(distance + ((distance * 10) / 100));
};

export const errorHandler = (req: Models.IRequest<any>, res: Response, err?: Models.IErrorHandler) => {
  const code: number = err.statusCode || 200;
  const message: string = err.error._message || 'Something went wrong';
  if (config.env !== 'development' && !process.env.DUMMY) {
  
  } else {
    console.log(err.error);
  }
  this.failedResponse(res, {
    statusCode : code,
    message    : message
  });
};

export const responseHandler = (res: Response, data: Models.IResponseObjectViewModel = { success: false, data: null, message: 'Something went wrong' }, statusCode: number = 200) => {
  res.status(statusCode).send(data);
};

export const failedResponse = (res: Response, data: Models.IFailedResponse = {}) => {
  const resObj: Models.IResponseObjectViewModel = {
    success: false,
    data   : null,
    message: data.message || 'Something went wrong'
  };
  res.status(data.statusCode || 200).send(resObj);
};

export const successResponse = (res: Response, data: Models.ISuccessResponse = {}) => {
  const resObj: Models.IResponseObjectViewModel = {
    success : true,
    data    : data.body || null,
    message : 'ok'
  };
  res.status(200).send(resObj);
};

export const isValidPhoneNumber = (phoneNumber: string): boolean => {
  let isValid: boolean = false;
  const code: string = phoneNumber.slice(1, 3);
  switch (code) {
    case '41' : { isValid = true;  break; }
    case '43' : { isValid = true;  break; }
    case '44' : { isValid = true;  break; }
    case '55' : { isValid = true;  break; }
    case '77' : { isValid = true;  break; }
    case '91' : { isValid = true;  break; }
    case '93' : { isValid = true;  break; }
    case '94' : { isValid = true;  break; }
    case '95' : { isValid = true;  break; }
    case '96' : { isValid = true;  break; }
    case '98' : { isValid = true;  break; }
    case '99' : { isValid = true;  break; }
    default   : { isValid = false; break; }
  }
  return isValid;
};

export const isJson = (str: string): boolean => {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
};

export const checkLanguage = (l: any | string): string => {
  const languages: Array<string> = ['en', 'hy', 'ru'];
  return (languages.indexOf(l) >= 0) ? l : 'en';
};

export const httpRequest = async (data: Models.IHttpRequest) => {
  console.log(data);
  const res = await fetch(`${config.schedulerBaseUrl}${data.controllerName}/${data.actionName}`, {
    method : data.method,
    headers: { 
      'Content-Type' : 'application/json',
      
     },
    body   : JSON.stringify(data.body)
  });
  return res.json();
};

export const getMaxPageCount = (listCount: number, count: number): number => {
  let paginationLimit: number = 1;
  if (listCount > count) {
    paginationLimit = listCount / count;
    const limit: Array<string> = `${paginationLimit}`.split('.');
    if (limit.length > 1) {
      paginationLimit = +(limit[0]);
      return Math.ceil(paginationLimit) + 1;
    }
  }
  return Math.ceil(paginationLimit);
};

const getCount = (object) => {
  return object
    .skip(0)
    .limit(0)
    .count()
    .exec();
};

export const pagination = async<T = any>(filters: Models.IPaginationReqViewModel, obj: DocumentQuery<any[], any>): Promise<Models.IPaginationViewModel<T[]>> => {
  filters.count = +filters.count || 20;
  filters.page = +filters.page;
  if (!filters.page) filters.page = 1;
  filters.page = (filters.page - 1 < 0) ? 0 : (filters.page - 1);
  const [ data, elemCount ] = await Promise.all([
    await obj.skip(filters.page * filters.count).limit(filters.count),
    await getCount(obj)
  ]);
  const pageCount: number = getMaxPageCount(elemCount, filters.count);
  return {
    pageCount  : pageCount,
    list       : data,
    itemsCount : elemCount,
  };
};

export const shortDate = date => {
	if (date) {
		const localDate = new Date(date);
		return `${addZero(localDate.getDate())} ${monthNames[localDate.getMonth()]}`;
	}
};

const addZero = i => {
	if (i < 10) {
		i = '0' + i;
	}
	return i;
};

export const hoursDate = date => {
	if (date) {
    const d = new Date(date);
    const h = addZero(d.getHours());
    const m = addZero(d.getMinutes());
    return h + ':' + m;
  }
};

export const getShortDate = (date: Date, zoneOffsetMinutes?: number): string => {
  let newDate = new Date(date);

  if (zoneOffsetMinutes) {
    newDate = new Date(newDate.setMinutes(newDate.getMinutes() + (-(zoneOffsetMinutes))));
  }

  return `${addZero(newDate.getDate())} ${monthNames[newDate.getMonth()]} ${newDate.getFullYear()} ${hoursDate(newDate)}`;
};
