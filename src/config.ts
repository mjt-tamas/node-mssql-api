import { config } from 'dotenv';

const path = './.env';

config({
  path,
  override: true,
});

const throwError = (msg: string) => {
  throw new Error(msg);
};

export default {
  environment:
    process.env.NODE_ENV ||
    throwError('NODE_ENV environmental variable not set'),
  mssql: {
    host:
      process.env.MSSQL_HOST ||
      throwError('DB_HOST environmental variable not set'),
    port:
      process.env.MSSQL_PORT ||
      throwError('DB_PORT environmental variable not set'),
    user:
      process.env.MSSQL_USER ||
      throwError('MSSQL_USER environmental variable not set'),
    password:
      process.env.MSSQL_PASSWORD ||
      throwError('MSSQL_PASSWORD environmental variable not set'),
    database:
      process.env.MSSQL_DATABASE ||
      throwError('MSSQL_DATABASE environmental variable not set'),
  },
};
