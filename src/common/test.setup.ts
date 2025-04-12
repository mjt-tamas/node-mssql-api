import { sequelize, db } from '~/config/db';
import type {
  Sequelize as SequelizeInstance,
  Model,
  ModelStatic,
} from 'sequelize';
import * as Sequelize from 'sequelize';

beforeAll(async () => {
  console.log('SQL Dialect in use:', sequelize.getDialect());
  patchDefaultTimestamps(db, sequelize);
  await sequelize.sync({ force: true });
});

afterAll(async () => {
  await sequelize.close();
});

function patchDefaultTimestamps(
  models: Record<string, ModelStatic<Model>>,
  sequelize: SequelizeInstance,
) {
  if (sequelize.getDialect() !== 'sqlite') {
    return;
  }

  for (const modelName in models) {
    const model = models[modelName];
    const attributes = model.getAttributes();

    let updated = false;
    for (const key in attributes) {
      const attr = attributes[key];
      const defaultVal: any = attr.defaultValue;
      if (typeof defaultVal === 'object') {
        const cloned = JSON.parse(JSON.stringify(defaultVal));
        if (cloned?.fn === 'getdate') {
          console.log(
            `Overriding ${modelName}.${key} default from GETDATE() → Sequelize.NOW`,
          );
          // @ts-ignore
          attr.defaultValue = Sequelize.NOW;
          updated = true;
        }
      }
    }
    if (updated) {
      model.init(attributes, {
        ...model.options,
        sequelize,
      });
    }
  }
}
