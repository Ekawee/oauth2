import { pick, isNil, toString } from 'lodash/fp';
import bcryptjs from 'bcryptjs';
// import { SALT_ROUNDS } from '../constants';
import entity from '../entity';
import { InvalidCredentials } from '../exception';

const sendResponse = (res, message, error) => {
  res
    .status(error === null || !error ? 200 : 400)
    .send({
      message,
      error: toString(error),
    });
  throw new InvalidCredentials(toString(error));
};

const registerUser = async (req, res) => {
  try {
    const { username, password } = pick(['username', 'password'])(req.body);

    if(isNil(username) || isNil(password)) {
      sendResponse(res, 'Required username and password', true);
    }

    const existUsername = await entity.user.findOne({ where: { username } });

    if(existUsername) {
      sendResponse(res, 'Email already exists', true);
    }

    await entity.user.create({
      username,
      password: bcryptjs.hashSync(password),
    });

    sendResponse(res, 'Registration was successful', null);
  } catch (error) {
    sendResponse(res, 'Failed to register user', error);
  }

};


export default {
  registerUser,
};
