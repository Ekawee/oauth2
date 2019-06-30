import http from 'http';
import express from 'express';
import oAuth2Server from 'node-oauth2-server';
import compression from 'compression';
import contextService from 'request-context';
// import OAuth2Server from 'express-oauth-server';
// import model from './model';
import config from './config';
import winston from './winston';
// import errorHandler from './middleware/error-handler';
// import bodyParser from './middleware/body-parser';
import bodyParser from 'body-parser';
import authRoutesMethods from './authorisation/authRoutesMethods';
import authRouter from './authorisation/authRouter';
import authModel from './authorisation/accessTokenModel';

const expressApp = express();
const router = express.Router();
const routers = express.Router();
expressApp.server = http.createServer(expressApp);

// customized
// expressApp.use(contextService.middleware('request'));
// expressApp.use(compression());
expressApp.use(winston.loggerExpress);
expressApp.use(bodyParser.urlencoded({ extended: true }));
// end

expressApp.oauth = oAuth2Server({
  model: authModel,
  grants: ['password'],
  debug: true,
})

const asynWrapper = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};
router.post('/registerUser', asynWrapper(authRoutesMethods.registerUser));

router.post('/login', expressApp.oauth.grant());

router.get('/me', expressApp.oauth.authorise(), asynWrapper((_, res) => res.send({ message: 'Congratulations! this is a protected data' })));

const collectRoute = routers.use([router])
expressApp.use('/auth', collectRoute)
// expressApp.use('/auth', authRouter(express.Router(), expressApp, authRoutesMethods));

expressApp.use(expressApp.oauth.errorHandler());


expressApp.server.listen(config.port, () => {
  winston.logger.info('Started oauth2 service', {
    port: expressApp.server.address().port,
  });
});

export default expressApp;
