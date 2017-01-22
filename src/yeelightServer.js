import winston from 'winston';
import ApiServer from './api/apiServer';
import YeelightController from './yeelightController/yeelightController';

YeelightController
  .connect()
  .then(() => ApiServer.init())
  .then(() => {
    winston.info('Server enabled');
  });
