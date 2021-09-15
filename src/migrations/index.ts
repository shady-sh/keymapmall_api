import Sequelize from 'sequelize';
import Umzug from 'umzug';
import { sequelize } from '../db';

const queryInterface = sequelize.getQueryInterface();

const umzug = new Umzug({
  storage: 'sequelize',
  storageOptions: {
    sequelize: sequelize,
    tableName: 'sequelizeMeta',
    columnName: 'migration',
  },
  migrations: {
    path: __dirname,
    pattern: /^\d+-[\w-]+\.[tj]s$/,
    params: [queryInterface, Sequelize],
  },
  logging: (msg: any) => console.log(msg),
});

export default async function doMigration() {
  await umzug.up();
}
