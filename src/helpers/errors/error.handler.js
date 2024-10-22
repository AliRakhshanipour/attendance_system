import ValidationError from './custom-error.js';
import { Error_Msg } from './error.messages.js';

const notFoundHandler = (req, res, next) => {
  res.status(404).json({
    status: 404,
    message: Error_Msg.NOT_FOUND_PAGE,
  });
};

const internalServerErrorHandler = (err, req, res, next) => {
  if (err instanceof ValidationError) {
    return res.status(err.status).json({
      status: err.status,
      message: err.message,
      errors: err.errors,
    });
  }

  const status = err.status || err.statusCode || 500;
  const message = err.message || err.msg || Error_Msg.INTERNAL_SERVER_ERROR;

  res.status(status).json({
    status,
    message,
  });
};

export const ErrorHandlers = [internalServerErrorHandler, notFoundHandler];
