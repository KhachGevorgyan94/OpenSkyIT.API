"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
class Config {
    constructor() {
        this.mongoUrl = 'mongodb://localhost:27017/' + (process.env.DB_NAME || 'opensky-db');
        this.emailRegex = /^([A-Za-z0-9_\-.+])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,})$/;
        this.basePath = path.resolve(__dirname, '../../');
        this.mediaPath = path.resolve(this.basePath, 'media') + '/';
        this.slackWebhookUrl = 'https://hooks.slack.com/services/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';
        this.secretKey = 'sovats-secret';
        this.fireBaseCustomerServerKey = 'AAAAKT-6TyY:APA91bHvKl8PTm2sNcqTPFvEoGQ8qaQJZCGbnVnV5FmSMIkRXyRAnjQupLoe7JWjfLKIP2lCcQdtJhXsWEUrWNAQVNdPhjqMB-kgwQVjr3mz-H35D-uur53mvaCYVOC-rPqk6iXy6Ww-';
        this.fireBaseDriverServerKey = 'AAAAIto4H3E:APA91bHiwYstUXmbkFNNwQ9MiqnbeQYKDrycPGWQrZ-XHfWMVqnFKF9mE-n7JgXwE_nGY7qcihHzh_34BYFVk_WkA8WdeO0gvIeaqvvvEz8d-DwvlhMD4RJzCNN5uPP4kMHfvsWDjImm';
        this.fireBaseCustomerSenderId = '177162833702';
        this.fireBaseDriverSenderId = '149689999217';
        this.googleKey = 'AIzaSyCEcFGeZthxyNL_VLYYX2x6dY4f1UrsFrE';
        this.sms = {
            login: 'inf_sovats',
            password: 'Bn25Ytr32',
            title: 'sovats .am'
        };
        this.ameria = {
            liveUrl: 'https://payments.ameriabank.am/webservice/PaymentService.svc?wsdl',
            testUrl: 'https://testpayments.ameriabank.am/webservice/PaymentService.svc?wsdl',
            liveRedirectUrl: 'https://payments.ameriabank.am/forms/frm_paymentstype.aspx?',
            testRedirectUrl: 'https://testpayments.ameriabank.am/forms/frm_paymentstype.aspx?',
            clientId: '429083e0-8551-4060-834b-486807709262',
            userName: '19533861_api',
            password: '3H457Y43E02Hk5G',
        };
        let format;
        if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
            this.env = 'development';
            format = '.ts';
        }
        else {
            this.env = process.env.NODE_ENV;
            format = '.js';
        }
        const config = require(`./${this.env + format}`).default;
        this.port = config.port;
        this.schedulerBaseUrl = config.schedulerBaseUrl;
    }
}
exports.default = new Config();
