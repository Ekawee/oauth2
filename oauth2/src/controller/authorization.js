import express from 'express';
import asynWrapper from '../middleware/asyn-wrapper';
import authorisationService from '../service/authorization';

const router = express.Router();


export default (expressOauth) => {
  router.post(
    '/registerUser',
    asynWrapper((req, res) => authorisationService.registerUser(req, res)
    ));

  router.post(
    '/login',
    expressOauth.grant({
      refreshTokenLifetime: 3600,
    })
    );

  router.get(
    '/me',
    expressOauth.authorise(),
    asynWrapper((_, res) => res.send({ message: 'Congratulations! You got a protected data' })
    ));

  return router;
};
