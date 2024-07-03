import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';
import * as RandomString from 'randomstring';

const nodemailer = require('nodemailer');

import * as SMS from '../../sms-server';
import * as Helpers from '../../../helpers';
import config from '../../../config';
import { IResponseObjectViewModel } from '../../../helpers/models';

//#region Models

import { IToken, ICheckForgotKey, IResetPassword, ILogoutBodyModel, ITokenByVC, ISendEmailBody } from '../models';

//#endregion

//#region Schemas

import Admin from '../../../schemas/admin';
import DeviceToken from '../../../schemas/deviceToken';
import User from '../../../schemas/user';

//#endregion

export const generateVerificationCode = async (length: number) => {
  const charset = '0123456789';
  let text = '';
  for (let i = 0; i < length; i++) {
    const char = charset.charAt(Math.ceil(Math.random() * (charset.length - 1)));
    text += char;
  }
  return text;
};

export const token = async (data: IToken): Promise<IResponseObjectViewModel> => {
  try {
    const user = await User.findOne({
      $or: [
        { email: data.email.toLowerCase() },
        { phone: data.email },
      ]
    });
    const token = jwt.sign({ _id: user._id, role: user.role }, config.secretKey, {
      expiresIn: 60 * 60 * 24 * 365
    });
    return {
      success: true,
      data: { token },
      message: 'ok'
    };
  } catch (error) { throw error; }
};

export const tokenByVC = async (data: ITokenByVC, registeredUser): Promise<IResponseObjectViewModel> => {
  try {
    let user = registeredUser || await User.findOne({ phone: data.phone });

    if (!user) {
      const newUser = new User();
      const password = RandomString.generate({
        length: 8,
        charset: 'alphanumeric',
        capitalization: 'uppercase',
      });
      newUser.password = password;
      newUser.phone = data.phone;
      user = await newUser.save();
      SMS.sendSMS(`Your password is ${password}`, data.phone);
    }

    const token = jwt.sign({ _id: user._id, role: user.role }, config.secretKey, {
      expiresIn: 60 * 60 * 24 * 365
    });
    return {
      success: true,
      data: token,
      message: 'ok'
    };
  } catch (error) { throw error; }
};

export const logout = async (data: ILogoutBodyModel): Promise<IResponseObjectViewModel> => {
  try {
    const deviceToken = await DeviceToken.findOne({ deviceId: data.deviceId });
    deviceToken.user = null;
    deviceToken.referencePath = null;
    deviceToken.save();
    return {
      success: true,
      data: { token },
      message: 'ok'
    };
  } catch (error) { throw error; }
};

export const adminToken = async (data: IToken): Promise<IResponseObjectViewModel> => {
  try {
    const admin = await Admin.findOne({ email: data.email.toLowerCase() });
    const token = jwt.sign({ _id: admin._id, role: admin.role }, config.secretKey, {
      expiresIn: 60 * 60 * 24 * 365
    });
    return {
      success: true,
      data: { token },
      message: 'ok'
    };
  } catch (error) { throw error; }
};

export const forgotKey = async (res, email: string) => {
  const code = Math.floor(1000 + Math.random() * 9000);
  const isEmail = email.includes('@');
  if (isEmail) {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'armboldmind2018@gmail.com',
        pass: 'Password1/'
      }
    });
    const mailOptions = {
      from: 'armboldmind2018@gmail.com',
      to: email,
      html: `${code}`,
      subject: 'sovats.am'
    };
    return transporter.sendMail(mailOptions, (error) => {
      let data;
      if (error) {
        data = {
          success: false,
          data: null,
          message: 'Something went wrong'
        };
      } else {
        bcrypt.hash(`${code}`, 12, async (err, hash) => {
          if (hash) {
            await User.findOneAndUpdate({ email: email.toLowerCase() }, { forgotKey: hash });
          } else {
            throw (err);
          }
        });
        data = {
          success: true,
          data: null,
          message: 'Email send successfully'
        };
      }
      return Helpers.responseHandler(res, data);
    });
  } else {
    bcrypt.hash(`${code}`, 12, async (err, hash) => {
      if (hash) {
        await User
          .findOneAndUpdate({
            $or: [
              { email: email.toLowerCase() },
              { phone: email },
            ]
          }, { forgotKey: hash });
        SMS.sendSMS(`Your verification code is ${code}`, email);
      } else {
        throw (err);
      }
    });
    const data = {
      success: true,
      data: null,
      message: 'SMS send successfully'
    };
    return Helpers.responseHandler(res, data);
  }
};

export const checkForgotKey = async (data: ICheckForgotKey): Promise<IResponseObjectViewModel> => {
  const user = await User.findOne({
    $or: [
      { email: data.email.toLowerCase() },
      { phone: data.email },
    ]
  });
  const isValid: boolean = await bcrypt.compare(data.forgotKey, user.forgotKey);
  if (isValid) {
    return {
      success: true,
      data: null,
      message: 'ok'
    };
  } else {
    return {
      success: false,
      data: null,
      message: 'Forgot key is wrong'
    };
  }
};

export const resetPassword = async (data: IResetPassword): Promise<IResponseObjectViewModel> => {
  const user = await User.findOne({
    $or: [
      { email: data.email.toLowerCase() },
      { phone: data.email },
    ]
  });
  if (user.forgotKey) {
    const isValid: boolean = await bcrypt.compare(data.forgotKey, user.forgotKey);
    if (isValid) {
      user.password = data.newPassword;
      user.forgotKey = null;
      await user.save();
      return {
        success: true,
        data: null,
        message: 'Password reset done successfully'
      };
    }
  }
  return {
    success: false,
    data: null,
    message: 'Forgot key is wrong'
  };
};