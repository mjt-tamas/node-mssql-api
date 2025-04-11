import type { dbEnvironments } from '~/types/db.type';
import config from '~/config';

const dbConfig: dbEnvironments = {
  development: {
    username: config.mssql.user,
    password: config.mssql.password,
    database: config.mssql.database,
    host: config.mssql.host,
    dialect: 'mssql',
    dialectOptions: {
      options: {
        encrypt: false,
      },
    },
  },
};

export default dbConfig;
