import { pick, isNil, toString, isObject } from 'lodash/fp';
import bcryptjs from 'bcryptjs';
import entity from '../entity';
import { InvalidCredentials, InternalServerError } from '../exception';

const sendResponse = (res, message, error) => {
  if(isObject(error)) {
    res
      .status(500)
      .send({
        message,
        error: toString(error),
      });
    throw new InternalServerError(toString(error));
  } else if (error) {
    res
      .status(400)
      .send({
        message,
        error,
      });
    throw new InvalidCredentials(toString(error));
  }
  res
  .status(200)
  .send({
    message,
  });
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
