import http from 'http';
import express from 'express';
import oAuth2Server from 'node-oauth2-server';
import config from './config';
import winston from './winston';
import bodyParser from 'body-parser';
import model from './model';
import authorizationController from './controller/authorization';

const expressApp = express();
expressApp.server = http.createServer(expressApp);

expressApp.use(winston.loggerExpress);
expressApp.use(bodyParser.urlencoded({ extended: true }));

expressApp.oauth = oAuth2Server({
  model: model,
  grants: ['password'],
  debug: true,
});

const router = express.Router();

expressApp.use('/auth', router.use(authorizationController(expressApp.oauth)));

expressApp.use(expressApp.oauth.errorHandler());

expressApp.server.listen(config.port, () => {
  winston.logger.info('Started oauth2 service', {
    port: expressApp.server.address().port,
  });
});

export default expressApp;
