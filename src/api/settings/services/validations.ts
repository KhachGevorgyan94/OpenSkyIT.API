import { Response, NextFunction } from 'express';
import * as Joi                   from 'joi';

import * as Helpers       from '../../../helpers';
import { IRequest }       from '../../../helpers/models';

//#region Schemas

import Settings from '../../../schemas/settings';

//#endregion

export const Info = async (req: IRequest, res: Response, next: NextFunction) => {
    try {
      const bodyValidation = {
        title       : Joi.string().required(),
        description : Joi.string().required(),
      };
      const result = Joi.validate(req.body, bodyValidation);
      if (result.error) {
        return Helpers.failedResponse(res, { message: result.error.details[0].message });
      }
      const promotion = await Settings.findOne();;
      if (!promotion) {
        return Helpers.failedResponse(res, { message: 'Promotion not found' });
      }
      return next();
    } catch (error) {
      Helpers.errorHandler(req, res, { error : error });
    }
  };