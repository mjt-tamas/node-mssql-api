import { Dialect } from 'sequelize';

type dbConfig = {
  username: string;
  password: string;
  database: string;
  host: string;
  dialect: Dialect;
  dialectOptions?: {
    options?: {
      encrypt?: boolean;
    };
  };
};

export type dbEnvironments = {
  development: dbConfig;
  test?: dbConfig;
  production?: dbConfig;
};
