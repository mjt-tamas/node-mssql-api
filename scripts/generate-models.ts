import SequelizeAuto from 'sequelize-auto';
import { dbConfig } from '../src/config/db';

const auto = new SequelizeAuto(
  dbConfig.development.database,
  dbConfig.development.username,
  dbConfig.development.password,
  {
    dialect: dbConfig.development.dialect,
    host: dbConfig.development.host,
    port: 1433,
    directory: './src/models',
    lang: 'ts',
    additional: {
      timestamps: false,
    },
    singularize: true,
    useDefine: true,
  },
);
auto
  .run()
  .then((data) => {
    console.log('✅ Models generated successfully!');
    console.log('Tables:', Object.keys(data.tables));
  })
  .catch((err) => {
    console.error('❌ Error generating models:', err);
  });
