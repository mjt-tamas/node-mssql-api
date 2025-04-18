import type { dbEnvironments } from '~/types/db.type';
import config from '~/config';
import { Sequelize } from 'sequelize';
import { initModels } from '~/models/init-models';

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

export { dbConfig };

const isTest = config.environment === 'test';

const sequelize = isTest
  ? new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
    })
  : new Sequelize(
      config.mssql.database,
      config.mssql.user,
      config.mssql.password,
      {
        host: config.mssql.host,
        port: Number(config.mssql.port),
        dialect: 'mssql',
        dialectOptions: {
          port: Number(config.mssql.port),
          database: config.mssql.database,
          trustServerCertificate: true,
          options: {
            encrypt: false,
          },
        },
        define: {
          timestamps: false,
        },
        logging: false,
        pool: {
          min: 1,
          max: 100,
          idle: 36000,
        },
      },
    );

const db = initModels(sequelize);

export { sequelize, db };
