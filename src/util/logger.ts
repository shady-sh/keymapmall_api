import mkdirp from 'mkdirp';
import fs from 'fs';
import path from 'path';
import morgan from 'morgan';
import { Router } from 'express';
import { log as logConfig } from '../../config';

const router = Router();
export default router;

// Set up stdout logger
if (logConfig.stdout != null) {
  router.use(morgan(logConfig.stdout));
}

// Set up access logger
if (logConfig.access != null) {
  const options = logConfig.access;
  mkdirp.sync(path.resolve(__dirname, '../../', options.directory));
  const stream = fs.createWriteStream(path.resolve(__dirname, '../../', options.directory, options.filename), { flags: 'a' });
  router.use(morgan(options.format, { stream }));
}
