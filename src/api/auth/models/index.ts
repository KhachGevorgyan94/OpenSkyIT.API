import { IUser } from "../../../schemas/user/model";

export interface IToken {
  email: string;
  password: string;
}

export interface ITokenByVC {
  phone: string;
  verificationCode: string;
}

export interface ICheckForgotKey {
  email: string;
  forgotKey: string;
}

export interface IResetPassword {
  email: string;
  forgotKey: string;
  newPassword: string;
  confirmPassword: string;
}

export interface ILogoutBodyModel {
  deviceId: string;
}

export interface ISendEmailBody {
  osType: number;
  email: string;
  user?: IUser;
}