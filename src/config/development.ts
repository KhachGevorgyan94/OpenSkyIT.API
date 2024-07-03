import { IConfigModel } from '../helpers/models';

const config: IConfigModel = {
  port             : (+process.env.PORT) || 5006,
  schedulerBaseUrl : 'http://localhost:5007/api/',
};
export default config;
