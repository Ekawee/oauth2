import entity from '../entity';

const getClient = (clientID, clientSecret, callback) => {

  const client = {
    clientID,
    clientSecret,
    grants: null,
    redirectUris: null,
  };
  callback(false, client);
};

const grantTypeAllowed = (clientID, grantType, callback) => {
  callback(false, true);
};

const getUser = (username, password, callback) => {

  entity.user.getUserFromCrentials(username, password)
    .then(user => callback(false, user))
    .catch(error => callback(error, null));
};

const saveAccessToken = (accessToken, clientID, expires, user, callback) => {

  entity.accessToken.saveAccessToken(accessToken, user.id, expires)
    .then(() => callback(null))
    .catch(error => callback(error));
};

const getAccessToken = (bearerToken, callback) => {

  entity.accessToken.getUserIDFromBearerToken(bearerToken)
    .then(accessToken => callback(null, accessToken))
    .catch(() => callback(true, null));
};

export default {
  getClient,
  grantTypeAllowed,
  getUser,
  saveAccessToken,
  getAccessToken,
};
