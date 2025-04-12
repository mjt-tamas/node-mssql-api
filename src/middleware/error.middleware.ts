import { Request, Response, NextFunction, ErrorRequestHandler } from 'express';
import { Exception } from '~/middleware/exception.middleware'; // Assuming Exception is a custom class
import { z } from 'zod';

const errorMiddleware: ErrorRequestHandler = async (
  err: unknown, // Use unknown to ensure safety
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  if (err instanceof z.ZodError) {
    res.status(400).send({
      code: 'InvalidRequest',
      status: 400,
      message: 'Invalid request. Please check your request and try again.',
      errors: err.errors,
    });
    return;
  }

  if (err instanceof Exception) {
    res.status(err.status).send({
      code: err.code,
      status: err.status,
      message: err.message,
    });
    return;
  }

  if (err instanceof Error) {
    res.status(500).send({
      code: 'UnknownError',
      status: 500,
      message:
        err.message ||
        'An unknown error occurred while processing your request.',
    });
    return;
  }

  res.status(500).send({
    code: 'Unknown',
    status: 500,
    message: 'An unknown error occurred. Please try again later.',
  });
  return;
};

export default errorMiddleware;
