import { Response, NextFunction } from 'express';

import * as jwt from 'jsonwebtoken';

import config         from '../config';
import * as Helpers   from '../helpers';
import { UserRole }   from '../helpers/enums';
import { IRequest }   from '../helpers/models';
import User           from '../schemas/user';
import Admin          from '../schemas/admin';

export const checkUser = (id: string, role: UserRole) => {
  if (role === UserRole.customer) {
    return User.findById(id).populate('addresses');
  } else if (role === UserRole.admin || role === UserRole.operator || role === UserRole.dispatcher || role === UserRole.dispatcherAdmin) {
    return Admin.findById(id);
  }
};

const checkToken = async (token: string): Promise<any> => {
  try {
    const userInfo = jwt.verify(token, config.secretKey);
    const user = await checkUser(userInfo['_id'], userInfo['role']);

    if (!user.blocked && !user.deleted) {
      return {
        user,
        success: true
      };
    } else {
      return {
        success    : false,
        statusCode : 401,
        message    : user.blocked ? 'User is blocked' : 'User not found',
      };
    }
  } catch (error) {
    return {
      success    : false,
      statusCode : 401,
      message    : 'Invalid or missing authorization token',
    };
  }
};

const checkRoles = (user, roles: Array<UserRole>): boolean => {
  let check: boolean = false;
  roles.forEach(role => {
    if (user.role == role) check = true;
  });
  return check;
};

export const isAuthenticated = (roles?: Array<any>) => {
  return async (req: IRequest, res: Response, next: NextFunction) => {
    if (req.headers && req.headers.authorization) {
      const token = req.headers.authorization.toString();
      const data = await checkToken(token);
      if (data.success) {
        req.user = data.user;
        if (!roles) return next();
        if (checkRoles(req.user, roles)) return next();
      } else {
        return Helpers.failedResponse(res, {
          statusCode : data.statusCode,
          message    : data.message,
        });
      }
    }
    return Helpers.failedResponse(res, {
      statusCode : 401,
      message    : 'Unauthorized'
    });
  };
};

export const isAuthenticatedOrGuest = (roles?: Array<any>) => {
  return async (req: IRequest, res: Response, next: NextFunction) => {
    if (req.headers && req.headers.authorization && req.headers.authorization !== 'null' && req.headers.authorization !== 'undefined' ) {
      const token = req.headers.authorization.toString();
      const data = await checkToken(token);
      if (data.success) {
        req.user = data.user;
        if (!roles) return next();
        if (checkRoles(req.user, roles)) return next();
      } else {
        return Helpers.failedResponse(res, {
          statusCode : data.statusCode,
          message    : data.message,
        });
      }
    }
    return next();
  };
};

export const checkAuthenticated = () => {
  return async (req: IRequest, res: Response, next: NextFunction) => {
    if (req.headers && req.headers.authorization) {
      const token = req.headers.authorization.toString();
      const data = await checkToken(token);
      if (data.success) {
        req.user = data.user;
      }
      return next();
    }
    return next();
  };
};