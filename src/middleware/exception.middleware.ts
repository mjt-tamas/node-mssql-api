export class Exception extends Error {
  constructor(
    public status: number,
    public code: string,
    public message: string,
  ) {
    super(message);
  }
}

export const errors = {
  unknown: () =>
    new Exception(
      400,
      'Unknown',
      'An unknown error occurred. Please try again later.',
    ),
  unauthorized: () =>
    new Exception(
      401,
      'Unauthorized',
      'You are not authorized to access this resource.',
    ),
  forbidden: () =>
    new Exception(
      403,
      'Forbidden',
      'You do not have permission to access this resource.',
    ),

  alreadyExists: (resource: string) =>
    new Exception(409, 'Conflict', `The requested ${resource} already exists.`),
  notFound: (resource: string) =>
    new Exception(404, 'NotFound', `The requested ${resource} was not found.`),
  invalidParameter: (param: string) =>
    new Exception(
      422,
      'InvalidParameter',
      `Missing or invalid parameter ${param}.`,
    ),
  expiredToken: () =>
    new Exception(401, 'ExpiredToken', 'The token has expired.'),
  invalidOperation: (operation: string) =>
    new Exception(
      422,
      'InvalidOperation',
      `The operation is invalid: ${operation}`,
    ),

  fieldIsRequired: (param: string) =>
    new Exception(422, 'FieldIsRequired', `${param} is required.`),
  notAvailable: (param: string) =>
    new Exception(422, 'NotAvailable', `${param} is not available.`),

  resourceIsInUse: (param: string) =>
    new Exception(
      422,
      'ResourceIsInUse',
      `The ${param} is in use by one or more groups.`,
    ),
  smartyError: (status: string, reason: string) =>
    new Exception(422, status, reason),
  externalError: (
    status = 'Bad Gateway',
    reason = 'Unknown external error.',
    code = 502,
  ) => new Exception(code, status, reason),
};
