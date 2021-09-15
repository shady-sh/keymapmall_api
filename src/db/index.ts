import { Sequelize, SequelizeOptions } from 'sequelize-typescript';
import path from 'path';

import { db as dbConfig, log as logConfig } from '../../config';
const dir = path.join(__dirname, '**/*.model.[tj]s');

export const sequelize = new Sequelize(dbConfig.uri, <SequelizeOptions>{
  ...dbConfig,
  models: [dir],
  modelMatch: (filename: string, member: string) => {
    return filename.substr(0, filename.indexOf('.model')).replace(/[-_]/gi, '') === member.toLowerCase();
  },
  logging: (msg: any) => {
    if (logConfig.useFullLog) console.log(msg);
  },
  // dialectOptions: {
  //     useUTC: false,
  // },
  // timezone: 'Asia/Seoul',
});
