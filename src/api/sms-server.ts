import * as request from 'request';

import config from '../config';

export const sendSMS = async (message, number): Promise<any> => {
  return new Promise((resolve, reject) => {
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
    request
      .post({
          url: 'https://msg.am/Xml_Api/index.php',
          body: '<?xml version="1.0" encoding="UTF-8" ?>' +
            '<xml_request name="sms_send">' +
            '<xml_user lgn="' + config.sms.login + '" pwd="' + config.sms.password + '"/>' +
            '<sms sms_id="' + getRandomInt(10000000000000, 100000000000000 /* one zero more :D*/ ) + '" number="' + number + '" source_number="' + config.sms.title + '" ttl="1">' + message + '</sms>' +
            '</xml_request>'
        },
        (err, response, body) => {
          process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
          if (err) return reject(err);
          return resolve({
            response,
            body
          });
        });
  });
};

export const sendUniqueIdViaSMS = async(uniqueId: string, number: string): Promise<any> => {
  const message = `Your order uniqueId is ${uniqueId} .`;
  return sendSMS(message, number);
};


export const getRandomInt = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min)) + min;
};