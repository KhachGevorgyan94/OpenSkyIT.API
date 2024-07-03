import { IConfigModel } from './../helpers/models/index';
import * as path from 'path';
class Config {
  public env: string;
  public port: number;
  public schedulerBaseUrl: string;
  public mongoUrl: string = 'mongodb://localhost:27017/' + (process.env.DB_NAME || 'opensky-db');
  public emailRegex: RegExp = /^([A-Za-z0-9_\-.+])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,})$/;
  public basePath: string = path.resolve(__dirname, '../../');
  public mediaPath: string = path.resolve(this.basePath, 'media') + '/';
  public slackWebhookUrl: string = 'https://hooks.slack.com/services/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';
  public secretKey: string = 'sovats-secret';
  public fireBaseCustomerServerKey: string = 'AAAAKT-6TyY:APA91bHvKl8PTm2sNcqTPFvEoGQ8qaQJZCGbnVnV5FmSMIkRXyRAnjQupLoe7JWjfLKIP2lCcQdtJhXsWEUrWNAQVNdPhjqMB-kgwQVjr3mz-H35D-uur53mvaCYVOC-rPqk6iXy6Ww-';
  public fireBaseDriverServerKey: string = 'AAAAIto4H3E:APA91bHiwYstUXmbkFNNwQ9MiqnbeQYKDrycPGWQrZ-XHfWMVqnFKF9mE-n7JgXwE_nGY7qcihHzh_34BYFVk_WkA8WdeO0gvIeaqvvvEz8d-DwvlhMD4RJzCNN5uPP4kMHfvsWDjImm';
  public fireBaseCustomerSenderId: string = '177162833702';
  public fireBaseDriverSenderId: string = '149689999217';
  public googleKey = 'AIzaSyCEcFGeZthxyNL_VLYYX2x6dY4f1UrsFrE';
  public sms = {
    login    : 'inf_sovats',
    password : 'Bn25Ytr32',
    title    : 'sovats .am'
  };
  public ameria = {
    liveUrl         : 'https://payments.ameriabank.am/webservice/PaymentService.svc?wsdl',
    testUrl         : 'https://testpayments.ameriabank.am/webservice/PaymentService.svc?wsdl',
    liveRedirectUrl : 'https://payments.ameriabank.am/forms/frm_paymentstype.aspx?',
    testRedirectUrl : 'https://testpayments.ameriabank.am/forms/frm_paymentstype.aspx?',
    clientId        : '429083e0-8551-4060-834b-486807709262',
    userName        : '19533861_api',
    password        : '3H457Y43E02Hk5G',
  };

  constructor() {
    let format: string;
    if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
      this.env = 'development';
      format = '.ts';
    } else {
      this.env = process.env.NODE_ENV;
      format = '.js';
    }
    const config: IConfigModel = require(`./${this.env + format}`).default;
    this.port = config.port;
    this.schedulerBaseUrl = config.schedulerBaseUrl;
  }
}

export default new Config();