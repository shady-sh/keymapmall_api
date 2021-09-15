import express from 'express';
import cors from 'cors';
import serveStatic from 'serve-static';
import path from 'path';
import listen from './util/listen';
import logger from './util/logger';

import { sequelize } from './db';
import api from './api';
import migrations from './migrations';

// import { middleware } from 'apicache';

(async () => {
  await migrations();
  await sequelize.sync();

  const app = express();
  app.set('query parser', 'simple');
  app.set('trust proxy', ['loopback', 'linklocal', 'uniquelocal']);
  app.use(cors({ origin: '*', credentials: true }));

  app.use('/docs', serveStatic(path.resolve(__dirname, '../apidoc')));
  app.use(logger);
  app.use(api);

  listen(app);
})();
