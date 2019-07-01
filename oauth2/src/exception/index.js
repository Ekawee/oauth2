import winston from '../winston';

const BaseException = (exception) => {
  const { message, name, status } = exception;
  const error = new Error(message);
  error.name = name;
  error.status = status || 500;

  winston.logger.error({ message: 'Exception Handler', ...exception });
  return error;
};

const InvalidCredentials = (message) => {
  const exception = {
    message,
    name: 'InvalidCredentials',
    status: 400,
  };
  return new BaseException(exception);
};

const InternalServerError = (message) => {
  const exception = {
    message,
    name: 'InternalServerError',
    status: 500,
  };
  return new BaseException(exception);
};

export {
  BaseException,
  InvalidCredentials,
  InternalServerError,
};
